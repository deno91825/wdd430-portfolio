
import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-16">
        <p className="font-semibold text-blue-600">
          SOFTWARE DEVELOPMENT STUDENT
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
          Hello, I&apos;m Oweki Denis.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          I am passionate about building useful web applications,
          solving problems through technology, and continuously
          improving my software development skills.
        </p>

        <a
          href="/about"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Learn More About Me
        </a>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold text-slate-900">
          My Projects
        </h2>

        <ProjectList />
      </section>
    </main>
  );
}
