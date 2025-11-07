"use client"

import useSWR from "swr"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDays, FileText, UserCircle2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const fetcher = (url) => fetch(url).then((r) => r.json())

export function NoticeList({ limit, layout = 'grid' }) {
  const { data: session } = useSession()
  const { data, error, isLoading, mutate } = useSWR("/api/notices", fetcher, {
    revalidateOnFocus: true,
  })

  const notices = Array.isArray(data) ? data : []
  const sortedNotices = notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const items = typeof limit === "number" ? sortedNotices.slice(0, limit) : sortedNotices

  // Correctly handles the 'grid' layout for the homepage
  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:px-4">
        {isLoading
          ? Array.from({ length: typeof limit === "number" ? limit : 3 }).map((_, index) => (
              <div
                key={`notice-skeleton-${index}`}
                className="rounded-2xl border border-white/12 bg-black p-6 md:p-7 animate-pulse"
              >
                <div className="h-6 w-3/4 rounded-full bg-slate-700/50" />
                <div className="mt-6 h-1 w-16 rounded-full bg-slate-700/40" />
                <div className="mt-8 space-y-3">
                  <div className="h-3 w-full rounded-full bg-slate-700/40" />
                  <div className="h-3 w-5/6 rounded-full bg-slate-700/40" />
                  <div className="h-3 w-2/3 rounded-full bg-slate-700/40" />
                </div>
              </div>
            ))
          : error
          ? <div className="md:col-span-3 text-center text-red-300">Failed to load notices.</div>
          : items.length === 0
          ? <div className="md:col-span-3 text-center text-slate-400">No notices yet.</div>
          : items.map((n, i) => (
              <GridItem key={n._id || `${n.title}-${i}`} n={n} i={i} session={session} mutate={mutate} />
            ))}
      </div>
    )
  }

  // Handles the 'list' (accordion) layout for the main notices page
  return (
    <div>
      {items.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">No notices yet.</div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {items.map((n) => (
            <AccordionItem key={n._id} value={n._id}>
              <AccordionTrigger className="p-6 text-left transition-colors rounded-md hover:bg-slate-100 hover:no-underline">
                <div className="flex w-full items-center gap-4">
                  <FileText className="h-6 w-6 shrink-0 text-primary" />
                  <div className="flex-grow">
                    <p className="font-semibold text-slate-800">{n.title}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <UserCircle2 className="h-3 w-3" />
                      <span>Posted by Admin</span>
                    </div>
                  </div>
                  <div className="hidden shrink-0 text-right text-xs text-slate-500 sm:block">
                    <p>{new Date(n.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                    <p>{new Date(n.createdAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="prose prose-slate max-w-none p-4 pt-0 text-slate-600">
                {session?.user?.role === "admin" ? (
                  <EditableNotice n={n} onChanged={() => mutate()} />
                ) : (
                  <p>{n.content}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}

function GridItem({ n, i, session, mutate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.18, ease: "easeOut" } }}
      className="flex flex-col rounded-2xl border border-white/12 bg-black p-7 shadow-[0_20px_45px_-40px_rgba(0,0,0,0.85)]"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <CalendarDays className="h-6 w-6 text-white/80" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white/80">
            {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </p>
          <p className="text-xs text-white/50">{new Date(n.createdAt).getFullYear()}</p>
        </div>
      </div>
      <h3 className="mb-3 text-xl font-semibold text-white drop-shadow-lg">{n.title}</h3>
      <div className="flex-grow text-sm leading-relaxed text-white/80">
        {session?.user?.role === "admin" ? (
          <EditableNotice n={n} onChanged={() => mutate()} />
        ) : (
          <p className="line-clamp-4">{n.content}</p>
        )}
      </div>
    </motion.div>
  )
}

function EditableNotice({ n, onChanged }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(n.title)
  const [content, setContent] = useState(n.content)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onDelete() {
    if (!confirm("Delete this notice?")) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/notices/${n._id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      onChanged()
    } catch (e) {
      setError("Failed to delete")
    } finally {
      setLoading(false)
    }
  }

  async function onSave(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/notices/${n._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })
      if (!res.ok) throw new Error("Failed to update")
      setIsEditing(false)
      onChanged()
    } catch (e) {
      setError("Failed to update")
    } finally {
      setLoading(false)
    }
  }

  if (!isEditing) {
    return (
      <div className="flex h-full flex-col">
        <p className="flex-grow line-clamp-4">{n.content}</p>
        {error ? <div className="text-destructive text-xs">{error}</div> : null}
        <div className="flex gap-2 justify-end pt-4">
          <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
          <Button variant="destructive" size="sm" onClick={onDelete} disabled={loading}>{loading ? "..." : "Delete"}</Button>
        </div>
      </div>
    )
  }
  
  return (
    <form className="grid gap-3" onSubmit={onSave}>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      {error ? <div className="text-destructive text-xs">{error}</div> : null}
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
        <Button type="submit" size="sm" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
      </div>
    </form>
  )
}