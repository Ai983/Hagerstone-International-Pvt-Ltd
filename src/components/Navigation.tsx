import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: "Home",
    href: "/"
  }, {
    name: "About",
    href: "/about"
  }, {
    name: "Projects",
    href: "/projects"
  }, {
    name: "Our Services",
    href: "/services"
  }, {
    name: "Ideas",
    href: "/ideas"
  }, {
    name: "Blog",
    href: "/blog"
  }, {
    name: "Contact Us",
    href: "/contact"
  }];
  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };
  return <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 p-2 shadow-card">
              <img src="/lovable-uploads/75d01d4a-a1d5-4392-9fc3-598db7a50279.png" alt="Hagerstone Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Hagerstone
            </h1>
              <p className="text-xs text-muted-foreground">International Pvt. Ltd.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`cursor-hover px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-muted hover:text-primary hover:scale-105 ${isActive(item.href) ? "bg-primary text-primary-foreground shadow-lg" : "text-foreground"}`}>
                {item.name}
              </Link>)}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative z-50">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-luxury animate-slide-up">
            <div className="px-4 py-6 space-y-3">
              {navigation.map(item => <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-muted hover:text-primary ${isActive(item.href) ? "bg-primary text-primary-foreground" : "text-foreground"}`}>
                  {item.name}
                </Link>)}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;