import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const galleryItems = [
  {
    src: "/programming-contest-at-cse-department.jpg",
    alt: "Programming contest at CSE department",
    title: "Programming Contest",
  },
  {
    src: "/guest-lecture-on-ai.jpg",
    alt: "Guest lecture on AI",
    title: "AI Guest Lecture",
  },
  {
    src: "/student-workshop-on-web-development.jpg",
    alt: "Student workshop on web development",
    title: "Web Dev Workshop",
  },
  {
    src: "/cybersecurity-seminar.jpg",
    alt: "Cybersecurity seminar for students",
    title: "Cybersecurity Seminar",
  },
  {
    src: "/hackathon-finale.jpg",
    alt: "Winners of the annual hackathon",
    title: "Hackathon Finale",
  },
  {
    src: "/project-expo.jpg",
    alt: "Students presenting their final year projects",
    title: "Project Expo 2025",
  },
]

export function EventGallerySection() {
  return (
    <section aria-labelledby="home-gallery-title" className="space-y-24 bg-black py-16 text-white">
      <div className="flex items-center justify-between px-16">
        <h2 id="home-gallery-title" className="text-2xl font-semibold">
          Event Gallery
        </h2>
        <Button asChild variant="secondary">
          <Link href="/gallery">View full gallery</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 px-16 sm:grid-cols-2 md:grid-cols-3">
        {galleryItems.map((item, i) => (
          <Link
            href="/gallery"
            key={item.title}
            className="group relative block h-80 w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 will-change-transform animate-in fade-in-0 slide-in-from-bottom-2"
            style={{ animationDelay: `${i * 100}ms` }}
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