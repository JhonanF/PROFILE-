import type { Project } from "../types";

export const projects: readonly Project[] = [
  {
    id: "aldlas-searcher",
    code: "SYSTEM_01",
    name: "ALDLAS SEARCHER v2",
    description:
      "Motor de alto rendimiento para procesamiento, indexación y búsqueda sobre datasets masivos con acceso a base de datos en memoria y cero escrituras temporales en disco.",
    category: ["Ingeniería de Sistemas", "Rust", "Inteligencia de Amenazas", "Ingeniería de Datos"],
    technologies: ["Rust", "Python", "SQLite FTS5", "WAL", "MMAP", "IPC"],
    highlights: [
      "Hashing FNV-1a 128-bit",
      "Procesamiento sin archivos temporales en disco",
      "Acceso a base de datos mapeada en memoria",
      "Búsqueda de texto completo a escala",
    ],
    status: "active",
  },
  {
    id: "extractor-suite",
    code: "SYSTEM_02",
    name: "EXTRACTOR SUITE v2",
    description:
      "Framework modular para instrumentación y análisis dinámico de runtimes Luau. Arquitectura de enrutamiento central de hooks, bus de eventos y gestión completa del ciclo de vida en memoria.",
    category: ["Investigación de Runtimes", "Ingeniería Inversa", "Luau"],
    technologies: ["Luau", "Lua", "Instrumentación de Runtime", "Análisis de Memoria"],
    highlights: [
      "Enrutador Central de Hooks",
      "Arquitectura EventBus",
      "Motor de inspección de runtime",
      "Gestión del ciclo de vida en memoria",
      "hookmetamethod / __namecall / __newindex",
    ],
    status: "research",
  },
  {
    id: "centro-comando-fijas",
    code: "SYSTEM_03",
    name: "CENTRO DE COMANDO DE FIJAS",
    description:
      "Sistema de predicción cuantitativa que combina machine learning aplicado con guardarrieles LLM para generar salidas estructuradas y validadas sobre datos deportivos de series temporales.",
    category: ["Machine Learning Aplicado", "Sistemas Cuantitativos", "IA"],
    technologies: ["Python", "CatBoost", "Pandas", "NumPy", "Pydantic", "Instructor", "Three.js"],
    highlights: [
      "Validación cruzada temporal (time-series)",
      "Pipeline de ingeniería de características",
      "Modelos de distribución de Poisson",
      "Guardarrieles LLM con Instructor",
      "Salida estructurada con Pydantic",
    ],
    status: "active",
  },
  {
    id: "santuario-hombre",
    code: "SYSTEM_04",
    name: "SANTUARIO DEL HOMBRE",
    description:
      "Plataforma full-stack creativa con edición visual en vivo, reconciliación del DOM y lógica de checkout dinámica — combina entornos Three.js con un CMS headless personalizado.",
    category: ["Desarrollo Creativo", "Full-Stack", "CMS"],
    technologies: ["Node.js", "Express", "GSAP", "Three.js", "Spline", "DOMParser"],
    highlights: [
      "Motor de edición visual en tiempo real",
      "Sistema de reconciliación del DOM",
      "Renderizado optimizado para móvil",
      "Lógica de checkout dinámica",
      "Generación procedural de escenas",
    ],
    status: "active",
  },
  {
    id: "telegram-automation",
    code: "SYSTEM_05",
    name: "TELEGRAM AUTOMATION ENGINE",
    description:
      "Motor de automatización asíncrona que aprovecha el protocolo MTProto para flujos de trabajo masivos en Telegram, pipelines de datos e inteligencia de amenazas.",
    category: ["Automatización", "Integración de Protocolos"],
    technologies: ["Python", "Telethon", "MTProto", "Async", "Asyncio"],
    highlights: [
      "Integración nativa con MTProto",
      "Orquestación de flujos asincrónos",
      "Pipelines de datos a gran escala",
      "Control inteligente de rate limiting",
    ],
    status: "active",
  },
  {
    id: "client-management",
    code: "SYSTEM_06",
    name: "SISTEMA DE GESTIÓN DE CLIENTES",
    description:
      "Sistema de gestión de clientes construido siguiendo principios de arquitectura limpia: patrón repositorio, inyección de dependencias, migración de esquemas e historial de auditoría completo.",
    category: ["Arquitectura de Software"],
    technologies: ["Python", "SQLite", "Tkinter"],
    highlights: [
      "Patrón Repositorio",
      "Inyección de Dependencias",
      "Sistema de migración de esquemas",
      "Historial de auditoría completo",
      "Capas de arquitectura limpia",
    ],
    status: "archived",
  },
] as const;
