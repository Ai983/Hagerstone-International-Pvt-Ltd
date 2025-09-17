// Trigger rebuild: 2025-09-17
import { motion } from "framer-motion";

export default function ProjectHero({
  title,
  client,
  hero,
  heroVideo
}: {
  title: string;
  client: string;
  hero: string;
  heroVideo?: string;
}) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {heroVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img src={hero} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold text-white"
        >
          {title}
        </motion.h1>
        <p className="mt-2 text-lg text-white/85">{client}</p>
      </div>
    </section>
  );
}