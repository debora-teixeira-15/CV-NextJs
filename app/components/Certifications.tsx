"use client";

import dynamic from "next/dynamic";

const CertificationModal = dynamic(() => import("./general/CertificationModal"), { ssr: false });

export default function Certifications() {
  return (
    <section className="w-full pt-20 pb-20">
      <div className="w-full px-30">
        <div className="flex items-start gap-12">
          <p className="text-md tracking-[0.3em] text-gray-500 shrink-0">CERTIFICATIONS</p>
          <div className="flex flex-1 justify-between mr-80 ml-15 ">
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
