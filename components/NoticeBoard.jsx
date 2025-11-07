"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NoticeBoard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const { data, error, isLoading } = useSWR("/api/notices", fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  const notices = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return [...data]
      .filter((notice) => notice?.title && notice?.content)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 3);
  }, [data]);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 text-white bg-gradient-to-br from-slate-950 via-slate-900 to-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />

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
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`notice-skeleton-${index}`}
              className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 animate-pulse"
            >
              <div className="h-6 w-3/4 mx-auto rounded-full bg-slate-700/60" />
              <div className="mt-6 h-1 w-16 mx-auto rounded-full bg-slate-700/40" />
              <div className="mt-8 space-y-3">
                <div className="h-3 w-full rounded-full bg-slate-700/40" />
                <div className="h-3 w-5/6 rounded-full bg-slate-700/40" />
                <div className="h-3 w-4/6 rounded-full bg-slate-700/40" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="md:col-span-3 text-center text-red-300">
            Unable to load notices right now. Please try again later.
          </div>
        ) : notices.length === 0 ? (
          <div className="md:col-span-3 text-center text-gray-400">
            No notices published yet.
          </div>
        ) : (
          notices.map((notice, i) => (
            <motion.div
              key={notice._id || `${notice.title}-${i}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.7)] flex flex-col transition-transform duration-300 will-change-transform"
            >
              <div className="min-h-[64px] flex items-center">
                <h3 className="text-xl font-semibold text-white drop-shadow-lg text-center w-full">
                  {notice.title}
                </h3>
              </div>

              <div className="w-16 h-[2px] bg-sky-400/80 mx-auto my-4 rounded-full" />

              <p className="text-slate-200/90 leading-relaxed flex-grow text-center">
                {notice.content?.length > 180
                  ? `${notice.content.slice(0, 177)}...`
                  : notice.content || ""}
              </p>

              {notice.createdAt ? (
                <p className="mt-8 text-xs uppercase tracking-[0.3em] text-slate-400 text-center">
                  {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              ) : null}
            </motion.div>
          ))
        )}
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
