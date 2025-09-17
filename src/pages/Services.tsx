// src/pages/services.tsx

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceModal from "@/components/ServiceModal";

import {
  Palette,
  Building,
  Zap,
  Sofa,
  Droplets,
  Home,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const services = [
    {
      icon: Palette,
      title: "Interior Designing",
      description:
        "Transform your space with innovative design solutions that blend aesthetics with functionality.",
      features: [
        "3D Visualization & Rendering",
        "Space Planning & Layout",
        "Color Consultation",
        "Material Selection",
        "Lighting Design",
      ],
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    },
    {
      icon: Building,
      title: "Construction",
      description:
        "Complete construction services with premium quality materials and expert craftsmanship.",
      features: [
        "Turnkey Construction",
        "Project Management",
        "Quality Assurance",
        "Timeline Adherence",
        "Budget Optimization",
      ],
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
    },
    {
      icon: Zap,
      title: "MEP Services",
      description:
        "Mechanical, Electrical, and Plumbing solutions designed for efficiency and sustainability.",
      features: [
        "HVAC Systems",
        "Electrical Installation",
        "Plumbing Systems",
        "Fire Safety Systems",
        "Smart Home Integration",
      ],
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
    },
    {
      icon: Sofa,
      title: "Furniture",
      description:
        "Custom and curated furniture solutions that perfectly complement your interior design.",
      features: [
        "Custom Furniture Design",
        "Premium Material Selection",
        "Ergonomic Solutions",
        "Space-Optimized Designs",
        "Installation & Setup",
      ],
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    },
    {
      icon: Home,
      title: "All Interiors Work",
      description:
        "Comprehensive interior solutions covering every aspect of your space transformation.",
      features: [
        "False Ceiling & Partitions",
        "Flooring Solutions",
        "Wall Treatments",
        "Window Treatments",
        "Complete Fit-outs",
      ],
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "Understanding your vision, requirements, and budget",
    },
    {
      step: "02",
      title: "Design",
      description: "Creating detailed plans and 3D visualizations",
    },
    {
      step: "03",
      title: "Execution",
      description: "Professional implementation with quality control",
    },
    {
      step: "04",
      title: "Delivery",
      description: "Final handover with complete satisfaction",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-gold">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Comprehensive interior design and construction solutions for all your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group bg-gradient-card border-0 shadow-luxury hover:shadow-hover transition-all duration-500 hover:scale-105 animate-scale-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-hero/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-8">
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-6 w-6 text-gold-foreground" />
                          </div>
                          <CardTitle className="text-2xl text-primary">{service.title}</CardTitle>
                        </div>
                        <p className="text-muted-foreground dark:text-white/80">
                        {service.description}
                        </p>

                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="mt-6 group/btn"
                          variant="outline"
                          onClick={() => handleServiceClick(service)}
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process Section (Updated for Visibility) */}
      <section className="py-20 bg-[#1b1b1f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Our Process</h2>
            <p className="text-xl text-white/80 animate-slide-up">
              A streamlined approach to deliver exceptional results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card
                key={step.step}
                className="bg-[#25252b] border border-white/10 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 animate-scale-in text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gold text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in text-gold">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 text-white/90 animate-slide-up">
            Get in touch with our experts for a consultation
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-luxury hover:scale-105 transition-all duration-300 animate-scale-in"
          >
            Contact Us Today
          </Button>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Services;
