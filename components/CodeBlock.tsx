'use client'
import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4 rounded-lg bg-[#1a1a1a] overflow-hidden">
      {language && (
        <div className="px-4 py-2 bg-[#2d2d2d] text-sm text-gray-400">
          {language}
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto font-mono text-sm">
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-lg bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  )
}

export function formatMessage(content: string) {
  const parts: React.ReactNode[] = []
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g
  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {content.slice(lastIndex, match.index)}
        </span>
      )
    }

    const [, language, code] = match
    parts.push(
      <CodeBlock
        key={`code-${match.index}`}
        code={code.trim()}
        language={language || undefined}
      />
    )

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    parts.push(
      <span key={`text-${lastIndex}`}>
        {content.slice(lastIndex)}
      </span>
    )
  }

  return parts.length > 0 ? parts : content
}
