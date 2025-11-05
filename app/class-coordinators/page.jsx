import Image from "next/image"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"

// Expanded data with more CRs for a fuller look
const semesters = [
  {
    semester: "Semester 3",
    coordinators: [
      { section: "Section A", name: "Aarav Sharma", img: "/placeholder-user.jpg" },
      { section: "Section B", name: "Ishaan Patel", img: "/placeholder-user.jpg" },
      { section: "Section C", name: "Priya Singh", img: "/placeholder-user.jpg" },
      { section: "Section D", name: "Diya Mehta", img: "/placeholder-user.jpg" },
      { section: "Section E", name: "Kabir Verma", img: "/placeholder-user.jpg" },
      { section: "Section F", name: "Ananya Joshi", img: "/placeholder-user.jpg" },
    ],
  },
  {
    semester: "Semester 4",
    coordinators: [
      { section: "Section A", name: "Zoya Khan", img: "/placeholder-user.jpg" },
      { section: "Section B", name: "Rohan Gupta", img: "/placeholder-user.jpg" },
      { section: "Section C", name: "Aryan Reddy", img: "/placeholder-user.jpg" },
      { section: "Section D", name: "Meera Nair", img: "/placeholder-user.jpg" },
    ],
  },
  {
    semester: "Semester 5",
    coordinators: [
      { section: "Section A", name: "Arjun Kumar", img: "/placeholder-user.jpg" },
      { section: "Section B", name: "Sana Ali", img: "/placeholder-user.jpg" },
      { section: "Section C", name: "Vikram Malhotra", img: "/placeholder-user.jpg" },
      { section: "Section D", name: "Neha Rao", img: "/placeholder-user.jpg" },
    ],
  },
];

export default function CoordinatorsPage() {
  const darkPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")`
  const lightPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/svg%3E")`

  return (
    <main>
      <section 
        className="bg-slate-900 text-white"
        style={{ backgroundImage: darkPattern }}
      >
        <div className="mx-auto max-w-7xl px-4 pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Class Coordinators</h1>
          <p className="mt-2 text-slate-300">
            Your student representatives for each semester, here to help.
          </p>
        </div>
      </section>

      <section
        className="bg-slate-50 py-16"
        style={{ backgroundImage: lightPattern }}
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4">
          {semesters.map((s) => (
            <div key={s.semester}>
              <h2 className="mb-6 text-2xl font-semibold border-b pb-2">
                {s.semester}
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {s.coordinators.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-6 rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <Image
                      src={c.img}
                      alt={`Portrait of ${c.name}`}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full border-2 border-slate-200"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                      <p className="text-sm text-primary">{c.section} Coordinator</p>
                      
                      <div className="mt-3 space-y-2 border-t pt-3">
                        <Link href="#" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary">
                          <Mail className="h-4 w-4" />
                          <span>student.email@srm.edu</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary">
                          <Phone className="h-4 w-4" />
                          <span>+91 12345 67890</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}