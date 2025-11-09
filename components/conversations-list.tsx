"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { storage, type Conversation } from "@/lib/storage"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"
import { MoreVertical, CheckCircle, Clock, XCircle } from "lucide-react"
import { toast } from "sonner"

interface ConversationsListProps {
  preview?: boolean
}

export function ConversationsList({ preview }: ConversationsListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    loadConversations()
  }, [preview])

  const loadConversations = () => {
    const data = storage.getConversations()
    const sorted = data.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
    setConversations(preview ? sorted.slice(0, 5) : sorted)
  }

  const updateStatus = (id: string, status: Conversation["status"]) => {
    const data = storage.getConversations()
    const conv = data.find((c) => c.id === id)
    if (conv) {
      conv.status = status
      storage.saveConversations(data)
      loadConversations()
      toast.success(
        `Conversa marcada como ${status === "open" ? "aberta" : status === "pending" ? "pendente" : "fechada"}`,
      )
    }
  }

  const getStatusBadge = (status: Conversation["status"]) => {
    const variants = {
      open: { label: "Aberta", className: "bg-green-100 text-green-700" },
      pending: { label: "Pendente", className: "bg-yellow-100 text-yellow-700" },
      closed: { label: "Fechada", className: "bg-gray-100 text-gray-700" },
    }
    const variant = variants[status]
    return <Badge className={variant.className}>{variant.label}</Badge>
  }

  return (
    <div className="divide-y divide-gray-200">
      {conversations.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-500">Nenhuma conversa encontrada</p>
        </div>
      ) : (
        conversations.map((conversation) => (
          <div key={conversation.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
            <Link href={`/chat/${conversation.id}`} className="flex items-center gap-4 flex-1 min-w-0">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-600 text-white text-lg">
                  {conversation.customerName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{conversation.customerName}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(conversation.lastMessageTime), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
                <div className="flex items-center gap-2">
                  {getStatusBadge(conversation.status)}
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-blue-600 text-white">
                      {conversation.unreadCount} nova{conversation.unreadCount > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => updateStatus(conversation.id, "open")}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Marcar como aberta
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateStatus(conversation.id, "pending")}>
                  <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                  Marcar como pendente
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateStatus(conversation.id, "closed")}>
                  <XCircle className="mr-2 h-4 w-4 text-gray-600" />
                  Marcar como fechada
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))
      )}
    </div>
  )
}
