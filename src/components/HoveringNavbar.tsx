import { motion, useAnimation } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { AnimatePresence, motion as m } from "framer-motion";
import { Menu, X, Instagram, Linkedin, Twitter, FacebookIcon, Facebook } from "lucide-react";

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
          <div className="flex items-center gap-4 z-[120]">
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
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Logo - Fixed at top-left */}
            <div className="fixed top-4 left-4 z-[120] flex items-center gap-4">
              <motion.img
                src="/logoo.png"
                alt="Logo"
                className="w-10 h-10"
              />
              <motion.div className="leading-tight">
                <div className="text-lg font-bold text-white">Hagerstone</div>
                <div className="text-sm text-white/70">International Pvt. Ltd.</div>
              </motion.div>
            </div>

            {/* Close button - Fixed at top-right */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="fixed top-4 right-4 z-[120] inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Centered content container with margins */}
            <div className="flex h-full w-full items-center justify-center px-8 py-20">
              <div className="max-w-5xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                  {/* LEFT SIDE - Navigation Links */}
                  <div className="flex flex-col justify-start">
                    <div className="relative mb-12">
                      <h2 className="text-white text-3xl font-bold tracking-[0.2em] uppercase mb-3">
                        PAGES
                      </h2>
                      <div className="w-16 h-0.5 bg-white"></div>
                    </div>
                    <nav>
                      <ul className="space-y-6 pl-4">
                        {[
                          { to: "/", label: "HOME", number: "01" },
                          { to: "/about", label: "ABOUT", number: "02" },
                          { to: "/projects", label: "PROJECTS", number: "03" },
                          { to: "/services", label: "OUR SERVICES", number: "04" },
                          { to: "/ideas", label: "IDEAS", number: "05" },
                          { to: "/blog", label: "BLOG", number: "06" },
                          { to: "/find-your-style", label: "FIND YOUR STYLE", number: "07" },
                          { to: "/contact", label: "CONTACT", number: "08" },
                        ].map(({ to, label, number }) => (
                          <li key={to} className="relative group">
                            <Link
                              to={to}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center py-3 text-xl font-medium tracking-wide text-white hover:text-white transition-colors duration-300"
                            >
                              <span className="w-8 text-sm font-normal text-white/50 tracking-wide mr-6">{number}</span>
                              <span className="relative">
                                {label}
                                {/* Static underline */}
                                <div className="absolute bottom-[-6px] left-0 right-0 h-px bg-white/20"></div>
                                {/* Animated underline on hover */}
                                <div className="absolute bottom-[-6px] left-0 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out w-full"></div>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* RIGHT SIDE - Contact Info */}
                  <div className="flex flex-col justify-start">
                    <div className="relative mb-12">
                      <h2 className="text-white text-3xl font-bold tracking-[0.2em] uppercase mb-3">
                        FIND US HERE
                      </h2>
                      <div className="w-20 h-0.5 bg-white"></div>
                    </div>
                    <div className="space-y-8 text-white">
                      <div className="text-xl font-semibold">Hagerstone International Pvt. Ltd.</div>
                      <div className="text-base leading-relaxed text-white/80">
                        No 21, 8th Cross Road, 24th Main Rd,<br />
                        2nd Phase, J. P. Nagar, Bengaluru,<br />
                        Karnataka 560078
                      </div>
                      <div className="space-y-2 text-white/90">
                        <div className="text-base">Email: global@hagerstone.com</div>
                        <div className="text-base">Phone: +91-XXXXXXXXXX</div>
                      </div>
                      <div className="flex gap-6 mt-8">
                        <a 
                          href="https://www.linkedin.com/company/hagerstone/posts/?feedView=all" 
                          className="text-white/70 hover:text-white transition-colors duration-300"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={24} />
                        </a>
                        <a 
                          href="http://instagram.com/hagerstone_international/" 
                          className="text-white/70 hover:text-white transition-colors duration-300"
                          aria-label="Instagram"
                        >
                          <Instagram size={24} />
                        </a>
                        <a 
                          href="https://www.facebook.com/HagerstoneInternational" 
                          className="text-white/70 hover:text-white transition-colors duration-300"
                          aria-label="Facebook"
                        >
                          <Facebook size={24} />
                        </a>
                      </div>
                      <button className="mt-8 px-8 py-3 border border-white text-white uppercase tracking-[0.15em] text-sm font-medium hover:bg-white hover:text-black transition-all duration-300">
                        GET IN TOUCH →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HoveringNavbar;