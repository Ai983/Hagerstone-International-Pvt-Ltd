import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Ideas", href: "/ideas" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/hagerstone_international/",
    },
    {
      icon: Facebook,
      name: "Facebook", 
      href: "https://www.facebook.com/HagerstoneInternational",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/14708271/admin/page-posts/published/",
    }
  ];

  return (
    <footer className="bg-gradient-hero text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 shadow-card">
                <img 
                  src="/logoo.png" 
                  alt="Hagerstone Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
            <h2 className="text-2xl font-bold text-gold">Hagerstone</h2>
            <p className="text-xs text-white/90">International Pvt. Ltd.</p>
              </div>
            </div>
            <p className="text-white/90 mb-6 max-w-md">
              Creating exceptional interior spaces that blend luxury with functionality. 
              Your vision, our expertise.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <a 
                href="https://www.google.com/maps/place/Hagerstone+International+-+Best+Interior+Design+%26+Build+Company/@28.6931743,77.1518589,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce36350678413:0xe0a4252396dc1099!8m2!3d28.6931743!4d77.1518589!16s%2Fg%2F11j595gxhr!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-gold transition-colors duration-300 group"
              >
                <MapPin className="h-5 w-5 text-gold mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="font-medium text-white">Visit Our Studio</p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    7th Floor, Max Hospital Building,<br />
                    H.B Twin Tower, New Delhi,<br />
                    Delhi 110034, India
                  </p>
                </div>
              </a>
              
              <a 
                href="tel:+918882979328"
                className="flex items-center space-x-3 hover:text-gold transition-colors duration-300 group"
              >
                <Phone className="h-5 w-5 text-gold group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p className="text-sm text-white/80">+91 88829 79328</p>
                </div>
              </a>
              
              <a 
                href="mailto:ea@hagerstone.com"
                className="flex items-center space-x-3 hover:text-gold transition-colors duration-300 group"
              >
                <Mail className="h-5 w-5 text-gold group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="text-sm text-white/80">ea@hagerstone.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-white/90 hover:text-gold transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-gold hover:text-gold-foreground transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                  );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Hagerstone International Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;