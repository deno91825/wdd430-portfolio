
import SkillCard from "@/components/SkillCard";

export default function About() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        About Me
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        I am a software development student passionate about building
        useful web applications and improving my programming skills.
      </p>

      <h2 className="mt-10 mb-5 text-2xl font-bold text-slate-900">
        My Skills
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <SkillCard
          skill="Web Development"
          description="Building responsive websites using HTML, CSS, JavaScript, and React."
        />

        <SkillCard
          skill="Programming"
          description="Learning software development principles and problem-solving."
        />
      </div>
    </main>
  );
}
