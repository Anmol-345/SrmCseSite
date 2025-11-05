"use client";

import { motion } from "framer-motion";

export default function EventGallery() {
  const galleryItems = [
    { src: "/programming-contest-at-cse-department.jpg", alt: "Programming contest held in the main lab.", title: "Programming Contest" },
    { src: "/guest-lecture-on-ai.jpg", alt: "Guest lecture on Artificial Intelligence.", title: "AI Guest Lecture" },
    { src: "/student-workshop-on-web-development.jpg", alt: "A hands-on student workshop on web development.", title: "Web Dev Workshop" },
    { src: "/cybersecurity-seminar.jpg", alt: "Cybersecurity seminar for students.", title: "Cybersecurity Seminar" },
    { src: "/hackathon-finale.jpg", alt: "Winners of the annual hackathon.", title: "Hackathon Finale" },
    { src: "/project-expo.jpg", alt: "Students presenting their final year projects.", title: "Project Expo 2025" },
    { src: "/robotics-club.jpg", alt: "Robotics club members working on a project.", title: "Robotics Club" },
    { src: "/alumni-meet.jpg", alt: "Alumni networking event.", title: "Alumni Meet 2025" },
    { src: "/data-science.jpg", alt: "Students attending a data science bootcamp.", title: "Data Science Bootcamp" },
    { src: "/orientation-day.jpg", alt: "New student orientation day.", title: "Orientation Day" },
    { src: "/farewell-party.jpg", alt: "Farewell party for graduating students.", title: "Graduation Farewell" },
    { src: "/tech-fest.jpg", alt: "Inauguration of the annual tech fest.", title: "Tech Fest '25" },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-black px-6 py-20">
    <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl font-bold mb-14 tracking-widest text-center text-white"
      >
        Event Gallery
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl group cursor-pointer"
          >
            {/* Image */}
            <motion.img
              src={item.src}
              alt={item.alt}
              className="w-full h-64 object-cover transition duration-700 group-hover:blur-md group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition duration-700" />

            {/* Text (bottom-left → centered on hover) */}
            <div className="absolute inset-0 flex items-end group-hover:items-center justify-start group-hover:justify-center transition-all duration-700">
              <h3 className="text-white text-lg font-semibold p-4 group-hover:text-3xl group-hover:font-bold text-left group-hover:text-center transition-all duration-700">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
