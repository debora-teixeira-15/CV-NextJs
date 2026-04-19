"use client";

import { useState } from "react";
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

  return (
    <>
      {/* PREVIEW */}
      <div
        onClick={() => setOpen(true)}
        className="w-full h-[232px] cursor-pointer overflow-hidden rounded-md border shadow hover:shadow-lg transition"
      >
        <Document file={file}>
          <Page pageNumber={1} width={300} />
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
