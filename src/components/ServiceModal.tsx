import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, X, ArrowRight } from "lucide-react";

interface ServiceModalProps {
  service: {
    title: string;
    description: string;
    features: string[];
    image: string;
    icon: React.ComponentType<any>;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  const Icon = service.icon;

  const serviceDetails = {
    "Interior Designing": {
      overview: "Transform your space with our comprehensive interior design solutions that perfectly balance aesthetics, functionality, and your unique style preferences.",
      process: [
        "Initial consultation and space assessment",
        "Concept development and mood boards",
        "3D visualization and design presentation",
        "Material selection and sourcing",
        "Implementation and project management"
      ],
      examples: [
        "Modern office spaces with ergonomic design",
        "Luxury residential interiors with custom finishes",
        "Retail spaces optimized for customer experience",
        "Hospitality interiors with brand identity integration"
      ],
      faqs: [
        {
          question: "How long does the design process take?",
          answer: "Typically 2-4 weeks for design development, depending on project complexity and client feedback cycles."
        },
        {
          question: "Do you provide 3D visualizations?",
          answer: "Yes, we provide detailed 3D renderings to help you visualize the final design before implementation."
        },
        {
          question: "Can you work with existing furniture?",
          answer: "Absolutely! We can incorporate your existing pieces and recommend new items to complement them."
        }
      ]
    },
    "Construction": {
      overview: "End-to-end construction services with premium quality materials, expert craftsmanship, and adherence to international standards.",
      process: [
        "Site survey and structural assessment",
        "Detailed project planning and timeline",
        "Permit acquisition and regulatory compliance",
        "Quality-controlled construction execution",
        "Final inspection and handover"
      ],
      examples: [
        "Commercial office fit-outs and renovations",
        "Residential construction and remodeling",
        "Retail space construction with custom features",
        "Institutional projects with specialized requirements"
      ],
      faqs: [
        {
          question: "Do you handle all construction permits?",
          answer: "Yes, we manage all necessary permits and regulatory approvals as part of our comprehensive service."
        },
        {
          question: "What quality standards do you follow?",
          answer: "We adhere to international construction standards and conduct regular quality inspections throughout the project."
        },
        {
          question: "How do you ensure timeline adherence?",
          answer: "We use advanced project management tools and maintain buffer time for unexpected delays to ensure on-time delivery."
        }
      ]
    },
    "MEP Services": {
      overview: "Comprehensive Mechanical, Electrical, and Plumbing solutions designed for efficiency, sustainability, and seamless integration with your interior design.",
      process: [
        "Technical assessment and load calculations",
        "System design and engineering drawings",
        "Equipment selection and procurement",
        "Installation with safety protocols",
        "Testing, commissioning, and maintenance training"
      ],
      examples: [
        "Smart HVAC systems with energy efficiency",
        "Advanced electrical systems with automation",
        "Modern plumbing with water conservation features",
        "Integrated fire safety and security systems"
      ],
      faqs: [
        {
          question: "Do you provide energy-efficient solutions?",
          answer: "Yes, we specialize in sustainable MEP systems that reduce energy consumption and operational costs."
        },
        {
          question: "Can you integrate smart home technology?",
          answer: "Absolutely! We offer comprehensive smart home integration including lighting, climate, and security systems."
        },
        {
          question: "What maintenance support do you provide?",
          answer: "We offer comprehensive maintenance contracts and 24/7 emergency support for all installed systems."
        }
      ]
    },
    "Furniture": {
      overview: "Custom and curated furniture solutions that perfectly complement your interior design while meeting your functional requirements and aesthetic preferences.",
      process: [
        "Design consultation and space planning",
        "Custom furniture design and material selection",
        "Manufacturing with quality control",
        "Professional delivery and installation",
        "Post-installation service and support"
      ],
      examples: [
        "Executive office furniture with premium finishes",
        "Modular workstation systems for efficiency",
        "Custom reception desks with brand integration",
        "Ergonomic seating solutions for comfort"
      ],
      faqs: [
        {
          question: "Do you create fully custom furniture?",
          answer: "Yes, we design and manufacture completely custom furniture pieces tailored to your specific requirements."
        },
        {
          question: "What materials do you work with?",
          answer: "We work with premium materials including solid wood, metal, glass, and high-quality laminates and fabrics."
        },
        {
          question: "Do you provide furniture warranties?",
          answer: "Yes, all our furniture comes with comprehensive warranties covering manufacturing defects and structural integrity."
        }
      ]
    },
    "Sanitary Items": {
      overview: "Premium sanitary fixtures and fittings from leading brands, designed to enhance your bathroom spaces with modern functionality and aesthetic appeal.",
      process: [
        "Bathroom design and layout planning",
        "Product selection from premium brands",
        "Professional installation with waterproofing",
        "Quality testing and commissioning",
        "Maintenance guidance and support"
      ],
      examples: [
        "Luxury bathroom suites with premium fixtures",
        "Water-efficient solutions for sustainability",
        "Accessible bathroom designs for all users",
        "Commercial washroom solutions with durability"
      ],
      faqs: [
        {
          question: "Which brands do you work with?",
          answer: "We partner with leading brands like Kohler, TOTO, Grohe, and other premium manufacturers for quality assurance."
        },
        {
          question: "Do you provide water efficiency solutions?",
          answer: "Yes, we specialize in water-efficient fixtures that reduce consumption while maintaining performance."
        },
        {
          question: "What installation warranties do you offer?",
          answer: "We provide comprehensive installation warranties and ongoing support for all sanitary installations."
        }
      ]
    },
    "All Interiors Work": {
      overview: "Complete interior transformation services covering every aspect of your space, from structural modifications to finishing touches.",
      process: [
        "Comprehensive space assessment",
        "Integrated design and construction planning",
        "Coordinated execution across all trades",
        "Quality control and progress monitoring",
        "Final styling and client handover"
      ],
      examples: [
        "Complete office transformations with all amenities",
        "Residential renovations with modern upgrades",
        "Retail space complete fit-outs",
        "Hospitality interiors with full service integration"
      ],
      faqs: [
        {
          question: "Do you handle complete turnkey projects?",
          answer: "Yes, we provide complete turnkey solutions from initial design to final handover with all services included."
        },
        {
          question: "How do you coordinate multiple trades?",
          answer: "We use advanced project management systems to coordinate all trades and ensure seamless execution."
        },
        {
          question: "What is included in your complete service?",
          answer: "Our complete service includes design, construction, MEP, furniture, fixtures, and all finishing work."
        }
      ]
    }
  };

  const details = serviceDetails[service.title as keyof typeof serviceDetails];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute -top-2 -right-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
              <Icon className="h-6 w-6 text-gold-foreground" />
            </div>
            <DialogTitle className="text-3xl text-primary">{service.title}</DialogTitle>
          </div>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-64 object-cover rounded-xl"
          />
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Overview */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Overview</h3>
            <p className="text-foreground leading-relaxed">{details?.overview}</p>
          </div>

          {/* Process */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Process</h3>
            <div className="grid gap-4">
              {details?.process.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Project Examples</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {details?.examples.map((example, index) => (
                <Card key={index} className="bg-gradient-card border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{example}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {details?.faqs.map((faq, index) => (
                <Card key={index} className="bg-gradient-card border-0">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-primary mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-6 border-t border-border">
            <h3 className="text-xl font-bold text-primary mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">Contact our experts for a personalized consultation</p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;