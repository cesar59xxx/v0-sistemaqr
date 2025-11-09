"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { storage, type Metric } from "@/lib/storage"

export function MessagesChart() {
  const [data, setData] = useState<Metric[]>([])

  useEffect(() => {
    const metrics = storage.getMetrics()
    setData(metrics)
  }, [])

  const chartData = data.map((m) => ({
    date: new Date(m.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
    Recebidas: m.received,
    Enviadas: m.sent,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mensagens nos Últimos 7 Dias</CardTitle>
        <CardDescription>Comparativo entre mensagens recebidas e enviadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="date" className="text-xs" stroke="#6B7280" />
              <YAxis className="text-xs" stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="Recebidas" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} />
              <Line type="monotone" dataKey="Enviadas" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
