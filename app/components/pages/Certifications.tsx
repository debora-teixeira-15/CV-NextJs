"use client";

import dynamic from "next/dynamic";

const CertificationModal = dynamic(() => import("../general/CertificationModal"), { ssr: false });

export default function Certifications() {
  return (
    <section className="w-full px-25">
      <div className="w-full">
        <div className="col-span-3">
          <p className="text-lg tracking-[0.3em] text-gray-500 shrink-0">CERTIFICATIONS</p>
          <div className="flex flex-1 gap-10 mt-5">
            <div>
              <CertificationModal file="/certifications/PSPOI.pdf" />
            </div>
            <div>
              <CertificationModal file="/certifications/uxfoundations.pdf" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
