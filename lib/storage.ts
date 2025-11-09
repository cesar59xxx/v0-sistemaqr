// Sistema de armazenamento local para demonstração
// Em produção, substituir por API/Database

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "agent"
  avatar?: string
  createdAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  status: "sent" | "delivered" | "read"
  isAgent: boolean
}

export interface Conversation {
  id: string
  customerName: string
  customerPhone: string
  customerAvatar?: string
  assignedAgentId?: string
  status: "open" | "pending" | "closed"
  lastMessage?: string
  lastMessageTime: string
  unreadCount: number
  createdAt: string
}

export interface Metric {
  date: string
  sent: number
  received: number
  avgResponseTime: number
}

class Storage {
  private static instance: Storage

  private constructor() {}

  static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage()
    }
    return Storage.instance
  }

  // User Management
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("currentUser")
    return user ? JSON.parse(user) : null
  }

  setCurrentUser(user: User | null): void {
    if (typeof window === "undefined") return
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("currentUser")
    }
  }

  // Conversations
  getConversations(): Conversation[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("conversations")
    return data ? JSON.parse(data) : this.getDefaultConversations()
  }

  saveConversations(conversations: Conversation[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem("conversations", JSON.stringify(conversations))
  }

  // Messages
  getMessages(conversationId: string): Message[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(`messages_${conversationId}`)
    if (data) return JSON.parse(data)

    return this.getDefaultMessages(conversationId)
  }

  saveMessages(conversationId: string, messages: Message[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(`messages_${conversationId}`, JSON.stringify(messages))
  }

  addMessage(conversationId: string, message: Message): void {
    const messages = this.getMessages(conversationId)
    messages.push(message)
    this.saveMessages(conversationId, messages)

    // Update conversation last message
    const conversations = this.getConversations()
    const conv = conversations.find((c) => c.id === conversationId)
    if (conv) {
      conv.lastMessage = message.content
      conv.lastMessageTime = message.timestamp
      if (!message.isAgent) {
        conv.unreadCount += 1
      }
      this.saveConversations(conversations)
    }
  }

  // Metrics
  getMetrics(): Metric[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("metrics")
    return data ? JSON.parse(data) : this.getDefaultMetrics()
  }

  private getDefaultConversations(): Conversation[] {
    const conversations: Conversation[] = [
      {
        id: "1",
        customerName: "João Silva",
        customerPhone: "+55 11 98765-4321",
        status: "open",
        lastMessage: "Olá, preciso de ajuda com meu pedido",
        lastMessageTime: new Date().toISOString(),
        unreadCount: 2,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "2",
        customerName: "Maria Santos",
        customerPhone: "+55 21 91234-5678",
        status: "pending",
        lastMessage: "Obrigada pelo atendimento!",
        lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
        unreadCount: 0,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "3",
        customerName: "Pedro Costa",
        customerPhone: "+55 11 99876-5432",
        status: "open",
        lastMessage: "Quando vai chegar?",
        lastMessageTime: new Date(Date.now() - 1800000).toISOString(),
        unreadCount: 1,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ]
    this.saveConversations(conversations)
    return conversations
  }

  private getDefaultMessages(conversationId: string): Message[] {
    const sampleMessages: Record<string, Message[]> = {
      "1": [
        {
          id: "1",
          conversationId: "1",
          senderId: "customer1",
          senderName: "João Silva",
          content: "Olá, preciso de ajuda com meu pedido #12345",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: "read",
          isAgent: false,
        },
        {
          id: "2",
          conversationId: "1",
          senderId: "agent1",
          senderName: "Agente",
          content: "Olá João! Claro, vou verificar seu pedido. Um momento por favor.",
          timestamp: new Date(Date.now() - 3500000).toISOString(),
          status: "read",
          isAgent: true,
        },
        {
          id: "3",
          conversationId: "1",
          senderId: "customer1",
          senderName: "João Silva",
          content: "Obrigado!",
          timestamp: new Date(Date.now() - 3400000).toISOString(),
          status: "read",
          isAgent: false,
        },
      ],
    }

    const messages = sampleMessages[conversationId] || []
    if (messages.length > 0) {
      this.saveMessages(conversationId, messages)
    }
    return messages
  }

  private getDefaultMetrics(): Metric[] {
    const metrics: Metric[] = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      metrics.push({
        date: date.toISOString().split("T")[0],
        sent: Math.floor(Math.random() * 50) + 20,
        received: Math.floor(Math.random() * 60) + 30,
        avgResponseTime: Math.floor(Math.random() * 300) + 60,
      })
    }

    localStorage.setItem("metrics", JSON.stringify(metrics))
    return metrics
  }
}

export const storage = Storage.getInstance()
