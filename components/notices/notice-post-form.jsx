"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NoticePostForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login")
          return
        }
        const data = await res.json().catch(() => ({}))
        setError(data?.message || "Failed to post notice")
        setLoading(false)
        return
      }
      setTitle("")
      setContent("")
      try {
        if (typeof window !== "undefined") {
          const ch = new BroadcastChannel("cse-notices")
          ch.postMessage({ type: "posted" })
          ch.close()
        }
      } catch {}
      router.push("/notices")
    } catch {
      setError("Network error, please try again")
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="body">Content</Label>
            <Textarea
              id="body"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full notice details here..."
              className="min-h-[140px]"
              required
            />
          </div>
          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Publish Notice"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
