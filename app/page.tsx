'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Plus, Trash2, Edit2 } from 'lucide-react'
import ApiKeyInput from '../components/ApiKeyInput'
import ChatInterface from '../components/ChatInterface'
import Sidebar from '../components/Sidebar'
import Settings, { SettingsButton } from '../components/Settings'

export default function Home() {
  const [apiKey, setApiKey] = useState<string>('')
  const [chats, setChats] = useState<Array<{id: string, name: string}>>([])
  const [currentChat, setCurrentChat] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const storedKey = localStorage.getItem('claude_api_key')
    if (storedKey) {
      setApiKey(storedKey)
    }

    const storedChats = localStorage.getItem('claude_chats')
    if (storedChats) {
      setChats(JSON.parse(storedChats))
    }
  }, [])

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key)
    localStorage.setItem('claude_api_key', key)
  }

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      name: `Chat ${chats.length + 1}`
    }
    const updatedChats = [...chats, newChat]
    setChats(updatedChats)
    setCurrentChat(newChat.id)
    localStorage.setItem('claude_chats', JSON.stringify(updatedChats))
  }

  const deleteChat = (id: string) => {
    const updatedChats = chats.filter(chat => chat.id !== id)
    setChats(updatedChats)
    if (currentChat === id) {
      setCurrentChat(updatedChats[0]?.id || null)
    }
    localStorage.setItem('claude_chats', JSON.stringify(updatedChats))
  }

  const renameChat = (id: string, newName: string) => {
    const updatedChats = chats.map(chat => 
      chat.id === id ? { ...chat, name: newName } : chat
    )
    setChats(updatedChats)
    localStorage.setItem('claude_chats', JSON.stringify(updatedChats))
  }

  if (!apiKey) {
    return <ApiKeyInput onSubmit={handleApiKeySubmit} />
  }

  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey)
    localStorage.setItem('claude_api_key', newKey)
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-border">
          <SettingsButton onClick={() => setShowSettings(true)} />
        </div>
        <Sidebar
          chats={chats}
          currentChat={currentChat}
          onChatSelect={setCurrentChat}
          onNewChat={createNewChat}
          onDeleteChat={deleteChat}
          onRenameChat={renameChat}
        />
      </div>
      <div className="flex-1 relative">
        {showSettings && (
          <Settings
            apiKey={apiKey}
            onApiKeyChange={handleApiKeyChange}
            onClose={() => setShowSettings(false)}
          />
        )}
        {currentChat ? (
          <ChatInterface
            apiKey={apiKey}
            chatId={currentChat}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <button
              onClick={createNewChat}
              className="button flex items-center gap-2"
            >
              <Plus size={20} />
              Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
