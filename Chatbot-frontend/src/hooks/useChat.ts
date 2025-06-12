import { useState } from 'react'
import type  { Message } from '../types/types'

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])
  }

  return {
    messages,
    setMessages,
    addMessage,
    isLoading,
    setIsLoading,
  }
}