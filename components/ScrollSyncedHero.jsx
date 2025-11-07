"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollSyncedHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
  const overlayBlur = useTransform(scrollYProgress, [0, 0.03], ["blur(16px)", "blur(0px)"]);
  const darkOverlayOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMetadata = () => {
      if (!Number.isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
        setIsReady(true);
      }
    };

    video.preload = "auto";
    video.pause();
    video.addEventListener("loadedmetadata", handleMetadata);
    handleMetadata();

    return () => video.removeEventListener("loadedmetadata", handleMetadata);
  }, []);

  useEffect(() => {
    if (!isReady || duration === 0) return;
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on("change", (value) => {
      const clamped = Math.min(Math.max(value, 0), 1);
      const nextTime = clamped * duration;

      if (Math.abs(video.currentTime - nextTime) > 0.03) {
        video.currentTime = nextTime;
      }

      const shouldShowOverlay = clamped <= 0.002;
      setOverlayVisible((prev) => (prev === shouldShowOverlay ? prev : shouldShowOverlay));
    });

    return () => unsubscribe();
  }, [duration, isReady, scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-black text-white"
      aria-label="Scroll-synced hero section"
    >
      <div className="sticky top-0 h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/hero-scroll-video-720p.mp4"
            muted
            playsInline
            controls={false}
          />
          {/* Light overlay that is only visible at the very start */}
          {overlayVisible ? (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black"
              style={{
                opacity: overlayOpacity,
                filter: overlayBlur,
              }}
            />
          ) : null}
          {/* Dark overlay near end of video */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: darkOverlayOpacity }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-semibold tracking-wide sm:text-5xl lg:text-6xl"
          >
            SRM University, Delhi NCR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base text-white/80 sm:text-lg"
          >
            Discover the Department of Computer Science & Engineering — where research, industry, and innovation collide.
          </motion.p>
        </div>

        {/* Scroll prompt */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.3em] text-white/70">
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
