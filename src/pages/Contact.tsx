import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin,
  MapPin,
  Clock,
  Send
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 88829 79328",
      href: "tel:+918882979328",
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email",
      value: "ea@hagerstone.com",
      href: "mailto:ea@hagerstone.com",
      description: "Send us your queries anytime"
    },
    {
      icon: MapPin,
      title: "Office Address",
      value: "7th Floor, Max Hospital Building, H.B Twin Tower, New Delhi, Delhi 110034, India",
      href: "https://www.google.com/maps/place/Hagerstone+International+-+Best+Interior+Design+%26+Build+Company/@28.6931743,77.1518589,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce36350678413:0xe0a4252396dc1099!8m2!3d28.6931743!4d77.1518589!16s%2Fg%2F11j595gxhr!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D",
      description: "Visit our design studio"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Sat: 9AM - 6PM",
      href: "#",
      description: "We're here to help"
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/hagerstone_international/",
      color: "hover:text-pink-500"
    },
    {
      icon: Facebook,
      name: "Facebook", 
      href: "https://www.facebook.com/HagerstoneInternational",
      color: "hover:text-blue-600"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/14708271/admin/page-posts/published/",
      color: "hover:text-blue-700"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-gold">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Let's discuss your next interior design project
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card 
                  key={info.title}
                  className="group bg-gradient-card border-0 shadow-card hover:shadow-luxury transition-all duration-500 hover:scale-105 animate-scale-in text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-gold-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{info.title}</h3>
                    <a
                      href={info.href}
                      className="text-lg font-medium text-accent hover:text-gold transition-colors duration-300 block mb-2"
                    >
                      {info.value}
                    </a>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gradient-card border-0 shadow-luxury animate-fade-in">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Project inquiry"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1 min-h-32"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-medium shadow-luxury hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Social */}
            <div className="space-y-8 animate-slide-up">
              {/* Map Placeholder */}
              <Card className="bg-gradient-card border-0 shadow-luxury">
                <CardContent className="p-0">
                   <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                     <div className="text-center">
                       <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                       <p className="text-muted-foreground">Interactive map coming soon</p>
                       <a 
                         href="https://www.google.com/maps/place/Hagerstone+International+-+Best+Interior+Design+%26+Build+Company/@28.6931743,77.1518589,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce36350678413:0xe0a4252396dc1099!8m2!3d28.6931743!4d77.1518589!16s%2Fg%2F11j595gxhr!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-sm text-primary hover:text-accent transition-colors duration-300 mt-1 block"
                       >
                         7th Floor, Max Hospital Building, H.B Twin Tower, New Delhi, Delhi 110034, India
                       </a>
                     </div>
                   </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-gradient-card border-0 shadow-luxury">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Follow Us</CardTitle>
                  <p className="text-muted-foreground">
                    Stay connected for the latest updates and inspiration
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary transition-all duration-300 hover:scale-110 ${social.color}`}
                        >
                          <Icon className="h-6 w-6" />
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="bg-gradient-hero text-primary-foreground border-0 shadow-luxury">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
                  <p className="mb-6 text-primary-foreground/90">
                    Call us directly for urgent project discussions
                  </p>
                  <Button 
                    asChild
                    variant="secondary"
                    size="lg"
                    className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-luxury hover:scale-105 transition-all duration-300"
                  >
                    <a href="tel:+918882979328">
                      <Phone className="h-5 w-5 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Valued Partners */}
      
    </div>
  );
};

export default Contact;