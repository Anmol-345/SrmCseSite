"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Updated data with more subjects per semester
const semesters = [
  {
    id: 1,
    subjects: [
      { name: "Math I", credits: 4 },
      { name: "Programming I", credits: 3 },
      { name: "Physics", credits: 4 },
      { name: "Engineering Drawing", credits: 2 },
      { name: "Communication Skills", credits: 2 },
    ],
  },
  {
    id: 2,
    subjects: [
      { name: "Math II", credits: 4 },
      { name: "Data Structures", credits: 4 },
      { name: "Digital Logic", credits: 3 },
      { name: "Chemistry", credits: 3 },
      { name: "Electrical Engineering Basics", credits: 3 },
    ],
  },
  {
    id: 3,
    subjects: [
      { name: "Discrete Math", credits: 4 },
      { name: "Object-Oriented Programming", credits: 4 },
      { name: "Computer Organization & Architecture", credits: 3 },
      { name: "Database Management Systems", credits: 3 },
      { name: "Theory of Computation", credits: 3 },
    ],
  },
  { id: 4, subjects: [
      { name: "Design & Analysis of Algorithms", credits: 4 },
      { name: "Operating Systems", credits: 3 },
      { name: "Computer Networks", credits: 3 },
      { name: "Software Engineering", credits: 3 },
      { name: "Microprocessors & Interfacing", credits: 3 },
    ],
  },
  { id: 5, subjects: [
      { name: "Artificial Intelligence", credits: 4 },
      { name: "Compiler Design", credits: 4 },
      { name: "Distributed Systems", credits: 3 },
      { name: "Cryptography", credits: 3 },
      { name: "Elective I", credits: 3 },
    ],
  },
  { id: 6, subjects: [
      { name: "Machine Learning", credits: 4 },
      { name: "Cloud Computing", credits: 4 },
      { name: "Big Data Analytics", credits: 3 },
      { name: "Elective II", credits: 3 },
      { name: "Open Elective", credits: 3 },
    ],
  },
  { id: 7, subjects: [
      { name: "Deep Learning", credits: 4 },
      { name: "Information Security", credits: 3 },
      { name: "Natural Language Processing", credits: 3 },
      { name: "Elective III", credits: 3 },
    ],
  },
  { id: 8, subjects: [
      { name: "Project Work", credits: 10 },
      { name: "Seminar", credits: 2 },
      { name: "Internship/Industrial Training", credits: 2 },
    ],
  },
]

export default function SyllabusPage() {
  const [selectedSemester, setSelectedSemester] = useState(null)

  const darkPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")`
  const lightPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/svg%3E")`

  return (
    <main>
      <section
        className="bg-slate-900 text-white"
        style={{ backgroundImage: darkPattern }}
      >
        <div className="mx-auto max-w-7xl px-4 pt-32 pb-12">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Syllabus</h1>
              <p className="mt-2 text-slate-300">
                Browse subjects and credits for each semester.
              </p>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Detailed Syllabus
            </Button>
          </div>
        </div>
      </section>

      <section
        className="bg-slate-50 py-16"
        style={{ backgroundImage: lightPattern }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {semesters.map((s) => (
              <Card
                key={s.id}
                onClick={() => setSelectedSemester(s)}
                className="flex cursor-pointer flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader>
                  <CardTitle className="text-lg">Semester {s.id}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {s.subjects.map((subj) => (
                      <li key={subj.name}>{subj.name}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedSemester} onOpenChange={() => setSelectedSemester(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Semester {selectedSemester?.id} Subjects</DialogTitle>
            <DialogDescription>
              List of subjects and their corresponding credits.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedSemester?.subjects.map((subj) => (
                <TableRow key={subj.name}>
                  <TableCell className="font-medium">{subj.name}</TableCell>
                  <TableCell className="text-right">{subj.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </main>
  )
}