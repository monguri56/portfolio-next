"use client";

import Image from "next/image";
import type { WorkProject } from "./workProjects";
import WorkLinkButton from "./WorkLinkButton";

type ProjectCardProps = {
  project: WorkProject;
  onOpen: () => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const hasDetail = project.role.length > 0 || project.highlights.length > 0;
  const hasWebsite = Boolean(project.websiteUrl);

  return (
    <article className="group border border-zinc-200 bg-white transition hover:border-zinc-950">
      <div className="relative h-[190px] border-b border-zinc-100 bg-zinc-50">
        <Image
          src={project.thumb}
          alt={project.title}
          fill
          className="object-contain p-5 transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {project.category.map((tag) => (
            <span
              key={tag}
              className="border border-zinc-200 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-zinc-500"
            >
              {tag === "design" ? "Design" : "Development"}
            </span>
          ))}
        </div>

        <h3 className="mt-4 text-lg font-semibold text-zinc-950">{project.title}</h3>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-600">
          {project.summary}
        </p>

        {hasDetail || hasWebsite ? (
          <div
            className={[
              "mt-5 grid gap-2",
              hasDetail && hasWebsite ? "grid-cols-2" : "grid-cols-1",
            ].join(" ")}
          >
            {hasDetail ? (
              <button
                type="button"
                onClick={onOpen}
                className="inline-flex h-10 w-full items-center justify-center border border-zinc-300 px-3 text-sm text-zinc-800 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
              >
                상세 설명
              </button>
            ) : null}

            {project.websiteUrl ? (
              <WorkLinkButton href={project.websiteUrl}>Website Link</WorkLinkButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
