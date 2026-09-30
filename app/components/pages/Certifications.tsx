"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { certificationsData } from "../../data/CertificationsData";

const CertificationModal = dynamic(() => import("../general/CertificationModal"), { ssr: false });

const PAGE_SIZE = 2;

export default function Certifications() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(certificationsData.length / PAGE_SIZE);

  const goToPrev = () => setPage((p) => (p - 1 + pageCount) % pageCount);
  const goToNext = () => setPage((p) => (p + 1) % pageCount);

  return (
    <section className="w-full px-6 lg:px-25">
      <div className="w-full">
        <div className="col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-lg tracking-[0.3em] text-gray-500 shrink-0">CERTIFICATIONS</p>
            {pageCount > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {page + 1}/{pageCount}
                </span>
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Previous certifications"
                  className="flex h-9 w-9 items-center justify-center text-gray-400 rounded-full border shadow hover:shadow-lg transition"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next certifications"
                  className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-400 shadow hover:shadow-lg transition"
                >
                  ›
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:flex-row flex-1 gap-6 md:gap-10 mt-5">
            {certificationsData.map((certification, index) => {
              const isVisible = index >= page * PAGE_SIZE && index < (page + 1) * PAGE_SIZE;
              return (
                <div
                  key={certification.file}
                  className={isVisible ? "block flex-1 w-full" : "hidden"}
                >
                  <CertificationModal file={certification.file} />
                </div>
              );
            })}
          </div>
          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: pageCount }).map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === page ? "bg-gray-900" : "bg-gray-300"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
