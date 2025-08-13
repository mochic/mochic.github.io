import { useState } from "react";

export function ResumeButton() {
  const [open, setOpen] = useState(false);
  // Works in dev ("/") and on GitHub Pages ("/<repo>/")
  const pdfUrl = `${import.meta.env.BASE_URL}Christopher_Mochizuki_Resume.pdf`;

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        View Resume
      </button>

      {open && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label="Resume viewer"
        >
          <div className="modal__content">
            <div className="modal__bar">
              <a className="button" href={pdfUrl} download>
                Download PDF
              </a>
              <button className="button ghost" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            {/* Native PDF viewer in an iframe */}
            <iframe
              className="modal__frame"
              // Hints to the built-in viewer: zoom to page width, hide nav panes
              src={`${pdfUrl}#view=FitH&zoom=page-width&navpanes=0&toolbar=1`}
              title="Resume PDF"
            />
          </div>
        </div>
      )}
    </>
  );
}
