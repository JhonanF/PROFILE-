import { useState, useCallback } from "react";
import { BackgroundScene } from "./features/effects/BackgroundScene";
import { CustomCursor } from "./features/effects/CustomCursor";
import { IntroSequence } from "./features/intro/IntroSequence";
import { Navigation } from "./components/layout/Navigation";
import { ScrollIndicator } from "./components/layout/ScrollIndicator";
import { Hero } from "./features/hero/Hero";
import { TechnicalIdentity } from "./features/profile/TechnicalIdentity";
import { TechConstellation } from "./features/constellation/TechConstellation";
import { ProjectGrid } from "./features/projects/ProjectGrid";
import { ArchitecturalVibe } from "./features/vibe/ArchitecturalVibe";
import { Terminal } from "./features/terminal/Terminal";
import { Contact } from "./features/contact/Contact";
import { useActiveSection } from "./hooks/useActiveSection";
import "./styles/globals.css";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const activeSection = useActiveSection();

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Fixed background layers */}
      <BackgroundScene />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Intro boot sequence */}
      <IntroSequence onComplete={handleIntroComplete} />

      {/* Main app — opacity transition after intro */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.8s ease",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Navigation */}
        <Navigation activeSection={activeSection} />

        {/* Scroll position indicator */}
        <ScrollIndicator
          activeSection={activeSection}
          totalSections={7}
        />

        {/* Main content */}
        <main id="main-content" role="main">
          <Hero />
          <TechnicalIdentity />
          <TechConstellation />
          <ProjectGrid />
          <ArchitecturalVibe />
          <Terminal />
          <Contact />
        </main>
      </div>
    </>
  );
}
