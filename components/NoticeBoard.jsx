"use client";

import { motion } from "framer-motion";

export default function NoticeBoard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const notices = [
    {
      title: "Mid-Sem Exams Schedule Released",
      desc: "The mid-semester exam timetable for all B.Tech batches is now available on the notice board section.",
    },
    {
      title: "Workshop on AI & ML",
      desc: "Join us for a hands-on workshop on Artificial Intelligence and Machine Learning on 12th Nov.",
    },
    {
      title: "Hackathon 2025 Registrations Open",
      desc: "Participate in our annual coding competition to win exciting prizes and internship offers.",
    },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center z-10"
      >
        Notice Board
      </motion.h2>

      {/* Notice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full z-10">
        {notices.map((notice, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition flex flex-col"
          >
            {/* Fixed title height for alignment */}
            <div className="min-h-[64px] flex items-center">
              <h3 className="text-xl font-semibold text-white drop-shadow text-center w-full">
                {notice.title}
              </h3>
            </div>

            {/* Divider (optional aesthetic touch) */}
            <div className="w-16 h-[2px] bg-blue-400 mx-auto my-4 rounded-full opacity-80" />

            {/* Description */}
            <p className="text-gray-200 leading-relaxed flex-grow text-center">
              {notice.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 bg-blue-500/80 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition z-10 backdrop-blur-md"
      >
        View All Notices
      </motion.button>
    </section>
  );
}
