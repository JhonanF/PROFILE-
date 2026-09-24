import { About } from "../about/About";
import { SocialLinks } from "./SocialLinks";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative section px-6"
      style={{ zIndex: 10 }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div
            className="font-mono text-xs tracking-widest mb-3"
            style={{ color: "var(--accent-violet)" }}
            aria-hidden="true"
          >
            07 / CONTACT
          </div>
          <h2
            id="contact-heading"
            className="font-display font-black"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text-primary)",
            }}
          >
            REACH
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-violet-light), var(--accent-blue-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginLeft: "0.4em",
              }}
            >
              OUT
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* About */}
          <About />

          {/* Links & status */}
          <div className="flex flex-col gap-6">
            {/* Social links */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="font-mono text-xs tracking-widest mb-5"
                style={{ color: "var(--text-muted)" }}
                aria-hidden="true"
              >
                CHANNELS
              </div>
              <SocialLinks />
            </div>

            {/* Availability / open to */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "var(--bg-glass)",
                border: "1px solid rgba(34,197,94,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="status-dot" aria-hidden="true" />
                <span
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "#22c55e" }}
                >
                  OPEN TO OPPORTUNITIES
                </span>
              </div>

              <ul className="flex flex-col gap-2 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {[
                  "Systems Engineering",
                  "Security Research",
                  "Applied ML",
                  "Creative Development",
                  "Technical Consulting",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span style={{ color: "var(--accent-violet)" }} aria-hidden="true">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-16 pt-8 text-center font-mono text-xs"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
          aria-label="Footer"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span>JHONAN FACTOR</span>
            <span style={{ color: "var(--border-default)" }}>│</span>
            <span>BUILD {" "}<span style={{ color: "var(--accent-violet-light)" }}>JF.01</span></span>
            <span style={{ color: "var(--border-default)" }}>│</span>
            <span className="flex items-center gap-1.5">
              <span className="status-dot" aria-hidden="true" />
              RUNTIME ACTIVE
            </span>
          </div>
          <p className="mt-3" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
            Designed & built by Jhonan Factor
          </p>
        </div>
      </div>
    </section>
  );
}
