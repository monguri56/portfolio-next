"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import FilterButton from "./works/FilterButton";
import ProjectCard from "./works/ProjectCard";
import WorkProjectModal from "./works/WorkProjectModal";
import { workProjects, type Category, type WorkProject } from "./works/workProjects";

export default function ClientWorkSection() {
  const [active, setActive] = useState<Category>("all");
  const [openProject, setOpenProject] = useState<WorkProject | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!openProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [openProject]);

  const filtered = useMemo(() => {
    if (active === "all") return workProjects;
    return workProjects.filter((project) => project.category.includes(active));
  }, [active]);

  return (
    <div id="works" className="h-full w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-[1500px] px-5 sm:px-8 lg:px-10 py-12">
        <div className="flex flex-col gap-5 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Client Works
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-zinc-950">
              작업 목록
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterButton label="All" active={active === "all"} onClick={() => setActive("all")} />
            <FilterButton
              label="Design"
              active={active === "design"}
              onClick={() => setActive("design")}
            />
            <FilterButton
              label="Development"
              active={active === "development"}
              onClick={() => setActive("development")}
            />
          </div>
        </div>

        <div
          onWheelCapture={(event) => event.stopPropagation()}
          className="mt-8 h-[660px] max-h-[calc(100vh-180px)] overflow-y-auto pr-2 client-scroll"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setOpenProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {mounted && openProject
        ? createPortal(
            <WorkProjectModal project={openProject} onClose={() => setOpenProject(null)} />,
            document.body
          )
        : null}

      <style jsx global>{`
        .client-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .client-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .client-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
