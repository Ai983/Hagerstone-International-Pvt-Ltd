// Trigger rebuild: 2025-09-17
import { motion } from "framer-motion";
import ImageCarousel from "./ImageCarousel";

export default function ProjectSection({
  name,
  description,
  images,
  video
}: {
  name: string;
  description?: string;
  images?: string[];
  video?: string;
}) {
  return (
    <section className="my-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-1"
        >
          <h2 className="text-2xl font-bold mb-3">{name}</h2>
          {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-2 md:order-2"
        >
          {images && images.length > 0 && <ImageCarousel images={images} />}
          {video && !images && (
            <video controls className="w-full rounded-xl shadow-md">
              <source src={video} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </div>
    </section>
  );
}