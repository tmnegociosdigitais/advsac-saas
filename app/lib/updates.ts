/**
 * Utilitário para gerenciar as novidades e atualizações do sistema
 * 
 * Este módulo é responsável por:
 * 1. Definir os tipos e interfaces para as estruturas de dados
 * 2. Processar e validar os dados do arquivo JSON
 * 3. Converter strings de ícones em componentes React
 */

import { Zap, Star, Clock, Layers, Bot, Brain, Building2 } from 'lucide-react'

/**
 * Mapeamento de nomes de ícones para componentes React
 * Para adicionar um novo ícone:
 * 1. Importe o ícone de 'lucide-react'
 * 2. Adicione-o aqui com um comentário descritivo
 * 3. Atualize a documentação em updates.json
 */
const iconMap = {
  Zap,    // Usado para atualizações de funcionalidades
  Star,   // Usado para dicas e recursos destacados
  Clock,  // Usado para anúncios de tempo/manutenção
  Layers, // Usado para versões do sistema
  Bot,    // Usado para recursos de IA/automação
  Brain,  // Usado para recursos de Deep Learning/IA
  Building2 // Usado para sistema completo/enterprise
}

/**
 * Interface para itens de notificação
 * Exemplos de uso podem ser encontrados em updates.json
 */
export type NewsItem = {
  /** Título curto e descritivo */
  title: string
  /** Descrição clara do conteúdo */
  description: string
  /** Data no formato 'DD MMM, YYYY' */
  date: string
  /** Tipo da notificação */
  type: 'update' | 'tip' | 'announcement'
  /** Nome do ícone do objeto iconMap */
  icon: keyof typeof iconMap
}

/**
 * Interface para cards de versão
 * Exemplos de uso podem ser encontrados em updates.json
 */
export type UpdateCard = {
  /** Nome da versão (ex: "1.0.0") */
  title: string
  /** Descrição principal da versão */
  description: string
  /** Nome do ícone do objeto iconMap */
  icon: keyof typeof iconMap
  /** Cor do ícone em classes Tailwind */
  iconColor: string
  /** Cor de fundo do ícone em classes Tailwind */
  iconBg: string
  /** Lista de funcionalidades da versão */
  features: string[]
  /** Link para documentação da versão */
  href: string
  /** Status da versão */
  status: 'current' | 'coming'
}

/** Interface para a estrutura completa de dados */
export type UpdatesData = {
  news: NewsItem[]
  updates: UpdateCard[]
}

/**
 * Carrega e processa os dados do arquivo updates.json
 * @returns {UpdatesData} Dados processados com componentes React
 * 
 * @example
 * ```typescript
 * const { news, updates } = getUpdatesData()
 * ```
 */
export function getUpdatesData(): UpdatesData {
  // Importa os dados do JSON
  const data = require('../data/updates.json')
  
  // Processa as notificações
  const processedNews = data.news.map((item: NewsItem) => ({
    ...item,
    // Não vamos mais converter o ícone aqui, apenas passar o nome
    icon: item.icon
  }))

  // Processa as versões
  const processedUpdates = data.updates.map((item: UpdateCard) => ({
    ...item,
    // Não vamos mais converter o ícone aqui, apenas passar o nome
    icon: item.icon
  }))

  return {
    news: processedNews,
    updates: processedUpdates
  }
}
