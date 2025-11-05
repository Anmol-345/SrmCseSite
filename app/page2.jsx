import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NoticeList } from "@/components/notices/notice-list"
import { NoticeFlyout } from "@/components/notices/notice-flyout"
import { HiddenAdminButton } from "@/components/hidden-admin-button"
import { EventGallerySection } from "@/components/EventGallerySection"

export default function Page() {
  return (
    <>
      <section className="relative flex items-center justify-center min-h-[75vh] md:min-h-screen overflow-hidden">
        {/* ... (Hero section remains the same) ... */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <video
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/campus-poster.png"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
        </div>
        <NoticeFlyout />
        <div
          className="relative z-10 text-center text-white p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-700"
          style={{ animationDelay: "80ms" }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-orange-400 font-bold text-4xl uppercase tracking-widest">
              SRM University, Delhi NCR
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-balance">
              Welcome to the Department of{" "}
              <span
                className="glint-container"
                data-text="Computer Science & Engineering"
              >
                Computer Science & Engineering
              </span>
            </h1>
            <p className="text-neutral-200 leading-relaxed text-lg">
              Academic excellence, research, and innovation. Explore faculty, coordinators, syllabus, events, and stay
              updated with the latest notices.
            </p>
          </div>
        </div>
      </section>

      {/* Padded container for the Notice Board ONLY */}
      <div className="px-4 md:px-8 py-16 space-y-12">
        <HiddenAdminButton />
        
        <section aria-labelledby="home-notices-title" className="space-y-6">
          <div className="flex items-center justify-between mx-20">
            <h2 id="home-notices-title" className="text-2xl font-semibold">
              Notice Board
            </h2>
            <Button asChild variant="secondary">
              <Link href="/notices">View all notices</Link>
            </Button>
          </div>
          <div className="rounded-xl animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
            <NoticeList limit={3} />
          </div>
        </section>
      </div>

      <EventGallerySection />
    </>
  )
}