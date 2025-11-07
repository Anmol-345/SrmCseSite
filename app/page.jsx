"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { NoticeList } from "@/components/notices/notice-list"
import { HiddenAdminButton } from "@/components/hidden-admin-button"
import { EventGallerySection } from "@/components/EventGallerySection"
import ScrollSyncedHero from "@/components/ScrollSyncedHero"

export default function Page() {
  const noticeSectionAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <ScrollSyncedHero />

      <motion.section
        aria-labelledby="home-notices-title"
        className="relative overflow-hidden px-4 md:px-8 py-20 text-white bg-black"
        variants={noticeSectionAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black" />

        <div className="relative z-10 space-y-12">
          <HiddenAdminButton />

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mx-0 md:mx-20">
            <h2 id="home-notices-title" className="text-3xl font-semibold">
              Notice Board
            </h2>
            <Button asChild variant="secondary" className="self-start md:self-auto">
              <Link href="/notices">View all notices</Link>
            </Button>
          </div>

          <div className="rounded-2xl p-2 md:p-6">
            <NoticeList limit={3} />
          </div>
        </div>
      </motion.section>

      <EventGallerySection />
    </>
  )
}