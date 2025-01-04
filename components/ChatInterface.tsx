'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'
import Anthropic from '@anthropic-ai/sdk'
import { formatMessage } from './CodeBlock'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

interface ChatInterfaceProps {
  apiKey: string
  chatId: string
}

export default function ChatInterface({ apiKey, chatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const anthropic = new Anthropic({ 
    apiKey,
    dangerouslyAllowBrowser: true
  })

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(`chat_${chatId}`)
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages)
        setMessages(parsedMessages)
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
      setMessages([])
    }
  }, [chatId])

  useEffect(() => {
    if (messages.length > 0 && !messages[messages.length - 1].isStreaming) {
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages))
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      setMessages([...updatedMessages, { role: 'assistant', content: '', isStreaming: true }])

      const stream = await anthropic.messages.stream({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })

      let streamedContent = ''
      
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.text) {
          streamedContent += chunk.delta.text
          setMessages(prev => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            lastMessage.content = streamedContent
            return [...newMessages]
          })
        }
      }

      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        lastMessage.isStreaming = false
        return [...newMessages]
      })
    } catch (error) {
      console.error('Error calling Claude API:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.role === 'user' ? 'user-message' : 'assistant-message'
            }`}
          >
            <div className="font-medium mb-1">
              {message.role === 'user' ? 'You' : 'Claude'}
            </div>
            <div className="whitespace-pre-wrap">
              {message.isStreaming ? (
                <>
                  {formatMessage(message.content)}
                  <span className="cursor-blink" />
                </>
              ) : (
                formatMessage(message.content)
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message">
            <div className="font-medium mb-1">Claude</div>
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input-field flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="button"
            disabled={isLoading || !input.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}
//