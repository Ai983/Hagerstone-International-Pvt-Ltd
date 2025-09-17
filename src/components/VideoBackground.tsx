import { useEffect, useRef } from 'react';
import heroImage from '@/assets/office-walkthrough-hero.jpg';

const VideoBackground = ({ children }: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // For now, we'll use a static image with animation effects
    // In a real implementation, you would add a video file here
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Fallback to image if video fails to load
        console.log('Video autoplay failed, using fallback image');
      });
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Animation (Fallback for video) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-scale-in"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          animationDuration: '2s',
          animationFillMode: 'both'
        }}
      />
      
      {/* Video Background (Hidden for now, will be replaced with actual video) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        autoPlay
        muted
        loop
        playsInline
        style={{ display: 'none' }} // Hidden until we have actual video
      >
        <source src="/office-walkthrough.mp4" type="video/mp4" />
        <source src="/office-walkthrough.webm" type="video/webm" />
      </video>
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;