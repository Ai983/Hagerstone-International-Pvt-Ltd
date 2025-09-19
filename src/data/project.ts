export type ProjectSection = {
  name: string;
  description?: string;
  images?: string[];
  video?: string;
};

export type ProjectData = {
  id: string;             
  title: string;
  client: string;
  year?: string;
  location?: string;
  sector?: string;
  hero: string;           
  heroVideo?: string;      // NEW: optional hero video
  floors?: { name: string; layout: string }[];
  sections: ProjectSection[];
};

export const projects: ProjectData[] = [
  {
    id: "theon",
    title: "Theon Life Sciences",
    client: "Hagerstone International Pvt. Ltd.",
    year: "2025",
    location: "Baddi, Himachal Pradesh",
    sector: "Pharmaceutical Office",
    hero: "/projects/theon/RECEPTION-REVISED/hero.jpeg",
    heroVideo: "/projects/theon/WALKTHROUGH.mp4", // NEW
    sections: [
      {
        name: "Reception & Lounge",
        description: "A welcoming double-height reception with modern lounge seating.",
        images: ["/projects/theon/RECEPTION-REVISED/hero.jpeg", "/projects/theon/RECEPTION-REVISED/lounge.jpeg", "/projects/theon/RECEPTION-REVISED/ground.jpeg"],
        video: "/projects/theon/WALKTHROUGH.mp4"
      },
      {
        name: "Boardroom",
        description: "Premium boardroom with AV integration.",
        images: ["/projects/theon/CONFERENCEROOM/7.jpeg", "/projects/theon/CONFERENCEROOM/2.jpeg", "/projects/theon/CONFERENCEROOM/6.jpeg"]
      },
      {
        name: "Meeting Room",
        description: "An easy and focusing area.",
        images: ["/projects/theon/REVISEDMEETINGROOMS/meeting.jpeg", "/projects/theon/REVISEDMEETINGROOMS/17.jpeg", "/projects/theon/REVISEDMEETINGROOMS/19.jpeg"]
      },
      {
        name: "Workstations",
        description: "An easy and focusing area.",
        images: ["/projects/theon/WORKSTATION/W2.jpeg", "/projects/theon/WORKSTATION/W3.jpeg"]
      }
    ]
  }
];

// Helper function to get project by ID
export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id);