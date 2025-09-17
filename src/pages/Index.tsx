import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/HeroSlider";

import CountUp from "react-countup";
import { motion } from "framer-motion";

import { useInView } from "react-intersection-observer";
import {
  Building2,
  Users,
  Award,
  Star,
  ArrowRight,
  Palette,
  Building,
  Zap,
  CheckCircle,
  Briefcase,
  Ruler,
  Projector,
  Globe
} from "lucide-react";

const Index = () => {

  const services = [
    {
      icon: Palette,
      title: "Interior Designing",
      description: "Transform spaces with innovative design solutions"
    },
    {
      icon: Building,
      title: "Construction",
      description: "Complete construction with premium quality"
    },
    {
      icon: Zap,
      title: "MEP Services",
      description: "Mechanical, Electrical & Plumbing expertise"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Tech Solutions Ltd.",
      content: "Hagerstone transformed our office space beautifully. The attention to detail and professionalism exceeded our expectations.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      company: "Fashion Retail Chain",
      content: "Outstanding work on our showroom design. The team understood our vision and delivered exactly what we wanted.",
      rating: 5
    },
    {
    name: "Ananya Desai",
    company: "Realty Corp",
    content: "Reliable and creative. The entire process from design to execution was seamless.",
    rating: 5
    },
    {
    name: "Karan Bansal",
    company: "RetailNest",
    content: "Very collaborative and punctual. We loved the experience.",
    rating: 5
    },
    {
    name: "Vikram Mehta",
    company: "InfraBuild India",
    content: "Professional team and premium execution. We highly recommend Hagerstone.",
    rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Unified Navbar */}
      
        




      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-muted/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              <span className="text-blue-600 dark:text-yellow-400">Making an Impact:</span> The Numbers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[ 
              { icon: Briefcase, value: 11, suffix: "+ YEARS", label: "Experience of In Industry" },
              { icon: Ruler, value: 7, suffix: " MILLION+ SQFT", label: "Designed & Delivered" },
              { icon: Projector, value: 250, suffix: "+ PROJECTS", label: "Combined Projects Delivery By Our Leadership Team" },
              { icon: Users, value: 350, suffix: "+ MANPOWER", label: "Expert & general workforce across India" },
              { icon: Building2, value: 15, suffix: "+ CITIES", label: "Across the India" },
              { icon: Globe, value: 7, suffix: "+ COUNTRIES", label: "For Global Clients" },
            ].map(({ icon: Icon, value, suffix, label }, index) => {
              const { ref, inView } = useInView({ triggerOnce: true });
              return (
                <div
                  key={index}
                  ref={ref}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-center transition hover:shadow-xl transform hover:-translate-y-1 duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="h-10 w-10 text-primary dark:text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {inView && <CountUp start={0} end={value} duration={2} suffix={` ${suffix}`} />}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Valued Clients */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl mb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Valued Clients</h2>
            <p className="text-lg text-foreground/80">Trusted by industry leaders worldwide</p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex animate-[slide_20s_linear_infinite] space-x-8 items-center">
              {[
                { name: "Monin", logo: "/clients-logo/Monin.jpeg" },
                { name: "APL Logistics", logo: "/clients-logo/Apl.jpeg" },
                { name: "Singapore Airlines", logo: "/clients-logo/SingaporeAirlines.jpeg" },
                { name: "AECOM", logo: "/clients-logo/AECOM.png" },
                { name: "TAJ", logo: "/clients-logo/Taj.jpeg" },
                { name: "UltraTech Cement", logo: "/clients-logo/Ultratech.jpeg" },
                { name: "Air India", logo: "/clients-logo/airindia.jpeg" },
                { name: "Lufthansa", logo: "/clients-logo/lufthansa.jpeg" },
                // Duplicate for continuous scroll
                { name: "Monin", logo: "/clients-logo/Monin.jpeg" },
                { name: "APL Logistics", logo: "/clients-logo/Apl.jpeg" },
                { name: "Singapore Airlines", logo: "/clients-logo/SingaporeAirlines.jpeg" },
                { name: "AECOM", logo: "/clients-logo/AECOM.png" },
                { name: "TAJ", logo: "/clients-logo/Taj.jpeg" },
                { name: "UltraTech Cement", logo: "/clients-logo/Ultratech.jpeg" },
                { name: "Air India", logo: "/clients-logo/airindia.jpeg" },
                { name: "Lufthansa", logo: "/clients-logo/lufthansa.jpeg" }
              ].map((client, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-48 h-24 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-primary/20 flex items-center justify-center hover:scale-105 p-4"
                >
                  <img 
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      {/* Services Preview */}
         <section className="py-20 px-6 md:px-16 text-center bg-background">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Expertise
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-primary max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Comprehensive solutions for all your interior design needs
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to="src/pages/Services.tsx">
            <motion.div
              key={index}
              className="bg-muted rounded-lg p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <service.icon className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-primary mb-4">{service.description}</p>
            </motion.div>
            </Link>
          ))}
        </div>
      </section>
  

      {/* Featured Projects */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4 animate-fade-in">Featured Projects</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Showcase of our exceptional design work
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Corporate Office",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
                category: "Office"
              },
              {
                title: "Luxury Residential Villa",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
                category: "Residential"
              },
              {
                title: "Boutique Hotel Design",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
                category: "Hospitality"
              }
            ].map((project, index) => (
              <Card 
                key={project.title}
                className="group bg-gradient-card border-0 shadow-card hover:shadow-luxury transition-all duration-500 hover:scale-105 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm bg-accent px-2 py-1 rounded">{project.category}</span>
                    <h3 className="text-lg font-bold mt-2">{project.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="hover:bg-muted hover:scale-105 transition-all duration-300"
            >
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4 animate-fade-in">Client Testimonials</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              What our clients say about working with us
            </p>
          </div>

          <div className="relative w-full overflow-hidden">
            <motion.div
            className="flex gap-8 w-max"
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card
                key={`${testimonial.name}-${index}`}
                className="min-w-[300px] max-w-[350px] bg-gradient-card border-0 shadow-luxury"
                >
                  <CardContent className="p-6">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                        ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic text-base">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <h4 className="font-bold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
       </section>


      {/* Why Choose Us */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Why Choose Hagerstone?</h2>
            <p className="text-xl text-white/90 animate-slide-up">
            Excellence in every project, innovation in every design
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "11+ Years of Excellence",
              "500+ Satisfied Clients",
              "Fortune 500 Experience",
              "Turnkey Solutions"
            ].map((benefit, index) => (
            <div
            key={benefit}
            className="text-center animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CheckCircle className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{benefit}</h3>
            </div>
          ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gold mb-6 animate-fade-in">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary mb-8 animate-slide-up">
            Let's create something extraordinary together
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-gradient-accent text-gold-foreground hover:scale-105 transition-all duration-300 shadow-luxury animate-scale-in"
          >
            <Link to="/contact">Start Your Project Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

