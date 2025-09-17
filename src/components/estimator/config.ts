// Centralized configuration for the Office Cost Estimator
export type FeatureId =
  | "meeting_rooms"
  | "workstations"
  | "cafeteria"
  | "cabins"
  | "reception"
  | "lounge"
  | "pantry";

export type PackageId = "basic" | "mid" | "luxury";

export const FEATURES: { id: FeatureId; label: string }[] = [
  { id: "meeting_rooms", label: "Meeting Rooms" },
  { id: "workstations", label: "Workstations" },
  { id: "cafeteria", label: "Cafeteria" },
  { id: "cabins", label: "Cabins" },
  { id: "reception", label: "Reception" },
  { id: "lounge", label: "Lounge Areas" },
  { id: "pantry", label: "Pantry" },
];

export const PACKAGES: Record<PackageId, {
  id: PackageId;
  title: string;
  description: string;
  ratePerSqft: number | [number, number];
  image: string;
  bullets: string[];
}> = {
  basic: {
    id: "basic",
    title: "Basic",
    description: "Functional finishes and value engineering for fast deployments.",
    ratePerSqft: 2500,
    image: "/hero-images/office.avif",
    bullets: [
      "Affordable pricing",
      "Convenient designs",
      "Basic accessories"
    ]
  },
  mid: {
    id: "mid",
    title: "Mid-level",
    description: "Balanced quality and aesthetics tailored to most offices.",
    ratePerSqft: [3000, 3500],
    image: "/hero-images/interior.avif",
    bullets: [
      "Mid-range pricing",
      "Premium designs",
      "Wide range of accessories"
    ]
  },
  luxury: {
    id: "luxury",
    title: "Luxury",
    description: "Premium materials, custom furniture and signature spaces.",
    ratePerSqft: 4500,
    image: "/hero-images/officeinterior.webp",
    bullets: [
      "Elite pricing",
      "Lavish designs",
      "Extensive range of accessories"
    ]
  },
};

export function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}


