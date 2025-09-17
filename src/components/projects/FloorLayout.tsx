// Trigger rebuild: 2025-09-17
import { motion } from "framer-motion";

export default function FloorLayout({ name, layout }: { name: string; layout: string }) {
  return (
    <section className="my-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-2">{name}</h2>
          <p className="text-sm text-muted-foreground">Plan layout preview</p>
        </motion.div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img src={layout} alt={name} className="w-full rounded-xl shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
}