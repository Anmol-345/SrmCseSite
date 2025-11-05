"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import NoticeBoard from "@/components/NoticeBoard";
import EventGallery from "@/components/EventGallery";

export default function Home() {
  const sectionAnimation = {
    hidden: { opacity: 0, y: 30 },   // small movement, no big gap
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-black text-white font-adamani">
      {/* Hero Section */}
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <HeroSection />
      </motion.div>

      {/* Notice Board */}
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <NoticeBoard />
      </motion.div>

      {/* Event Gallery */}
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <EventGallery />
      </motion.div>
    </main>
  );
}
