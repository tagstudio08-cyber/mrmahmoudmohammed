import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teacherVideo from "@/assets/teacher.webm.asset.json";

gsap.registerPlugin(ScrollTrigger);

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let currentTime = 0;
    let rafId = 0;

    const tick = () => {
      currentTime += (targetTime - currentTime) * 0.15;
      if (Math.abs(targetTime - currentTime) > 0.001) {
        if (video.readyState >= 2) {
          try {
            video.currentTime = currentTime;
          } catch (e) {}
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const setup = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          targetTime = self.progress * duration;
        },
      });

      rafId = requestAnimationFrame(tick);
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: "400vh" }}
      aria-label="فيديو المدرس"
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={teacherVideo.url}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="w-full h-full object-cover"
          style={{ pointerEvents: "none" }}
        />
        <div className="absolute bottom-10 left-0 right-0 text-center text-white/90 font-bold text-xl md:text-3xl drop-shadow-lg px-4">
          مرر للأسفل لمشاهدة قصة المدرس
        </div>
      </div>
    </section>
  );
};

export default ScrollVideoSection;
