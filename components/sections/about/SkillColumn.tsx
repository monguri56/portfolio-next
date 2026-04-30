import type { ReactNode } from "react";

type SkillItem = {
  title: string;
  description: ReactNode;
};

type SkillColumnProps = {
  title: string;
  summary: string;
  skills: SkillItem[];
};

export default function SkillColumn({ title, summary, skills }: SkillColumnProps) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">{title}</h3>
      <p className="mt-3 sm:mt-5 text-sm sm:text-base text-zinc-700">{summary}</p>

      <ul className="mt-6 sm:mt-8 space-y-6 sm:space-y-8 border-l border-zinc-400 pl-5 sm:pl-6">
        {skills.map((skill) => (
          <li key={skill.title}>
            <p className="text-sm sm:text-base font-semibold text-zinc-900">
              {skill.title}
            </p>
            <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-600">
              {skill.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
