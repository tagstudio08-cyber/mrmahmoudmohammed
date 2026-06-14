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
      currentTime += (targetTime - currentTime) * 0.08;
      if (Math.abs(targetTime - currentTime) > 0.0005) {
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
        scrub: 1.2,
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
      style={{ height: "250vh" }}
      aria-label="فيديو المدرس"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-0 md:px-6">
        <div className="relative w-full max-w-[1400px] h-[85vh] md:h-auto md:aspect-[21/9] rounded-none md:rounded-2xl overflow-hidden md:border md:border-white/20 bg-gradient-to-br from-sky-100/40 to-blue-200/30 md:shadow-2xl flex items-center justify-center">
          <video
            ref={videoRef}
            src={teacherVideo.url}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="h-full w-full md:w-auto object-contain"
            style={{ pointerEvents: "none" }}
          />
        </div>
      </div>
    </section>
  );
};

export default ScrollVideoSection;
