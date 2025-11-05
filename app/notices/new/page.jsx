"use client"

import NoticePostForm from "@/components/notices/notice-post-form"

export default function NewNoticePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Post a New Notice</h1>
      <NoticePostForm />
    </div>
  )
}



