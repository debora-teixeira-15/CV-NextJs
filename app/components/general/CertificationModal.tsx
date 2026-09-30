"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface Props {
  file: string;
}

export default function CertificadoModal({ file }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* PREVIEW */}
      <div
        onClick={() => setOpen(true)}
        className="w-full min-w-[260px] sm:min-w-[320px] md:min-w-[340px] max-w-[420px] h-[260px] md:h-[280px] cursor-pointer overflow-hidden rounded-md border shadow hover:shadow-lg transition flex items-center justify-center bg-gray-50"
      >
        <Document file={file} className="w-full h-full flex items-center justify-center">
          <Page
            pageNumber={1}
            width={600}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="w-full h-full flex items-center justify-center [&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!object-cover"
          />
        </Document>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* CONTENT */}
          <div
            className="relative w-[95%] max-w-4xl rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="mb-3 flex items-right justify-end">
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gray-900 px-3 py-1 text-sm text-white hover:bg-gray-400"
              >
                Open ↗
              </a>
            </div>

            {/* PDF VIEW */}
            <div className="max-h-[80vh] overflow-auto flex justify-center">
              <Document file={file}>
                <Page pageNumber={1} width={600} />
              </Document>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
