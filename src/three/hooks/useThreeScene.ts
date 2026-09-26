import { useEffect, useRef, useCallback } from "react";
import { usePerformanceProfile } from "../../performance/profile";
import type { SceneConfig } from "../../types";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  phase: number; // For organic drifting and pulsing
}

interface UseThreeSceneProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  config: SceneConfig;
}

export function useThreeScene({
  canvasRef,
  config,
}: UseThreeSceneProps): void {
  const performance = usePerformanceProfile();
  const animFrameRef = useRef<number | null>(null);
  const sceneRef = useRef<{
    nodes: Node3D[];
    cameraOffsetX: number;
    cameraOffsetY: number;
  }>({
    nodes: [],
    cameraOffsetX: 0,
    cameraOffsetY: 0,
  });

  const initNodes = useCallback((count: number): Node3D[] => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 3, // Wider spread
      y: (Math.random() - 0.5) * 3,
      z: Math.random() * 1.5 - 0.75,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() * -0.001) - 0.0004, // Faster float upwards
      vz: 0, // No Z-movement to prevent perspective illusion of falling
      radius: Math.random() * 2.5 + 0.8, // Larger size variance
      phase: Math.random() * Math.PI * 2, // Random starting phase
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    sceneRef.current.nodes = initNodes(config.nodeCount);

    let currentDpr = config.maxDpr;
    const resize = () => {
      const dpr = currentDpr;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const project = (
      x: number,
      y: number,
      z: number,
      camX: number,
      camY: number
    ) => {
      const fov = 600;
      const pz = z + 2;
      const scale = fov / pz;
      const px = (x + camX) * scale + W() / 2;
      const py = (y + camY) * scale + H() / 2;
      return { px, py, scale, pz };
    };

    let targetCamX = 0;
    let targetCamY = 0;

    const draw = (time: number) => {
      const w = W();
      const h = H();
      ctx.clearRect(0, 0, w, h);

      // Smooth camera parallax
      sceneRef.current.cameraOffsetX +=
        (targetCamX - sceneRef.current.cameraOffsetX) * 0.04;
      sceneRef.current.cameraOffsetY +=
        (targetCamY - sceneRef.current.cameraOffsetY) * 0.04;

      const camX = sceneRef.current.cameraOffsetX;
      const camY = sceneRef.current.cameraOffsetY;

      const nodes = sceneRef.current.nodes;

      // Update positions with organic drift
      if (!performance.reducedMotion) {
        for (const node of nodes) {
          // Organic drift using sine waves for X only (Z is locked to prevent scaling anomalies)
          const driftX = Math.sin(time * 0.001 + node.phase) * 0.0005;

          node.x += node.vx + driftX;
          node.y += node.vy; // Strictly moves up

          if (Math.abs(node.x) > 2.0) node.vx *= -1;
          if (node.y < -2.0) {
            // Respawn completely off-screen at the bottom
            node.y = 2.0;
            node.x = (Math.random() - 0.5) * 3;
          }
        }
      }

      // Project nodes
      const projected = nodes.map((n) => ({
        ...project(n.x, n.y, n.z, camX, camY),
        radius: n.radius,
        z: n.z,
      }));

      // Draw organic connections (faint liquid-like webbing for close particles)
      const maxDist = config.connectionDistance * 0.7; // Shorter distance for liquid effect
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const pa = projected[i];
        if (!a || !pa) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const pb = projected[j];
          if (!b || !pb) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDist) {
            const alpha = Math.pow((1 - dist / maxDist), 2) * 0.4;
            ctx.beginPath();
            ctx.moveTo(pa.px, pa.py);
            
            // Smooth, stable curved lines for liquid organic feel
            // We use the nodes' phases and time to make the liquid thread wiggle organically
            const wiggle = Math.sin(time * 0.002 + a.phase + b.phase) * 15;
            const cx = (pa.px + pb.px) / 2 + wiggle;
            const cy = (pa.py + pb.py) / 2 - wiggle;
            
            ctx.quadraticCurveTo(cx, cy, pb.px, pb.py);
            ctx.strokeStyle = `rgba(176, 0, 24, ${alpha})`;
            ctx.lineWidth = Math.max(0.1, (1 - dist / maxDist) * 2.5); // Slightly thicker viscosity
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const n = nodes[i];
        if (!n || !p) continue;

        const depth = (p.pz - 1) / 2;
        const alpha = Math.max(0.1, 0.7 - depth * 0.5);
        
        // Breathing pulse effect based on time and individual phase
        const pulse = 1 + 0.15 * Math.sin(time * 0.003 + n.phase);
        const r = (p.radius / p.pz) * 40 * pulse;

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.5, r), 0, Math.PI * 2);

        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 1.5);
        // Blood cell / glowing ember style
        grad.addColorStop(0, `rgba(255, 71, 101, ${alpha})`); // Hot core
        grad.addColorStop(0.3, `rgba(176, 0, 24, ${alpha * 0.8})`); // Dark blood body
        grad.addColorStop(1, `rgba(82, 0, 8, 0)`); // Fade to black/transparent
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    let sampleStartedAt = window.performance.now();
    let sampledFrames = 0;
    const loop = (time: number) => {
      draw(time);
      sampledFrames += 1;
      const now = window.performance.now();
      const sampleDuration = now - sampleStartedAt;
      if (sampleDuration >= 3000) {
        const averageFps = (sampledFrames * 1000) / sampleDuration;
        if (averageFps < 45 && currentDpr > 1) {
          currentDpr = Math.max(1, currentDpr - 0.25);
          resize();
        }
        sampledFrames = 0;
        sampleStartedAt = now;
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    if (performance.documentVisible && !performance.reducedMotion) {
      animFrameRef.current = requestAnimationFrame(loop);
    } else {
      draw(0);
    }

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, config, initNodes, performance.documentVisible, performance.reducedMotion]);

  // Update target camera from mouse — no re-render needed
}
