"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, Clock, TrendingUp } from "lucide-react"
import { storage } from "@/lib/storage"

export function MetricsCards() {
  const [metrics, setMetrics] = useState({
    totalReceived: 0,
    totalSent: 0,
    avgResponseTime: 0,
    activeConversations: 0,
  })

  useEffect(() => {
    const data = storage.getMetrics()
    const conversations = storage.getConversations()

    const totalReceived = data.reduce((sum, m) => sum + m.received, 0)
    const totalSent = data.reduce((sum, m) => sum + m.sent, 0)
    const avgResponseTime = Math.round(data.reduce((sum, m) => sum + m.avgResponseTime, 0) / data.length)
    const activeConversations = conversations.filter((c) => c.status === "open").length

    setMetrics({
      totalReceived,
      totalSent,
      avgResponseTime,
      activeConversations,
    })
  }, [])

  const cards = [
    {
      title: "Mensagens Recebidas",
      value: metrics.totalReceived,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Mensagens Enviadas",
      value: metrics.totalSent,
      icon: Send,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Tempo Médio de Resposta",
      value: `${metrics.avgResponseTime}s`,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Conversas Ativas",
      value: metrics.activeConversations,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
