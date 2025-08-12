import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    (document.documentElement.dataset.theme as "light" | "dark") || "light"
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="container">
      <header className="header">
        <div className="brand">Christopher Mochizuki</div>
        <nav className="nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#publications">Publications</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="toggle"
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "🌙" : "☀️"}
          <span className="toggle-text">
            {theme === "dark" ? " Dark" : " Light"}
          </span>
        </button>
      </header>

      <main className="grid">
        {/* HERO / ABOUT */}
        <section id="about" className="card span-6">
          <h1>Software Engineer · Data & AI</h1>
          <p>
            I build production-grade systems, data pipelines, and automation for
            research and AI/ML workloads. Focused on Python, modern web, and
            cloud data platforms.
          </p>
          <a
            className="button"
            href="/Christopher_Mochizuki_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            View Resume (PDF)
          </a>
        </section>

        {/* QUICK LINKS */}
        <section className="card span-6">
          <h2>Links</h2>
          <p>
            <a
              href="https://github.com/mochic"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>{" "}
            ·{" "}
            <a
              href="https://www.linkedin.com/in/christopher-mochizuki-9691267b/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="card span-4">
          <h2>Projects</h2>
          <ul>
            <li>Resume Tailor (OpenAI, agents, PDF gen)</li>
            <li>Data Pipelines for Neuroscience Experiments</li>
            <li>Dashboarding & ETL modernization (Mypy, Pydantic)</li>
          </ul>
        </section>

        {/* PUBLICATIONS */}
        {/* PUBLICATIONS (scrollable list, static button) */}
        <section id="publications" className="card span-4 pubs-card">
          <h2>Selected Publications</h2>

          <div
            className="scrollable"
            role="region"
            aria-label="Selected publications"
            tabIndex={0}
          >
            <ul className="pubs">
              <li className="pub-item">
                <strong>
                  Survey of spiking in the mouse visual system reveals
                  functional hierarchy
                </strong>
                <br />
                <span className="pub-venue">Nature</span> ·{" "}
                <span className="pub-date">Apr 2021</span>
              </li>
              <li className="pub-item">
                <strong>
                  SHIELD: Skull-shaped hemispheric implants enabling large-scale
                  electrophysiology datasets
                </strong>
                <br />
                <span className="pub-venue">Neuron</span> ·{" "}
                <span className="pub-date">Jul 2024</span>
              </li>
              <li className="pub-item">
                <strong>
                  Neurophysiological differentiation across mouse visual brain
                  areas and timescales
                </strong>
                <br />
                <span className="pub-venue">Front. Comp. Neurosci.</span> ·{" "}
                <span className="pub-date">Mar 2023</span>
              </li>
              <li className="pub-item">
                <strong>
                  Learning, Motivation, and Perception in Transgenic Mouse Lines
                </strong>
                <br />
                <span className="pub-venue">
                  Front. Behav. Neurosci.
                </span> · <span className="pub-date">Jun 2020</span>
              </li>
              <li className="pub-item">
                <strong>
                  Stimulus novelty uncovers coding diversity in visual cortical
                  circuits
                </strong>{" "}
                (preprint)
                <br />
                <span className="pub-venue">bioRxiv</span> ·{" "}
                <span className="pub-date">Feb 2023</span>
              </li>
            </ul>
          </div>

          <div className="pubs-actions">
            <a
              className="button"
              href="https://www.researchgate.net/scientific-contributions/Chris-Mochizuki-2147168242"
              target="_blank"
              rel="noreferrer"
            >
              Additional contributions
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="card span-4">
          <h2>Contact</h2>
          <p>Seattle, WA · Open to full-time opportunities.</p>
          <p>
            <a href="mailto:mochic808@gmail.com">mochic808@gmail.com</a>
          </p>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Christopher Mochizuki · Installable PWA
      </footer>
    </div>
  );
}
