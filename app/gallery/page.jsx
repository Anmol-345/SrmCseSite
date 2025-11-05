import Image from "next/image"
import Link from "next/link"

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
]

export default function GalleryPage() {
  return (
    // Replaced the multi-section layout with a single section, just like the homepage
    <section aria-labelledby="gallery-title" className="space-y-8 bg-black py-24 text-white md:py-32">
      <div className="px-16">
        <h1 id="gallery-title" className="text-4xl font-bold tracking-tight">
          Event Gallery
        </h1>
        <p className="mt-2 text-slate-300">
          A glimpse into the vibrant life of our department.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 px-16 sm:grid-cols-2 md:grid-cols-3">
        {galleryItems.map((item, i) => (
          <Link
            href="#"
            key={item.title}
            className="group relative block h-80 w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 will-change-transform animate-in fade-in-0 slide-in-from-bottom-2"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-0">
              <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white">{item.title}</h3>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}