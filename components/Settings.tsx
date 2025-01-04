'use client'

import { useState } from 'react'
import { Settings as SettingsIcon, X } from 'lucide-react'

interface SettingsProps {
  apiKey: string
  onApiKeyChange: (key: string) => void
  onClose: () => void
}

export default function Settings({ apiKey, onApiKeyChange, onClose }: SettingsProps) {
  const [newApiKey, setNewApiKey] = useState(apiKey)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newApiKey.trim()) {
      onApiKeyChange(newApiKey.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-primary p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-accent"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium mb-2">
              API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="input-field"
              placeholder="Enter your Anthropic API key"
            />
          </div>
          
          <button type="submit" className="button w-full">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

export function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-secondary rounded-lg transition-colors"
      title="Settings"
    >
      <SettingsIcon size={20} />
    </button>
  )
}
