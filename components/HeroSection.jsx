"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6 text-lg font-medium z-20">
        <h1 className="text-2xl font-bold tracking-wide">Department of CSE</h1>
        <ul className="flex space-x-8">
          <li className="hover:text-blue-400 transition">Teachers</li>
          <li className="hover:text-blue-400 transition">Students</li>
          <li className="hover:text-blue-400 transition">Events</li>
          <li className="hover:text-blue-400 transition">Contact</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="z-10 px-6 flex flex-col items-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold drop-shadow-lg"
        >
          SRM UNIVERSITY, DELHI NCR
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-2xl md:text-4xl font-semibold drop-shadow-lg"
        >
          Welcome to Department of CSE
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Empowering Innovation, Research, and Excellence in Computer Science.  
          Explore faculty, coordinators, syllabus, events, and stay updated with
          the latest notices.
        </motion.p>
      </div>
    </section>
  );
}
