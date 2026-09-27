import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const translations = {
  es: {
    // Nav
    'nav.profile': 'PERFIL',
    'nav.dna': 'ADN',
    'nav.systems': 'SISTEMAS',
    'nav.projects': 'PROYECTOS',
    'nav.method': 'MÉTODO',
    'nav.terminal': 'TERMINAL',
    'nav.contact': 'CONTACTO',

    // Hero
    'hero.system.status': 'ESTADO DEL SISTEMA',
    'hero.status.nominal': 'NOMINAL',
    'hero.build': 'COMPILACIÓN',
    'hero.tagline': 'Observar. Analizar. Explotar. Mejorar.',
    'hero.title': 'Ingeniero de Software, Sistemas, Seguridad y Machine Learning Aplicado',
    'hero.roles': [
      "Ingeniería de Software",
      "Backend de Alto Rendimiento",
      "Ingeniería Inversa en Runtime",
      "Inteligencia de Amenazas (CTI)",
      "Sistemas de IA",
      "Desarrollo Full-Stack Creativo"
    ],
    'hero.specializations': 'Ing. de Software • Pentesting • Ing. Inversa • IA Aplicada • Sistemas',
    'hero.view.profile': 'VER PERFIL',
    'hero.init.terminal': 'INIC. TERMINAL',

    // About
    'about.title': 'SOBRE MÍ / BIO',
    'about.p1': 'Construyo sistemas en múltiples capas del stack — desde procesamiento backend eficiente en memoria y análisis en tiempo de ejecución hasta machine learning aplicado y experiencias interactivas en WebGL.',
    'about.p2': 'Mi flujo de trabajo combina arquitectura de software, desarrollo asistido por IA y experimentación técnica de bajo nivel para pasar rápidamente del concepto a sistemas funcionales.',

    // Method
    'method.subtitle': '05 / MÉTODO DE INGENIERÍA',
    'method.title1': 'INGENIERÍA',
    'method.title2': ' DE SISTEMAS',
    'method.status1': 'MODELO OPERATIVO / JF-01',
    'method.status2': 'BASADO EN DECISIONES · GUIADO POR EVIDENCIA',
    'method.position.title': 'POSICIÓN TÉCNICA',
    'method.quote1': 'La arquitectura define el sistema. ',
    'method.quote2': 'La evidencia lo valida.',
    'method.p1': 'Traduzco los objetivos del producto en restricciones explícitas, límites del sistema, flujos de datos, modos de fallo y objetivos de calidad medibles antes de la implementación.',
    'method.p2': 'Asumo la responsabilidad de las compensaciones técnicas (trade-offs) entre rendimiento, confiabilidad, seguridad y mantenibilidad — desde la primera decisión de diseño hasta la telemetría en producción.',
    'method.automation.title': 'POLÍTICA DE AUTOMATIZACIÓN',
    'method.automation.desc': 'Las herramientas asistidas por IA aceleran el trabajo mecánico limitado. Las decisiones sobre arquitectura, seguridad, precisión, revisión y despliegue siguen siendo propiedad exclusiva de la ingeniería.',
    'method.pipeline': 'PIPELINE DE ENTREGA',
    'method.stages': '07 ETAPAS',

    // Contact
    'contact.subtitle': '07 / CONTACTO',
    'contact.title1': 'PONTE EN ',
    'contact.title2': 'CONTACTO',
    'contact.channels': 'CANALES',
    'contact.open': 'ABIERTO A OPORTUNIDADES',
    'contact.footer.build': 'COMPILACIÓN',
    'contact.footer.status': 'RUNTIME ACTIVO',
    'contact.footer.desc': 'Diseñado y construido por Jhonan Factor',

    // Terminal
    'terminal.input': 'Ingresa un comando...',
    'terminal.prompt': 'jhonan@system:~$'
  },
  en: {
    // Nav
    'nav.profile': 'PROFILE',
    'nav.dna': 'DNA',
    'nav.systems': 'SYSTEMS',
    'nav.projects': 'PROJECTS',
    'nav.method': 'METHOD',
    'nav.terminal': 'TERMINAL',
    'nav.contact': 'CONTACT',

    // Hero
    'hero.system.status': 'SYSTEM STATUS',
    'hero.status.nominal': 'NOMINAL',
    'hero.build': 'BUILD',
    'hero.tagline': 'Observe. Analyze. Exploit. Improve.',
    'hero.title': 'Software, Systems, Security & Applied Machine Learning Engineer',
    'hero.roles': [
      "Software Engineering",
      "High-Performance Backend",
      "Runtime Reverse Engineering",
      "Cyber Threat Intelligence",
      "AI Systems",
      "Creative Full-Stack"
    ],
    'hero.specializations': 'Software Eng. • Pentesting • Reverse Eng. • Applied AI • Systems',
    'hero.view.profile': 'VIEW PROFILE',
    'hero.init.terminal': 'INIT TERMINAL',

    // About
    'about.title': 'ABOUT / BIO',
    'about.p1': 'I build systems across multiple layers of the stack — from memory-aware backend processing and runtime analysis to applied machine learning and interactive WebGL experiences.',
    'about.p2': 'My workflow combines software architecture, AI-assisted development and low-level technical experimentation to move rapidly from concept to working systems.',

    // Method
    'method.subtitle': '05 / ENGINEERING METHOD',
    'method.title1': 'SYSTEMS',
    'method.title2': ' ENGINEERING',
    'method.status1': 'OPERATING MODEL / JF-01',
    'method.status2': 'DECISION-OWNED · EVIDENCE-DRIVEN',
    'method.position.title': 'ENGINEERING POSITION',
    'method.quote1': 'Architecture defines the system. ',
    'method.quote2': 'Evidence validates it.',
    'method.p1': 'I translate product goals into explicit constraints, system boundaries, contracts, data flows, failure modes, and measurable quality targets before implementation.',
    'method.p2': 'I own the technical trade-offs across performance, reliability, security, and maintainability—from the first design decision through production telemetry.',
    'method.automation.title': 'AUTOMATION POLICY',
    'method.automation.desc': 'AI-assisted tools accelerate bounded mechanical work. Architecture, security, correctness, review, and release decisions remain engineer-owned.',
    'method.pipeline': 'DELIVERY PIPELINE',
    'method.stages': '07 STAGES',

    // Contact
    'contact.subtitle': '07 / CONTACT',
    'contact.title1': 'REACH ',
    'contact.title2': 'OUT',
    'contact.channels': 'CHANNELS',
    'contact.open': 'OPEN TO OPPORTUNITIES',
    'contact.footer.build': 'BUILD',
    'contact.footer.status': 'RUNTIME ACTIVE',
    'contact.footer.desc': 'Designed & built by Jhonan Factor',

    // Terminal
    'terminal.input': 'Enter command...',
    'terminal.prompt': 'jhonan@system:~$'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('jf-lang');
    if (saved === 'es' || saved === 'en') {
      setLanguage(saved);
    } else {
      setLanguage('es');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('jf-lang', lang);
  };

  const t = (key: string) => {
    if (key.includes('.')) {
        const parts = key.split('.');
        if(parts[0] === 'method' && parts[1] === 'tags') {
           const arr = (translations[language] as any)['method.tags'] as string[];
           if (arr && parts[2]) return arr[parseInt(parts[2])] || key;
        }
    }
    return (translations[language] as any)[key] || key;
  };

  const tArray = (key: string) => {
    return ((translations[language] as any)[key] as string[]) || [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
