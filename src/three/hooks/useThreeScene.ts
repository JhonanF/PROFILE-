import { useEffect, useRef, useCallback } from "react";
import { useVisibilityChange } from "../../hooks/useVisibilityChange";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { SceneConfig } from "../../types";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
}

interface UseThreeSceneProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  config: SceneConfig;
  mouseX: number;
  mouseY: number;
}

export function useThreeScene({
  canvasRef,
  config,
  mouseX,
  mouseY,
}: UseThreeSceneProps): void {
  const isVisible = useVisibilityChange();
  const reducedMotion = useReducedMotion();
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
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random() * 1.5 - 0.75,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      vz: (Math.random() - 0.5) * 0.0002,
      radius: Math.random() * 1.5 + 0.5,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const nodeCount = isMobile
      ? Math.floor(config.nodeCount * 0.4)
      : config.nodeCount;

    sceneRef.current.nodes = initNodes(nodeCount);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, config.maxDpr);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
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

    const draw = () => {
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

      // Update positions
      if (!reducedMotion) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;
          if (Math.abs(node.x) > 1.2) node.vx *= -1;
          if (Math.abs(node.y) > 1.2) node.vy *= -1;
          if (Math.abs(node.z) > 0.8) node.vz *= -1;
        }
      }

      // Project nodes
      const projected = nodes.map((n) => ({
        ...project(n.x, n.y, n.z, camX, camY),
        radius: n.radius,
        z: n.z,
      }));

      // Draw connections
      const maxDist = config.connectionDistance;
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
            const alpha = (1 - dist / maxDist) * 0.3;
            ctx.beginPath();
            ctx.moveTo(pa.px, pa.py);
            ctx.lineTo(pb.px, pb.py);
            ctx.strokeStyle = `rgba(176, 0, 24, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of projected) {
        const depth = (p.pz - 1) / 2;
        const alpha = Math.max(0.1, 0.7 - depth * 0.5);
        const r = (p.radius / p.pz) * 40;

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.5, r), 0, Math.PI * 2);

        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 2);
        grad.addColorStop(0, `rgba(255, 0, 60, ${alpha})`);
        grad.addColorStop(1, `rgba(176, 0, 24, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, config, initNodes, reducedMotion]);

  // Update target camera from mouse — no re-render needed
  useEffect(() => {
    sceneRef.current.cameraOffsetX = mouseX * 0.05;
    sceneRef.current.cameraOffsetY = mouseY * 0.05;
  }, [mouseX, mouseY]);

  // Pause loop when tab hidden
  useEffect(() => {
    if (!isVisible && animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, [isVisible]);
}
