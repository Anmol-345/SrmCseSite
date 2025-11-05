"use client"

import useSWR from "swr"
import { useState } from "react"
import { useSession } from "next-auth/react"
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

  if (isLoading) return <div>Loading notices...</div>
  if (error) return <div className="text-destructive">Failed to load notices.</div>

  const notices = Array.isArray(data) ? data : []
  const sortedNotices = notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const items = typeof limit === "number" ? sortedNotices.slice(0, limit) : sortedNotices

  // Correctly handles the 'grid' layout for the homepage
  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 px-16">
        {items.length === 0 ? (
          <div className="text-muted-foreground md:col-span-3">No notices yet.</div>
        ) : (
          items.map((n, i) => (
            <GridItem key={n._id} n={n} i={i} session={session} mutate={mutate} />
          ))
        )}
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
    <div
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 will-change-transform animate-in fade-in-0 slide-in-from-bottom-2"
      style={{ animationDelay: `${i * 80}ms` }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CalendarDays className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">
            {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </p>
          <p className="text-xs text-slate-500">{new Date(n.createdAt).getFullYear()}</p>
        </div>
      </div>
      <h3 className="mb-3 text-xl font-bold text-slate-900">{n.title}</h3>
      <div className="flex-grow text-sm leading-relaxed text-slate-600">
        {session?.user?.role === "admin" ? (
          <EditableNotice n={n} onChanged={() => mutate()} />
        ) : (
          <p className="line-clamp-4">{n.content}</p>
        )}
      </div>
    </div>
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