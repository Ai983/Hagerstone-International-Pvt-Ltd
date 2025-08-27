import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Building, Home, Hotel, Factory, Store, MapPin, Calendar } from "lucide-react";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", icon: Building },
    { name: "Office", icon: Building },
    { name: "Residential", icon: Home },
    { name: "Hotels", icon: Hotel },
    { name: "Factories", icon: Factory },
    { name: "Commercial", icon: Store },
  ];

  const projects = [
    {
      id: 1,
      title: "Modern Meeting Room - Engineered Success",
      category: "Office",
      image: "/lovable-uploads/4ebed2b0-411b-4898-bc5c-9d4e3278dd67.png",
      location: "Delhi, NCR",
      year: "2024",
      description: "Contemporary meeting space with glass walls and professional branding",
      tags: ["Modern", "Professional", "Glass Design"]
    },
    {
      id: 2,
      title: "Executive Office Suite - Premium Design",
      category: "Office",
      image: "/lovable-uploads/7a2ed00f-2c02-4bda-95e0-bd4c1cdc6b97.png",
      location: "Mumbai, Maharashtra",
      year: "2024",
      description: "Sophisticated executive workspace with geometric patterns and premium finishes",
      tags: ["Executive", "Geometric", "Premium"]
    },
    {
      id: 3,
      title: "Conference Room - Teamwork Innovation",
      category: "Office",
      image: "/lovable-uploads/bda3eff8-a3fe-4a0a-ba04-4139abe81acf.png",
      location: "Bangalore, Karnataka",
      year: "2024",
      description: "Creative conference space with motivational wall graphics and modern furniture",
      tags: ["Creative", "Motivational", "Modern"]
    },
    {
      id: 4,
      title: "Strategic Meeting Room - Success Vision",
      category: "Office",
      image: "/lovable-uploads/58bd93a5-282f-40b0-b43f-c1de39ce3a8d.png",
      location: "Gurgaon, Haryana",
      year: "2024",
      description: "Professional meeting space with inspirational messaging and contemporary design",
      tags: ["Strategic", "Inspirational", "Contemporary"]
    },
    {
      id: 5,
      title: "Modern Cafeteria - Social Hub",
      category: "Commercial",
      image: "/lovable-uploads/5b9a1bce-a0cc-431c-bd20-d7cb7eed9a8b.png",
      location: "Hyderabad, Telangana",
      year: "2024",
      description: "Vibrant cafeteria space with pendant lighting and comfortable seating areas",
      tags: ["Social", "Vibrant", "Comfortable"]
    },
    {
      id: 6,
      title: "Premium Dining Area - Corporate Cafeteria",
      category: "Commercial",
      image: "/lovable-uploads/cf696935-f2de-4400-80fd-6cb9d308d8a4.png",
      location: "Pune, Maharashtra",
      year: "2024",
      description: "Upscale dining environment with wooden accents and modern amenities",
      tags: ["Premium", "Dining", "Wooden Accents"]
    },
    {
      id: 7,
      title: "Director's Cabin - Executive Leadership",
      category: "Office",
      image: "/lovable-uploads/e6a98111-9f27-46e3-a696-1f8e61939165.png",
      location: "Chennai, Tamil Nadu",
      year: "2024",
      description: "Elegant director's office with panoramic views and sophisticated furnishing",
      tags: ["Executive", "Elegant", "Panoramic"]
    },
    {
      id: 8,
      title: "Modern Office Space - Contemporary Design",
      category: "Office",
      image: "/lovable-uploads/41102b7b-5060-4a71-a3c2-e16e3600d3a4.png",
      location: "Noida, Uttar Pradesh",
      year: "2024",
      description: "Open-plan office with geometric wall features and modern workstations",
      tags: ["Open-plan", "Geometric", "Workstations"]
    }
  ];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-gold">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Explore our portfolio of exceptional interior design projects across various sectors
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.name}
                  variant={activeCategory === category.name ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.name)}
                  className={`cursor-hover flex items-center space-x-2 px-6 py-3 transition-all duration-300 ease-in-out hover:scale-105 animate-scale-in ${
                    activeCategory === category.name 
                      ? "bg-primary text-primary-foreground shadow-luxury" 
                      : "hover:bg-muted"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id}
                className="cursor-hover group bg-gradient-card border-0 shadow-card hover:shadow-luxury transition-all duration-500 ease-in-out hover:scale-105 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="text-xs bg-muted hover:bg-accent transition-colors duration-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Valued Partners */}
      

      {/* Call to Action */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in text-gold">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-white/90 animate-slide-up">
            Let's create something extraordinary together
          </p>
          <Button 
            size="lg"
            variant="secondary"
            className="cursor-hover bg-gold text-gold-foreground hover:bg-gold/90 shadow-luxury hover:scale-105 transition-all duration-300 ease-in-out animate-scale-in"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Projects;