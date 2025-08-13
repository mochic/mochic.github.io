import { useEffect, useState } from "react";
// import { ResumeButton } from "./ResumeButton";
// import PDFViewer from "./PDFViewer";

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

// function PdfModal({
//   open,
//   onClose,
//   src,
//   title = "Document",
// }: {
//   open: boolean;
//   onClose: () => void;
//   src: string;
//   title?: string;
// }) {
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (open) window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [open, onClose]);

//   if (!open) return null;
//   return (
//     <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
//       <div className="modal-chrome">
//         <div className="modal-title">{title}</div>
//         <button
//           className="modal-close"
//           onClick={onClose}
//           aria-label="Close PDF"
//         >
//           ✕
//         </button>
//       </div>
//       {/* Use iframe for broad support; put the PDF in /public */}
//       <iframe className="modal-frame" src={src} title={title} />
//     </div>
//   );
// }

function PdfModal({
  open,
  onClose,
  src,
  title = "PDF Viewer",
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-chrome">
        <div className="modal-title">{title}</div>

        {/* Action buttons (same styling as card actions) */}
        <div className="modal-actions">
          <a
            className="button"
            href={src}
            download
            target="_blank"
            rel="noreferrer"
            aria-label="Download PDF"
            style={{
              marginRight: 10,
              fontSize: 13.33,
            }}
          >
            Download
          </a>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close PDF"
          >
            ✕
          </button>
          {/* <button
            className="button"
            onClick={onClose}
            type="button"
            aria-label="Close PDF"
          >
            Close
          </button> */}
        </div>
      </div>

      {/* <iframe className="modal-frame" src={src} title={title} />
      <embed
        className="modal-frame"
        src={src}
        type="application/pdf"
        title={title}
        // onError={() => setMode('gview')}
      /> */}
      <div
        style={{
          overflowY: "auto",
          WebkitOverflowScrolling: "touch", // smooth scrolling on iOS
          height: "100%", // fill modal content height
        }}
      >
        <embed
          src={`${import.meta.env.BASE_URL}Christopher_Mochizuki_Resume.pdf`}
          type="application/pdf"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
      {/* <PDFViewer
        url={`${import.meta.env.BASE_URL}Christopher_Mochizuki_Resume.pdf`}
      /> */}
    </div>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [pdfOpen, setPdfOpen] = useState(false);
  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  const pdfUrl = `${import.meta.env.BASE_URL}Christopher_Mochizuki_Resume.pdf`;

  return (
    <div className="container">
      <header className="header">
        <div className="brand">Christopher Mochizuki</div>
        <nav className="nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#publications">Publications</a>
          <a href="#projects">Projects</a>
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
          <div className="card-header">
            <h1>Software Engineer · Data & AI</h1>
          </div>
          <div
            className="card-body scrollable"
            role="region"
            aria-label="About"
            tabIndex={0}
          >
            <p>
              Experienced software engineer and data analyst with a decade of
              interdisciplinary experience spanning scientific research, data
              pipelines, and production software systems. Proven ability to
              bridge scientific needs with engineering solutions in
              research-driven environments. Specializes in building robust ETL
              pipelines, automating experimental processes, and developing
              scientific tools.
            </p>
          </div>
          <div className="card-actions">
            {/* <ResumeButton /> */}
            {/* <a
              className="button"
              href="/Christopher_Mochizuki_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="View Resume"
            >
              View Resume
            </a> */}
            {/* Open PDF inside modal so it’s closable */}
            <button
              className="button"
              aria-label="View Resume"
              // onClick={() => setPdfOpen(true)}
              onClick={() => window.open(pdfUrl, "_blank")}
            >
              View Resume (PDF)
            </button>
          </div>
          {/* <a
            className="button"
            href="/Christopher_Mochizuki_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="View Resume"
          >
            View Resume
          </a> */}
        </section>
        {/* <section id="about" className="card span-6">
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
        </section> */}

        {/* QUICK LINKS */}
        <section className="card span-6">
          <div className="card-header">
            <h2>Selected Publications</h2>
          </div>
          <div
            className="card-body scrollable"
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

          <div className="card-actions">
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

        {/* PROJECTS */}
        <section id="projects" className="card span-4">
          <h2>Projects</h2>
          <ul>
            <li>
              <a
                href="https://mochic.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                This website • Installable PWA
              </a>
            </li>
            <li>Work in progress...</li>
          </ul>
        </section>

        {/* PUBLICATIONS */}
        {/* PUBLICATIONS (scrollable list, static button) */}
        {/* <section id="publications" className="card span-4 pubs-card">
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
        </section> */}

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
        <span>© {new Date().getFullYear()} Christopher Mochizuki</span>
        <div className="social-icons">
          <a
            href="https://mochic.github.io/"
            target="_blank"
            rel="noreferrer"
            aria-label="Website"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.486 2 2 6.487 2 12s4.486 10 10 10 
             10-4.487 10-10S17.514 2 12 2zm6.93 6h-3.197a15.6 
             15.6 0 00-1.084-3.642A8.024 8.024 0 0118.93 8zM12 
             4c.846 1.163 1.5 2.994 1.773 4H10.23C10.5 6.994 
             11.154 5.163 12 4zM4.07 8h3.197a15.6 15.6 0 
             011.084-3.642A8.024 8.024 0 004.07 8zM4 12c0-.68.07-1.342.198-1.983h3.516a17.53 
             17.53 0 000 3.966H4.198A7.964 7.964 0 014 12zm.07 
             4h3.197a15.6 15.6 0 01-1.084 3.642A8.024 8.024 0 
             014.07 16zM12 20c-.846-1.163-1.5-2.994-1.773-4h3.543C13.5 
             17.006 12.846 18.837 12 20zm3.649-4h3.197a8.024 
             8.024 0 01-2.113 3.642A15.6 15.6 0 0015.649 16zm.637-2a15.52 
             15.52 0 000-3.966h3.516A7.964 7.964 0 0120 12c0 
             .68-.07 1.342-.198 1.983h-3.516z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/mochic"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 
          5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
          0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
          -.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729
          1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 
          1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.3-5.466-1.334-5.466-5.93 
          0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 
          0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 
          3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 
          3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 
          1.234 1.91 1.234 3.22 0 4.61-2.803 
          5.625-5.475 5.92.43.37.823 1.096.823 2.21 
          0 1.594-.015 2.877-.015 3.27 0 .32.218.694.825.576 
          C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/christopher-mochizuki-9691267b/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.852-3.037
          -1.853 0-2.137 1.445-2.137 2.939v5.667H9.35V9h3.414v1.561h.049
          c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286z
          M5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124z
          M6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771
          C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451
          C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
              />
            </svg>
          </a>
        </div>
      </footer>
      {/* Modal lives at root so it overlays everything */}
      <PdfModal
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        src={pdfUrl}
        // title="Resume"
      />
    </div>
  );
}
