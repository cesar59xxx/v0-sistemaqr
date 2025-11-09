"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ConversationsList } from "@/components/conversations-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

export default function ConversationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Todas as Conversas</h1>
                <p className="text-gray-600 mt-1">Gerencie todas as conversas com clientes</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Conversa
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                >
                  Todas
                </TabsTrigger>
                <TabsTrigger
                  value="open"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                >
                  Abertas
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                >
                  Pendentes
                </TabsTrigger>
                <TabsTrigger
                  value="closed"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                >
                  Fechadas
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <ConversationsList />
            </TabsContent>
            <TabsContent value="open" className="mt-0">
              <ConversationsList />
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              <ConversationsList />
            </TabsContent>
            <TabsContent value="closed" className="mt-0">
              <ConversationsList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
