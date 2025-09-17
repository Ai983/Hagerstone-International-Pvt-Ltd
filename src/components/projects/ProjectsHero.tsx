import { useEffect, useRef } from "react";

export default function ProjectsHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-xl">
      {/* Centered Title, pushed down */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end items-center pb-20 pointer-events-none">
        <h1 className="text-6xl font-bold text-black">Our Portfolio</h1>
      </div>
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/projects/vecteezy_the-interior-of-a-large-office_2016989.mov"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Optional: Add a subtle overlay for contrast */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
    </div>
  );
}
