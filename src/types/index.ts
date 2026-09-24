// ============================================================
// Jhonan Factor Portfolio — Domain Types
// All types are strict. No `any` usage.
// ============================================================

export type ProjectStatus = "active" | "research" | "archived";

export interface Project {
  readonly id: string;
  readonly code: string; // e.g. "SYSTEM_01"
  readonly name: string;
  readonly description: string;
  readonly category: readonly string[];
  readonly technologies: readonly string[];
  readonly highlights: readonly string[];
  readonly status: ProjectStatus;
}

export interface Technology {
  readonly name: string;
  readonly description?: string;
}

export interface SkillCategory {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly color: string;
  readonly technologies: readonly Technology[];
}

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly url: string;
  readonly icon: string;
  readonly ariaLabel: string;
}

export interface TerminalCommand {
  readonly command: string;
  readonly output: readonly string[];
}

export interface AnimationConfig {
  readonly duration: number;
  readonly ease: string;
  readonly delay?: number;
}

export interface SceneConfig {
  readonly nodeCount: number;
  readonly connectionDistance: number;
  readonly particleSpeed: number;
  readonly maxDpr: number;
}

export interface ConstellationNode {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly category: string;
  readonly description: string;
  readonly connections: readonly string[];
}

export interface ProfileMeta {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly roles: readonly string[];
  readonly location: string;
  readonly buildId: string;
  readonly status: string;
}

export interface WorkflowStep {
  readonly step: string;
  readonly description: string;
}

export type SectionId =
  | "identity"
  | "dna"
  | "constellation"
  | "projects"
  | "vibe"
  | "terminal"
  | "contact";

export interface NavItem {
  readonly label: string;
  readonly section: SectionId;
  readonly index: number;
}

export interface AudioTrack {
  readonly title: string;
  readonly artist: string;
  readonly src: string;
}
