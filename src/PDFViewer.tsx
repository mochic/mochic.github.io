import { useEffect, useRef } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

import workerUrl from "pdfjs-dist/build/pdf.worker.min.js?url";

GlobalWorkerOptions.workerSrc = workerUrl;

export default function PDFViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = ""; // clear

      const pdf = await getDocument(url).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvas: canvas, canvasContext: ctx, viewport })
          .promise;
        containerRef.current.appendChild(canvas);
      }
    };
    load();
  }, [url]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: "auto",
        maxHeight: "80vh",
        padding: "1rem",
      }}
    />
  );
}
