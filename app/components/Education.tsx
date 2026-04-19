import Image from "next/image";
import { educationData } from "../data/EducationData";

export default function Education() {
  return (
    <section className="w-full pt-30 pb-20 ">
      <div className="w-full px-30 pt-0">
        <div className="grid grid-cols-2 gap-12 items-start">
          <div>
            <div className="grid grid-cols-4 gap-10">
              <div className="col-span-1">
                <p className="text-sm tracking-[0.3em] text-gray-500">EDUCATION</p>
              </div>

              <div className="col-span-3">
                {Object.values(educationData).map((item, index) => (
                  <div key={index} className="space-y-16">
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-12 h-[2px] bg-black"></div>
                      <div className="border-t border-gray-300 w-120"></div>

                      <div className="pt-6">
                        <h3 className="text-2xl font-semibold text-gray-900 whitespace-nowrap">
                          {item.title}
                        </h3>
                        <p className="italic text-gray-600">{item.institution}</p>
                        <p className="text-sm text-gray-400 mt-2 mb-10">{item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end ">
            <Image
              style={{ width: "auto" }}
              src="/Novologofct2021.png"
              alt="NOVA School of Science and Technology Logo"
              height={300}
              width={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
