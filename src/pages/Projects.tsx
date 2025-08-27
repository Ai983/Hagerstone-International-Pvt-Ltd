import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Building, Home, Hotel, Factory, Store, MapPin, Calendar } from "lucide-react";

// Premium easing functions
const YODEZEEN_EASING = [0.22, 1, 0.36, 1] as const;
const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: i * 0.06,
      ease: YODEZEEN_EASING,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      delay: Math.floor(i / 4) * 0.08 + (i % 4) * 0.06,
      ease: YODEZEEN_EASING,
    },
  }),
};

const ctaVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: YODEZEEN_EASING,
    },
  },
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], ["0%", "8%"]);
  
  const ctaInView = useInView(ctaRef, { amount: 0.4, once: true });

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

  // Handle sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && filterRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        const scrollTop = window.scrollY;
        setIsFilterSticky(scrollTop > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      if (e.key === 'Escape') {
        setLightboxImage(null);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, lightboxIndex]);

  const navigateLightbox = (direction: number) => {
    const newIndex = lightboxIndex + direction;
    if (newIndex >= 0 && newIndex < filteredProjects.length) {
      setLightboxIndex(newIndex);
      setLightboxImage(filteredProjects[newIndex].image);
    }
  };

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg overflow-hidden">
      <div className="h-64 bg-muted/80"></div>
      <div className="p-6 space-y-3">
        <div className="h-6 bg-muted/60 rounded w-3/4"></div>
        <div className="h-4 bg-muted/40 rounded w-full"></div>
        <div className="h-4 bg-muted/40 rounded w-2/3"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted/30 rounded w-16"></div>
          <div className="h-6 bg-muted/30 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        className="relative bg-gradient-hero text-primary-foreground py-32 overflow-hidden"
        style={{ y: heroParallax }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="mb-4"
          >
            <span className="text-gold text-lg font-medium tracking-wide uppercase">
              Portfolio Excellence
            </span>
          </motion.div>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="text-6xl md:text-7xl font-bold mb-8 text-white leading-tight"
          >
            Our Projects
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our collection of transformative interior design projects across India
          </motion.p>
        </div>
      </motion.section>

      {/* Sticky Category Filter */}
      <section
        ref={filterRef}
        className={`py-6 bg-background/95 backdrop-blur-sm transition-all duration-200 ${
          isFilterSticky ? 'sticky top-0 z-40 shadow-hover' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;
              
              return (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <Button
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setActiveCategory(category.name)}
                    className={`relative flex items-center space-x-2 px-6 py-3 transition-all duration-180 ease-yodezeen hover:shadow-hover focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-luxury" 
                        : "hover:bg-muted/80"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{category.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-primary rounded-md -z-10"
                        transition={{ duration: 0.2, ease: YODEZEEN_EASING }}
                      />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.18, ease: EASE_OUT_QUART }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(project.image, index)}
                >
                  <Card className="overflow-hidden bg-card border-0 shadow-card hover:shadow-luxury transition-all duration-220 ease-yodezeen">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        loading="lazy"
                      />
                      
                      {/* Overlay that appears on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                      />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                          {project.category}
                        </Badge>
                      </div>
                      
                      {/* Hover content */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: YODEZEEN_EASING }}
                        className="absolute bottom-4 left-4 right-4 text-white"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-150">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className="text-xs bg-muted/60 hover:bg-accent/20 transition-colors duration-150"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-muted/40">
                            +{project.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-muted-foreground">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: YODEZEEN_EASING }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setLightboxImage(null)}
          >
            <div className="flex items-center justify-center h-full p-4">
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.18, ease: YODEZEEN_EASING }}
                className="relative max-w-5xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxImage}
                  alt="Project detail"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-luxury"
                />
                
                {/* Close button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0"
                  onClick={() => setLightboxImage(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
                
                {/* Navigation */}
                {lightboxIndex > 0 && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0"
                    onClick={() => navigateLightbox(-1)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                
                {lightboxIndex < filteredProjects.length - 1 && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0"
                    onClick={() => navigateLightbox(1)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}
                
                {/* Project info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">
                    {filteredProjects[lightboxIndex]?.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {filteredProjects[lightboxIndex]?.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section ref={ctaRef} className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={ctaVariants}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold text-gold">
              Ready to Create Something Extraordinary?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Let's collaborate to transform your space into a masterpiece that reflects your vision
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            >
              <Button 
                size="lg"
                variant="secondary"
                className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-luxury px-8 py-4 text-lg font-semibold transition-all duration-150 focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-primary"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Start Your Project
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;