"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, CheckCheck, Check } from "lucide-react"
import { storage, type Message, type Conversation } from "@/lib/storage"
import { useAuth } from "@/components/auth-provider"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

interface ChatInterfaceProps {
  conversationId: string
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const { user } = useAuth()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load conversation and messages
    const conversations = storage.getConversations()
    const conv = conversations.find((c) => c.id === conversationId)
    setConversation(conv || null)

    const msgs = storage.getMessages(conversationId)
    setMessages(msgs)

    // Mark as read
    if (conv && conv.unreadCount > 0) {
      conv.unreadCount = 0
      storage.saveConversations(conversations)
    }
  }, [conversationId])

  useEffect(() => {
    // Auto scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim() || !user) return

    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId: user.id,
      senderName: user.name,
      content: inputValue,
      timestamp: new Date().toISOString(),
      status: "sent",
      isAgent: true,
    }

    storage.addMessage(conversationId, newMessage)
    setMessages([...messages, newMessage])
    setInputValue("")
    toast.success("Mensagem enviada")

    // Simulate message status updates
    setTimeout(() => {
      newMessage.status = "delivered"
      setMessages((prev) => [...prev])
    }, 1000)

    setTimeout(() => {
      newMessage.status = "read"
      setMessages((prev) => [...prev])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Conversa não encontrada</p>
      </div>
    )
  }

  const getStatusIcon = (status: Message["status"]) => {
    if (status === "read") return <CheckCheck className="h-3 w-3 text-blue-500" />
    if (status === "delivered") return <CheckCheck className="h-3 w-3 text-gray-400" />
    return <Check className="h-3 w-3 text-gray-400" />
  }

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-600 text-white">
                {conversation.customerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-gray-900">{conversation.customerName}</h2>
              <p className="text-sm text-gray-500">{conversation.customerPhone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={
                conversation.status === "open"
                  ? "bg-green-100 text-green-700"
                  : conversation.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
              }
            >
              {conversation.status === "open" ? "Aberta" : conversation.status === "pending" ? "Pendente" : "Fechada"}
            </Badge>
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 bg-gray-50" ref={scrollRef}>
        <div className="px-6 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma mensagem ainda</p>
              <p className="text-sm text-gray-400 mt-1">Inicie a conversa enviando uma mensagem</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.isAgent ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 max-w-[70%] ${message.isAgent ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={message.isAgent ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                      {message.senderName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`flex flex-col ${message.isAgent ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.isAgent ? "bg-green-600 text-white" : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 px-1">
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(message.timestamp), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                      {message.isAgent && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
