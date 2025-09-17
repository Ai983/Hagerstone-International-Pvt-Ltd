// Trigger rebuild: 2025-09-17
export default function ImageCarousel({ images }: { images: string[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`slide-${i}`} className="h-64 w-auto rounded-lg object-cover flex-shrink-0" />
      ))}
    </div>
  );
}
