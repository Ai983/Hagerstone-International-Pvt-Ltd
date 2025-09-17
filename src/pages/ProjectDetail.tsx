import { useParams, Link } from "react-router-dom";
import { getProjectById, projects } from "../data/project";
import ProjectHero from "../components/projects/ProjectHero";
import FloorLayout from "../components/projects/FloorLayout";
import ProjectSection from "../components/projects/ProjectSection";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id || "");

  if (!project) return <div className="p-10">Project not found.</div>;

  // Compute prev/next for bottom navigation
  const idx = projects.findIndex((p) => p.id === project.id);
  const prev = idx > 0 ? projects[idx - 1] : undefined;
  const next = idx < projects.length - 1 ? projects[idx + 1] : undefined;

  return (
    <div>
      <ProjectHero
        title={project.title}
        client={project.client}
        hero={project.hero}
        heroVideo={project.heroVideo}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {project.floors?.map((f) => (
          <FloorLayout key={f.name} {...f} />
        ))}

        {project.sections.map((s) => (
          <ProjectSection key={s.name} {...s} />
        ))}

        {/* Bottom nav: Prev / Next project */}
        <div className="mt-16 flex items-center justify-between border-t pt-8">
          <div>
            {prev ? (
              <Link
                to={`/projects/${prev.id}`}
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 hover:bg-accent"
              >
                ← Previous: {prev.title}
              </Link>
            ) : (
              <span className="text-muted-foreground">Start</span>
            )}
          </div>
          <Link
            to="/projects"
            className="rounded-full border px-6 py-3 hover:bg-accent"
          >
            Back to Projects
          </Link>
          <div>
            {next ? (
              <Link
                to={`/projects/${next.id}`}
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 hover:bg-accent"
              >
                Next: {next.title} →
              </Link>
            ) : (
              <span className="text-muted-foreground">End</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}