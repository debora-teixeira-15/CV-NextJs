import SEO from "./SEO";

export default function Header() {
  const metadata = {
    title: "Débora Teixeira – Software Developer",
    description:
      "I'm Débora Teixeira, a software developer with a passion for frontend. I have a masters degree in Computer Science and 5 years of work experience.",
  };

  return (
    <>
      <SEO
        title={metadata.title}
        description={metadata.description}
      />

      <div className="relative isolate overflow-hidden bg-white py-24 sm:py-20 shadow-lg">
        <div className="mx-auto max-w-7xl px-3 lg:px-8">
          <div className="mx-auto max-w-3xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-gray-800 sm:text-7xl">
              Curriculum Vitae
            </h2>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              My name is Débora Teixeira and I'm a software developer
              with a passion for frontend. This is my curriculum
              vitae, where you can find more about my experience and
              skills. If you want to know more about me, feel free to
              reach out!
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-25 lg:grid-cols-3">
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-600">
                  Years of work experience
                </dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-800">
                  5
                </dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-600">
                  Degree of education
                </dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-800">
                  Masters
                </dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-600">
                  Field of study
                </dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-800">
                  Computer Science
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
