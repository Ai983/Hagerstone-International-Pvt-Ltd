import { useState } from "react";
import { isFreedomWeek } from "@/lib/independence";

const STORAGE_KEY = "freedomBannerDismissed-2025";

const FreedomBanner = () => {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  if (!isFreedomWeek() || dismissed) return null;

  const onClose = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  return (
    <div className="sticky top-0 z-[60] w-full">
      <div className="mx-auto max-w-7xl px-3 pt-2">
        <div className="relative overflow-hidden rounded-md border border-border backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
          {/* Tri-color gradient layer with controlled opacity - doesn't affect text */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-90"
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--saffron)) 0%, #ffffff 50%, hsl(var(--india-green)) 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between gap-3 px-3 py-2 text-sm text-foreground">
            <p className="m-0 leading-snug">
              India will celebrate its 79th Independence Day on August 15, 2025. 🇮🇳 Jai Hind!
            </p>
            <button
              type="button"
              aria-label="Close Independence Day banner"
              onClick={onClose}
              className="inline-flex h-6 w-6 items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span aria-hidden>✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreedomBanner;
