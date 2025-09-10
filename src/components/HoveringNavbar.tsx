import { motion, useAnimation } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { isFreedomWeek } from "@/lib/independence";
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

  const showBadge = isFreedomWeek();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={controls}
      className={`${
        isHome ? "fixed" : "sticky"
      } top-0 w-full z-50 relative overflow-hidden bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-sm`}
    >
      {showBadge && <div aria-hidden className="flag-wave" />}
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
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="fs-menu"
            id="fullscreen-menu"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button duplicated inside overlay for UX */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>

            {/* Two-column layout like KlimArt: Links left, Contact/Social right */}
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
              {/* LEFT: Nav links */}
              <nav className="flex-1">
                <ul className="space-y-4">
                  {[
                    { to: "/", label: "01 Home" },
                    { to: "/about", label: "02 About" },
                    { to: "/projects", label: "03 Projects" },
                    { to: "/services", label: "04 Our Services" },
                    { to: "/ideas", label: "05 Ideas" },
                    { to: "/blog", label: "06 Blog" },
                    { to: "/find-your-style", label: "07 Find Your Style" },
                    { to: "/contact", label: "08 Contact Us" },
                  ].map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        onClick={() => setMenuOpen(false)}
                        className="block text-2xl md:text-4xl font-semibold text-white/90 hover:text-white transition"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

               {/* RIGHT: Contact / Social (placeholder—swap with your real info) */}
              <div className="hidden md:block flex-1 text-right text-white/85">
                <div className="space-y-3">
                  <p className="text-lg md:text-xl font-medium">Hagerstone International Pvt. Ltd.</p>
                  <p>global@hagerstone.com</p>
                  <p>+91-XXXXXXXXXX</p>
                  <div className="mt-4 inline-flex items-center gap-4">
                    {/* Replace with real links/icons as needed */}
                    <a href="https://www.linkedin.com/company/hagerstone" className="underline hover:no-underline">LinkedIn</a>
                    <a href="https://instagram.com/" className="underline hover:no-underline">Instagram</a>
                    <a href="https://x.com/" className="underline hover:no-underline">X</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile contact block (below links) */}
            <div className="md:hidden absolute bottom-6 left-6 right-6 text-white/85">
              <p className="font-medium">global@hagerstone.com • +91-XXXXXXXXXX</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>


    </motion.nav>
  );
};

export default HoveringNavbar;
