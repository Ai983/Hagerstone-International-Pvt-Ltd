import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/project";
import ProjectsHero from "../components/projects/ProjectsHero";

const categories = [
	"All",
	"Interiors",
	"Institutional",
	"Hospitality",
	"Housing",
	"Commercial",
];

const Projects = () => {
	const [activeCategory, setActiveCategory] = useState("All");

	const filteredProjects =
		activeCategory === "All"
			? projects
			: projects.filter(
					(p) => p.sector?.toLowerCase() === activeCategory.toLowerCase()
			  );

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			{/* Hero Slider */}
			<ProjectsHero />
			{/* Filter Bar */}
			<div className="flex gap-4 mb-8 justify-center">
				{categories.map((cat) => (
					<button
						key={cat}
						className={`px-4 py-2 rounded-full border ${
							activeCategory === cat
								? "bg-black text-white"
								: "bg-white text-black"
						}`}
						onClick={() => setActiveCategory(cat)}
					>
						{cat}
					</button>
				))}
			</div>

			{/* Project Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				{filteredProjects.map((project) => (
					<Link
						key={project.id}
						to={`/projects/${project.id}`}
						className="group block bg-white rounded-xl shadow-lg hover:scale-105 transition-transform"
					>
						<img
							src={project.hero}
							alt={project.title}
							className="w-full h-56 object-cover rounded-t-xl"
						/>
						<div className="p-4">
							<h2 className="text-xl font-bold">{project.title}</h2>
							<p className="text-sm text-muted-foreground">
								{project.location}
							</p>
							<p className="mt-2 text-xs">{project.year}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Projects;