"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { storage, type User } from "@/lib/storage"

interface AuthContextType {
  user: User | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const currentUser = storage.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)

    // Redirect logic
    if (!currentUser && pathname !== "/login") {
      router.push("/login")
    } else if (currentUser && pathname === "/login") {
      router.push("/dashboard")
    }
  }, [pathname, router])

  const logout = () => {
    storage.setCurrentUser(null)
    setUser(null)
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
