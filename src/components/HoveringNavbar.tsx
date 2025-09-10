import { motion, useAnimation } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { AnimatePresence, motion as m } from "framer-motion";
import { Menu, X } from "lucide-react";

const HoveringNavbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const controls = useAnimation();
  const [menuOpen, setMenuOpen] = useState(false);

  // lock/unlock scroll when menu toggles
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (menuOpen) {
      const prevHtml = html.style.overflow;
      const prevBody = body.style.overflow;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      // close on ESC
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
      window.addEventListener("keydown", onKey);
      return () => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [menuOpen]);

  // ✅ Force reset + animate on every route change
  useEffect(() => {
    controls.set({ y: -80, opacity: 0 }); // Reset first
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [location.pathname, controls]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={controls}
        className={`${
          isHome ? "fixed" : "sticky"
        } top-0 w-full z-50 relative overflow-hidden bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          {/* Logo & Branding */}
          <div className="flex items-center gap-4">
            <motion.img
              src="/logoo.png"
              alt="Logo"
              className="w-10 h-10"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="leading-tight"
            >
              <div className="text-lg font-bold text-primary">Hagerstone</div>
              <div className="text-sm text-muted-foreground">International Pvt. Ltd.</div>
            </motion.div>
          </div>

          {/* Right: Theme + Hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(v => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-menu"
            >
              {menuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>  
        </div>
      </motion.nav>

      {/* Fullscreen Overlay - Outside nav container */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="fs-menu"
            id="fullscreen-menu"
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button in top-right */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/60 z-10"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>

            {/* Main content container */}
            <div className="flex h-full w-full">
              {/* LEFT SIDE - Navigation Links */}
              <div className="flex-1 flex flex-col justify-center pl-12 md:pl-20">
                <div>
                  <h2 className="text-white/60 text-lg font-medium mb-8 tracking-widest">PAGES</h2>
                  <nav>
                    <ul className="space-y-6">
                      {[
                        { to: "/", label: "01 HOME" },
                        { to: "/about", label: "02 ABOUT" },
                        { to: "/projects", label: "03 PROJECTS" },
                        { to: "/services", label: "04 OUR SERVICES" },
                        { to: "/ideas", label: "05 IDEAS" },
                        { to: "/blog", label: "06 BLOG" },
                        { to: "/find-your-style", label: "07 FIND YOUR STYLE" },
                        { to: "/contact", label: "08 CONTACT" },
                      ].map(({ to, label }) => (
                        <li key={to}>
                          <Link
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className="block text-2xl md:text-4xl font-light text-white/80 hover:text-white transition-colors duration-300 tracking-wide"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>

              {/* RIGHT SIDE - Contact Info (Desktop Only) */}
              <div className="hidden lg:flex flex-1 flex-col justify-center pr-12 md:pr-20 text-right">
                <div>
                  <h2 className="text-white/60 text-lg font-medium mb-8 tracking-widest">FIND US HERE</h2>
                  <div className="space-y-4 text-white/80">
                    <div className="text-lg">Hagerstone International Pvt. Ltd.</div>
                    <div className="text-sm leading-relaxed">
                      No 21, 8th Cross Road, 24th Main Rd,<br />
                      2nd Phase, J. P. Nagar, Bengaluru,<br />
                      Karnataka 560078
                    </div>
                    <div className="mt-6 space-y-2">
                      <div>Email: global@hagerstone.com</div>
                      <div>Phone: +91-XXXXXXXXXX</div>
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                      <a 
                        href="https://www.linkedin.com/company/hagerstone" 
                        className="text-white/60 hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://instagram.com/" 
                        className="text-white/60 hover:text-white transition-colors"
                        aria-label="Instagram"
                      >
                        Instagram
                      </a>
                      <a 
                        href="https://x.com/" 
                        className="text-white/60 hover:text-white transition-colors"
                        aria-label="X"
                      >
                        X
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Contact Info - Bottom */}
            <div className="lg:hidden absolute bottom-8 left-6 right-6 text-center text-white/80">
              <div className="text-sm">
                Email: global@hagerstone.com • Phone: +91-XXXXXXXXXX
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HoveringNavbar;