import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsCards } from "@/components/metrics-cards"
import { MessagesChart } from "@/components/messages-chart"
import { ConversationsList } from "@/components/conversations-list"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <MetricsCards />
          <MessagesChart />

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Conversas Recentes</h2>
            </div>
            <ConversationsList preview />
          </div>
        </div>
      </main>
    </div>
  )
}
