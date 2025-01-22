'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function APIPage() {
  const [openAIKey, setOpenAIKey] = useState('')
  const [googleAIKey, setGoogleAIKey] = useState('')
  const [anthropicKey, setAnthropicKey] = useState('')

  const handleSave = async () => {
    // Implementar lógica de salvamento
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de API de IA</CardTitle>
          <CardDescription>
            Configure as chaves de API para integração com diferentes provedores de IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OpenAI */}
          <div className="space-y-2">
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <Input
              id="openai-key"
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>

          {/* Google AI */}
          <div className="space-y-2">
            <Label htmlFor="google-ai-key">Google AI API Key</Label>
            <Input
              id="google-ai-key"
              type="password"
              value={googleAIKey}
              onChange={(e) => setGoogleAIKey(e.target.value)}
              placeholder="AIza..."
            />
          </div>

          {/* Anthropic */}
          <div className="space-y-2">
            <Label htmlFor="anthropic-key">Anthropic API Key</Label>
            <Input
              id="anthropic-key"
              type="password"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              placeholder="sk-ant-..."
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
