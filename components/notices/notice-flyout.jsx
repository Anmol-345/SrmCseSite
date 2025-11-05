"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import useSWR from "swr"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const fetcher = (url) => fetch(url).then((r) => r.json())

export function NoticeFlyout() {
  const { data, error, isLoading, mutate } = useSWR("/api/notices", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 0,
  })
  const [dismissedId, setDismissedId] = useState(null)
  const channelRef = useRef(null)

  // Restore last dismissed notice
  useEffect(() => {
    try {
      const id = window.localStorage.getItem("cse_notice_dismissed_id")
      if (id) setDismissedId(id)
    } catch {}
  }, [])

  // Listen for "notice-posted" messages
  useEffect(() => {
    try {
      const ch = new BroadcastChannel("cse-notices")
      channelRef.current = ch
      ch.onmessage = (e) => {
        if (e?.data?.type === "posted") {
          mutate()
        }
      }
      return () => ch.close()
    } catch {
      return
    }
  }, [mutate])

  const latest = useMemo(() => {
    const list = Array.isArray(data) ? data : []
    return list.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
  }, [data])

  const [hidden, setHidden] = useState(false)
  const shouldShow = !isLoading && !error && latest && (latest._id || latest.id) !== dismissedId && !hidden

  if (!shouldShow) return null

  return (
    <div
      className="fixed top-18 right-4 md:right-6 z-50 w-full max-w-sm md:max-w-md animate-in fade-in-0 slide-in-from-right-8 duration-500"
      role="region"
      aria-label="Latest notice"
    >
      <div className="rounded-2xl border border-white/20 bg-black/30 p-4 text-white shadow-lg backdrop-blur-lg">
        <div className="flex items-start gap-3">
          <span className="mt-1 shrink-0 rounded-full border border-white/30 px-2 py-0.5 text-[10px] text-white/80 md:text-xs">
            New Notice
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-medium md:text-base">{latest?.title}</h3>
            <p className="mt-1 text-xs text-white/70 md:text-sm">{latest?.content}</p>
            <div className="mt-3 flex items-center justify-end gap-2">
              <Button asChild size="sm" className="bg-white/10 text-white hover:bg-white/20">
                <Link href="/notices">View all</Link>
              </Button>
              <Button
                size="sm"
                className="bg-transparent text-white/70 hover:bg-white/10 hover:text-white"
                onClick={() => {
                  try {
                    const latestId = latest._id || latest.id
                    window.localStorage.setItem("cse_notice_dismissed_id", latestId)
                  } catch {}
                  setHidden(true)
                }}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}