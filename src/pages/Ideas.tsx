import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Heart, Share2, X, ArrowRight, ChevronDown } from "lucide-react";

const Ideas = () => {
  const [selectedRoom, setSelectedRoom] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const roomTypes = [
    "All", "Meeting Rooms", "Conference Rooms", "Quiet Rooms", 
    "Green Rooms", "Cabins", "Reception", "Workstations"
  ];

  const interiorStyles = [
    "All", "Minimalistic", "Industrial", "Scandinavian", 
    "Japandi", "Modern", "Luxury", "Classic"
  ];

  const ideas = [
    {
      id: 1,
      title: "Modern Executive Cabin",
      room: "Cabins",
      style: "Modern",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      description: "Sleek executive workspace with clean lines and premium finishes",
      features: ["Ergonomic furniture", "Smart lighting", "Premium materials", "Minimal clutter"],
      colorPalette: ["#2C3E50", "#FFFFFF", "#BDC3C7", "#34495E"],
      inspiration: "This modern executive cabin embraces minimalist design principles while ensuring maximum functionality. The space features premium materials including engineered wood, glass partitions, and contemporary lighting solutions."
    },
    {
      id: 2,
      title: "Minimalist Meeting Room",
      room: "Meeting Rooms",
      style: "Minimalistic",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      description: "Clean, distraction-free environment for focused discussions",
      features: ["Clean lines", "Neutral colors", "Functional furniture", "Natural light"],
      colorPalette: ["#FFFFFF", "#F8F9FA", "#6C757D", "#495057"],
      inspiration: "Designed to eliminate distractions and promote focus, this minimalist meeting room uses a monochromatic color scheme and carefully selected furniture to create a calm, professional atmosphere."
    },
    {
      id: 3,
      title: "Industrial Conference Space",
      room: "Conference Rooms",
      style: "Industrial",
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=600&fit=crop",
      description: "Raw materials and exposed elements for creative brainstorming",
      features: ["Exposed brick", "Metal fixtures", "Concrete elements", "Edison bulbs"],
      colorPalette: ["#5D4E37", "#8B4513", "#CD853F", "#2F4F4F"],
      inspiration: "This industrial conference space celebrates raw materials and urban aesthetics. Exposed brick walls, metal fixtures, and concrete elements create an environment that stimulates creativity and innovation."
    },
    {
      id: 4,
      title: "Scandinavian Workstation",
      room: "Workstations",
      style: "Scandinavian",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      description: "Light wood and neutral tones for productive work environment",
      features: ["Light wood", "Natural textures", "Cozy elements", "Functional design"],
      colorPalette: ["#F5F5DC", "#DDBEA9", "#A0522D", "#FFFFFF"],
      inspiration: "Inspired by Nordic design philosophy, this workstation combines functionality with hygge. Light wood tones, natural textures, and carefully curated accessories create a warm, productive workspace."
    },
    {
      id: 5,
      title: "Luxury Reception Area",
      room: "Reception",
      style: "Luxury",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      description: "Impressive entrance with premium materials and elegant design",
      features: ["Premium finishes", "Statement lighting", "Marble accents", "Rich textures"],
      colorPalette: ["#D4AF37", "#8B0000", "#2F4F4F", "#FFFFFF"],
      inspiration: "This luxury reception area makes a powerful first impression with its sophisticated use of premium materials, dramatic lighting, and carefully orchestrated color palette that speaks to quality and excellence."
    },
    {
      id: 6,
      title: "Japandi Quiet Room",
      room: "Quiet Rooms",
      style: "Japandi",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      description: "Zen-inspired space combining Japanese and Scandinavian aesthetics",
      features: ["Natural materials", "Zen aesthetics", "Minimal furniture", "Peaceful atmosphere"],
      colorPalette: ["#F5F5F5", "#8FBC8F", "#2F4F4F", "#DEB887"],
      inspiration: "Merging Japanese minimalism with Scandinavian coziness, this quiet room creates a tranquil retreat. Natural materials, clean lines, and a restrained color palette promote mindfulness and concentration."
    },
    {
      id: 7,
      title: "Classic Conference Room",
      room: "Conference Rooms",
      style: "Classic",
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=600&fit=crop",
      description: "Timeless elegance with traditional wood and leather accents",
      features: ["Rich wood", "Leather furniture", "Traditional details", "Formal atmosphere"],
      colorPalette: ["#8B4513", "#2F4F4F", "#DAA520", "#FFFFFF"],
      inspiration: "This classic conference room embodies timeless sophistication. Rich wood paneling, leather upholstery, and traditional architectural details create an environment of gravitas and professionalism."
    },
    {
      id: 8,
      title: "Green Meeting Space",
      room: "Green Rooms",
      style: "Modern",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      description: "Biophilic design with natural elements and living walls",
      features: ["Living walls", "Natural light", "Sustainable materials", "Air purification"],
      colorPalette: ["#228B22", "#90EE90", "#8FBC8F", "#FFFFFF"],
      inspiration: "This green meeting space integrates biophilic design principles to create a connection with nature. Living walls, sustainable materials, and abundant natural light contribute to improved air quality and well-being."
    },
    {
      id: 9,
      title: "Industrial Workstation",
      room: "Workstations",
      style: "Industrial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      description: "Urban-inspired workspace with raw materials",
      features: ["Exposed pipes", "Metal desks", "Concrete floors", "Track lighting"],
      colorPalette: ["#696969", "#A9A9A9", "#2F4F4F", "#D3D3D3"],
      inspiration: "Drawing inspiration from converted warehouses and urban lofts, this industrial workstation celebrates raw materials and utilitarian aesthetics while maintaining functionality."
    },
    {
      id: 10,
      title: "Luxury Executive Cabin",
      room: "Cabins",
      style: "Luxury",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      description: "Opulent executive space with premium finishes",
      features: ["Premium leather", "Marble surfaces", "Gold accents", "Artisan craftsmanship"],
      colorPalette: ["#DAA520", "#8B0000", "#2F4F4F", "#FFFFFF"],
      inspiration: "This luxury executive cabin represents the pinnacle of sophistication, featuring hand-selected materials, custom millwork, and artisan finishes that reflect status and success."
    }
  ];

  const filteredIdeas = ideas.filter(idea => {
    const roomMatch = selectedRoom === "All" || idea.room === selectedRoom;
    const styleMatch = selectedStyle === "All" || idea.style === selectedStyle;
    return roomMatch && styleMatch;
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleIdeaClick = (idea: any) => {
    setSelectedIdea(idea);
    setIsDetailModalOpen(true);
  };

  // Get available styles for selected room
  const getAvailableStyles = () => {
    if (selectedRoom === "All") return interiorStyles;
    const roomIdeas = ideas.filter(idea => idea.room === selectedRoom);
    const roomStyles = ["All", ...new Set(roomIdeas.map(idea => idea.style))];
    return roomStyles;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-gold">
            Design Ideas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Discover inspiring interior design concepts for your next project
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-muted/30 sticky top-20 z-30 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Room Type Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Room Type</h3>
            <div className="flex flex-wrap gap-2">
              {roomTypes.map((room) => (
                <Button
                  key={room}
                  variant={selectedRoom === room ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRoom(room)}
                  className={`transition-all duration-300 hover:scale-105 ${
                    selectedRoom === room 
                      ? "bg-primary text-primary-foreground shadow-luxury" 
                      : "hover:bg-muted"
                  }`}
                >
                  {room}
                </Button>
              ))}
            </div>
          </div>

          {/* Style Filter */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Interior Style
              {selectedRoom !== "All" && (
                <span className="text-sm text-muted-foreground ml-2">
                  (for {selectedRoom})
                </span>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              {getAvailableStyles().map((style) => (
                <Button
                  key={style}
                  variant={selectedStyle === style ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStyle(style)}
                  className={`transition-all duration-300 hover:scale-105 ${
                    selectedStyle === style 
                      ? "bg-accent text-accent-foreground shadow-luxury" 
                      : "hover:bg-muted"
                  }`}
                >
                  {style}
                  {selectedRoom !== "All" && style !== "All" && (
                    <ChevronDown className="ml-1 h-3 w-3" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ideas Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredIdeas.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredIdeas.map((idea, index) => (
                <Card 
                  key={idea.id}
                  className="group bg-gradient-card border-0 shadow-card hover:shadow-luxury transition-all duration-500 hover:scale-105 animate-scale-in overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleIdeaClick(idea)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={idea.image}
                      alt={idea.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                        onClick={() => toggleFavorite(idea.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favorites.has(idea.id) 
                              ? "fill-red-500 text-red-500" 
                              : "text-muted-foreground"
                          }`} 
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                      >
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>

                    {/* Style Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground">
                        {idea.style}
                      </Badge>
                    </div>

                    {/* Room Type Badge */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        {idea.room}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {idea.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {idea.colorPalette?.slice(0, 3).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <Button size="sm" variant="ghost" className="text-xs">
                        View Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-primary mb-4">No Ideas Found</h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your filters to see more design ideas
              </p>
              <Button 
                onClick={() => {
                  setSelectedRoom("All");
                  setSelectedStyle("All");
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Valued Partners */}
      

      {/* Inspiration Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in text-gold">
            Inspired by What You See?
          </h2>
          <p className="text-xl mb-8 text-white/90 animate-slide-up">
            Let our expert designers bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-luxury hover:scale-105 transition-all duration-300 animate-scale-in"
            >
              Schedule Consultation
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-luxury hover:scale-105 transition-all duration-300 animate-scale-in"
            >
              View Our Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Idea Detail Modal */}
      {selectedIdea && (
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDetailModalOpen(false)}
                className="absolute -top-2 -right-2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-3xl text-primary mb-4">{selectedIdea.title}</DialogTitle>
              <div className="flex space-x-2 mb-4">
                <Badge className="bg-primary text-primary-foreground">{selectedIdea.room}</Badge>
                <Badge variant="secondary">{selectedIdea.style}</Badge>
              </div>
              <img
                src={selectedIdea.image}
                alt={selectedIdea.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Design Concept</h3>
                <p className="text-foreground leading-relaxed">{selectedIdea.inspiration}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedIdea.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Color Palette</h3>
                <div className="flex space-x-4">
                  {selectedIdea.colorPalette?.map((color: string, index: number) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div
                        className="w-16 h-16 rounded-lg border border-border shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-muted-foreground font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-6 border-t border-border">
                <h3 className="text-xl font-bold text-primary mb-4">Love This Design?</h3>
                <p className="text-muted-foreground mb-6">Our designers can create a similar space tailored to your needs</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Ideas;