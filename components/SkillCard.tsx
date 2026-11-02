
interface SkillCardProps {
  skill: string;
  description: string;
}

export default function SkillCard({
  skill,
  description,
}: SkillCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">{skill}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
