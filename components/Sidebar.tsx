'use client'

import { useState } from 'react'
import { MessageSquare, Plus, Trash2, Edit2 } from 'lucide-react'

interface Chat {
  id: string
  name: string
}

interface SidebarProps {
  chats: Chat[]
  currentChat: string | null
  onChatSelect: (id: string) => void
  onNewChat: () => void
  onDeleteChat: (id: string) => void
  onRenameChat: (id: string, newName: string) => void
}

export default function Sidebar({
  chats,
  currentChat,
  onChatSelect,
  onNewChat,
  onDeleteChat,
  onRenameChat,
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const handleRenameSubmit = (id: string) => {
    if (editName.trim()) {
      onRenameChat(id, editName.trim())
      setEditingId(null)
      setEditName('')
    }
  }

  const startEditing = (chat: Chat) => {
    setEditingId(chat.id)
    setEditName(chat.name)
  }

  return (
    <div className="sidebar">
      <button
        onClick={onNewChat}
        className="button w-full flex items-center justify-center gap-2 mb-4"
      >
        <Plus size={20} />
        New Chat
      </button>

      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`p-2 rounded-lg cursor-pointer hover:bg-secondary transition-colors ${
              currentChat === chat.id ? 'bg-secondary' : ''
            }`}
          >
            {editingId === chat.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleRenameSubmit(chat.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRenameSubmit(chat.id)
                    }
                  }}
                  className="input-field text-sm py-1"
                  autoFocus
                />
              </div>
            ) : (
              <div
                className="flex items-center justify-between"
                onClick={() => onChatSelect(chat.id)}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span className="text-sm truncate">{chat.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      startEditing(chat)
                    }}
                    className="p-1 hover:bg-accent rounded"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteChat(chat.id)
                    }}
                    className="p-1 hover:bg-accent rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
