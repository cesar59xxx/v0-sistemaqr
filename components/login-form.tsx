"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare } from "lucide-react"
import { storage, type User } from "@/lib/storage"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Simulação de login (em produção, fazer requisição à API)
    setTimeout(() => {
      const user: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        role: "agent",
        createdAt: new Date().toISOString(),
      }

      storage.setCurrentUser(user)
      toast.success("Login realizado com sucesso!")
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    // Simulação de registro
    setTimeout(() => {
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "agent",
        createdAt: new Date().toISOString(),
      }

      storage.setCurrentUser(user)
      toast.success("Conta criada com sucesso!")
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="bg-blue-600 p-3 rounded-lg mb-2">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">Bem-vindo</CardTitle>
        <CardDescription>Entre na sua conta ou crie uma nova</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" type="text" placeholder="Seu nome" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Senha</Label>
                <Input
                  id="reg-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
