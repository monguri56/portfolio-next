"use client";

import Image from "next/image";
import type { WorkProject } from "./workProjects";
import MiniPanel from "./MiniPanel";
import WorkLinkButton from "./WorkLinkButton";

type WorkProjectModalProps = {
  project: WorkProject;
  onClose: () => void;
};

export default function WorkProjectModal({ project, onClose }: WorkProjectModalProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center overflow-y-auto bg-black/45 px-4 py-6 sm:px-8 lg:px-12"
      role="dialog"
      aria-modal="true"
      onWheel={(event) => event.stopPropagation()}
    >
      <div className="mx-auto flex max-h-[calc(100vh-48px)] w-full max-w-[1360px] flex-col border border-zinc-200 bg-white">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-8 sm:p-10 lg:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Work Detail
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-zinc-950">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 shrink-0 border border-zinc-300 text-zinc-700 transition hover:bg-zinc-950 hover:text-white"
            aria-label="Close work detail"
          >
            ×
          </button>
        </div>

        <div
          className="overflow-y-auto p-8 sm:p-10 lg:p-12"
          onWheel={(event) => event.stopPropagation()}
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[320px] border border-zinc-200 bg-zinc-50">
              <Image
                src={project.thumb}
                alt={project.title}
                fill
                className="object-contain p-5"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>

            <div className="grid gap-6">
              <div className="border border-zinc-200 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Overview
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{project.summary}</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <MiniPanel label="Role" items={project.role} />
                <MiniPanel label="Highlights" items={project.highlights} />
              </div>

              <div className="border border-zinc-200 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Tags
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs uppercase tracking-[0.12em] text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Links
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.links.map((link) => (
                <WorkLinkButton key={`${project.id}-${link.label}`} href={link.href}>
                  {link.label}
                </WorkLinkButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
