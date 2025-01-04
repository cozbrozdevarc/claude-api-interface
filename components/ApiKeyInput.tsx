'use client'

import { useState } from 'react'
import { Key } from 'lucide-react'

interface ApiKeyInputProps {
  onSubmit: (key: string) => void
}

export default function ApiKeyInput({ onSubmit }: ApiKeyInputProps) {
  const [key, setKey] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (key.trim()) {
      onSubmit(key.trim())
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Key className="mx-auto h-12 w-12 text-accent" />
          <h2 className="mt-6 text-3xl font-bold">Enter Your API Key</h2>
          <p className="mt-2 text-sm text-gray-400">
            To use this interface, you need an Anthropic API key
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="api-key" className="sr-only">
              API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="input-field"
              placeholder="Enter your Anthropic API key"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="button w-full"
            >
              Save API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
