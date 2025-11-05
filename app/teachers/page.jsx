import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"

// Expanded and more detailed teacher data
const teachers = [
  { name: "Dr. A. Kumar", title: "Professor & HOD", img: "/placeholder-user.jpg" },
  { name: "Dr. S. Roy", title: "Associate Professor", img: "/placeholder-user.jpg" },
  { name: "Ms. N. Das", title: "Assistant Professor", img: "/placeholder-user.jpg" },
  { name: "Mr. R. Singh", title: "Assistant Professor", img: "/placeholder-user.jpg" },
  { name: "Dr. P. Sharma", title: "Professor", img: "/placeholder-user.jpg" },
  { name: "Mr. V. Gupta", title: "Assistant Professor", img: "/placeholder-user.jpg" },
  { name: "Ms. M. Reddy", title: "Associate Professor", img: "/placeholder-user.jpg" },
  { name: "Dr. J. Khan", title: "Professor", img: "/placeholder-user.jpg" },
]

export default function TeachersPage() {
  const darkPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")`
  const lightPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/svg%3E")`

  return (
    <main>
      <section 
        className="bg-slate-900 text-white"
        style={{ backgroundImage: darkPattern }}
      >
        <div className="mx-auto max-w-7xl px-4 pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Meet Our Faculty</h1>
          <p className="mt-2 text-slate-300">
            Dedicated educators and researchers shaping the future of technology.
          </p>
        </div>
      </section>

      <section
        className="bg-slate-50 py-16"
        style={{ backgroundImage: lightPattern }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teachers.map((t) => (
              // 👇 New Profile Card Design 👇
              <div
                key={t.name}
                className="transform-gpu rounded-xl border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              >
                <Image
                  src={t.img}
                  alt={`Portrait of ${t.name}`}
                  width={96}
                  height={96}
                  className="mx-auto h-24 w-24 rounded-full border-2 border-slate-200"
                />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{t.name}</h3>
                <p className="mt-1 text-sm text-primary">{t.title}</p>
                
                <div className="mt-4 flex justify-center gap-4">
                  <Link href="#" className="text-slate-400 hover:text-slate-600">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-slate-600">
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}