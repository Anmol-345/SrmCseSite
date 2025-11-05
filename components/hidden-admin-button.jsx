"use client"

import { useState, useEffect } from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { UserCog } from "lucide-react"

export function HiddenAdminButton() {
  const { data: session } = useSession()
  const [showButton, setShowButton] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault()
        setShowButton(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsSigningIn(true)
    setError("")
    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result?.error) {
        setError("Invalid credentials. Please try again.")
      } else if (result?.ok) {
        setShowLoginForm(false)
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      setError("An unexpected error occurred.")
    } finally {
      setIsSigningIn(false)
    }
  }

  if (session?.user?.role === 'admin') {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <Button asChild size="sm">
          <Link href="/admin/dashboard">Admin Dashboard</Link>
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  if (showLoginForm) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm h-screen"
        onClick={() => setShowLoginForm(false)}
      >
        <div
          className="w-full max-w-sm rounded-xl border border-white/20 bg-black/40 p-6 text-white shadow-2xl backdrop-blur-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center text-2xl font-bold">Admin Login</h2>
          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required placeholder="admin@cse.edu"
                className="bg-transparent border-gray-600 ring-offset-black focus-visible:ring-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                required placeholder="••••••••"
                className="bg-transparent border-gray-600 ring-offset-black focus-visible:ring-white"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <Button type="button" onClick={() => setShowLoginForm(false)} className="flex-1 bg-white/10 text-white hover:bg-white/20">Cancel</Button>
              <Button type="submit" disabled={isSigningIn} className="flex-1">{isSigningIn ? "Signing in..." : "Sign In"}</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setShowLoginForm(true)}
        className={`h-10 w-10 rounded-full transition-opacity duration-300 ${
          showButton
            ? 'opacity-100 bg-primary text-primary-foreground'
            : 'opacity-0 hover:opacity-50'
        }`}
        title="Admin Login (Ctrl+Shift+.)"
      >
        <UserCog className="h-5 w-5" />
      </Button>
    </div>
  )
}