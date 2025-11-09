import { DashboardHeader } from "@/components/dashboard-header"
import { ChatInterface } from "@/components/chat-interface"

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      <ChatInterface conversationId={id} />
    </div>
  )
}
