"use client"

import { useSession } from "next-auth/react"
import { NoticeList } from "@/components/notices/notice-list"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NoticesPage() {
  const { data: session } = useSession()

  const darkPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")`
  const lightPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/svg%3E")`

  return (
    <main className="flex min-h-screen flex-col">
      <section 
        className="bg-slate-900 text-white"
        style={{ backgroundImage: darkPattern }}
      >
        <div className="mx-auto max-w-5xl px-4 pt-32 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Notice Board</h1>
              <p className="mt-2 text-slate-300">
                Stay updated with the latest announcements from the department.
              </p>
            </div>
            {session?.user?.role === 'admin' && (
              <Button asChild>
                <Link href="/notices/new">Post Notice</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section
        className="flex-grow bg-slate-50 py-16"
        style={{ backgroundImage: lightPattern }}
      >
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-xl border bg-white shadow-lg">
            <NoticeList layout="list" />
          </div>
        </div>
      </section>
    </main>
  )
}