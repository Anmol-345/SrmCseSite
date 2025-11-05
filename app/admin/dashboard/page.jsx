"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            Welcome, {session.user.email}
          </span>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Notice Management</h2>
          <p className="text-muted-foreground mb-4">
            Create, edit, and delete notices for the department.
          </p>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/notices">View All Notices</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/notices/new">Create New Notice</Link>
            </Button>
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <p className="text-muted-foreground mb-4">
            Manage department content and settings.
          </p>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/">View Website</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

