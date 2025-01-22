'use client'

import { PageContainer } from '@/components/page-container'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/ThemeContext'
import { motion } from 'framer-motion'
import { ArrowLeft, Book, Code, Users, Workflow, Bot, Shield, Brain, Building2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'

// Definindo a interface para as versões
interface Version {
  number: string
  status: 'current' | 'coming'
  title: string
  description: string
  releaseDate?: string
  sections: {
    title: string
    description: string
    icon: React.ReactNode | string
    iconColor: string
    iconBg: string
    items: {
      title: string
      description: string
    }[]
  }[]
}

// Mapeamento de versões e suas funcionalidades
const versions: Record<string, Version> = {
  '1.0.0': {
    number: '1.0.0',
    status: 'current',
    title: 'Versão Inicial',
    description: 'Sistema completo de atendimento, CRM e fluxos de trabalho',
    releaseDate: 'Janeiro, 2025',
    sections: [
      {
        title: 'Atendimento ao Cliente',
        description: 'Sistema completo para gerenciar atendimentos',
        icon: 'Users',
        iconColor: "text-blue-500",
        iconBg: "bg-blue-500/10",
        items: [
          {
            title: 'Gestão de Tickets',
            description: 'Organize e priorize atendimentos com sistema de tickets inteligente'
          },
          {
            title: 'Chat em Tempo Real',
            description: 'Comunicação instantânea com clientes integrada ao sistema'
          },
          {
            title: 'Histórico de Interações',
            description: 'Acesso completo ao histórico de comunicações com cada cliente'
          }
        ]
      },
      {
        title: 'CRM Especializado',
        description: 'CRM desenvolvido especialmente para escritórios de advocacia',
        icon: 'Book',
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-500/10",
        items: [
          {
            title: 'Gestão de Clientes',
            description: 'Cadastro completo com informações relevantes para área jurídica'
          },
          {
            title: 'Processos e Casos',
            description: 'Acompanhamento detalhado de processos e casos jurídicos'
          },
          {
            title: 'Agenda Integrada',
            description: 'Calendário de compromissos, audiências e prazos'
          }
        ]
      },
      {
        title: 'Construtor de Fluxos',
        description: 'Automatize processos com fluxos de trabalho personalizados',
        icon: 'Workflow',
        iconColor: "text-purple-500",
        iconBg: "bg-purple-500/10",
        items: [
          {
            title: 'Editor Visual',
            description: 'Interface drag-and-drop para criar fluxos de trabalho'
          },
          {
            title: 'Automação de Tarefas',
            description: 'Automatize tarefas repetitivas e processos padronizados'
          },
          {
            title: 'Regras Personalizadas',
            description: 'Defina condições e ações para cada etapa do fluxo'
          }
        ]
      }
    ]
  },
  '1.1.0': {
    number: '1.1.0',
    status: 'coming',
    title: 'Inteligência Artificial',
    description: 'Recursos avançados de IA para otimizar seu trabalho',
    sections: [
      {
        title: 'Chatbot Inteligente',
        description: 'Assistente virtual com IA para suporte e atendimento',
        icon: 'Bot',
        iconColor: "text-sky-500",
        iconBg: "bg-sky-500/10",
        items: [
          {
            title: 'Atendimento 24/7',
            description: 'Suporte automatizado disponível a qualquer momento'
          },
          {
            title: 'Respostas Contextuais',
            description: 'IA que entende o contexto e fornece respostas precisas'
          },
          {
            title: 'Integração com Base de Conhecimento',
            description: 'Acesso à documentação e procedimentos do escritório'
          }
        ]
      },
      {
        title: 'Geração de Documentos',
        description: 'Crie documentos jurídicos automaticamente com IA',
        icon: 'Code',
        iconColor: "text-purple-500",
        iconBg: "bg-purple-500/10",
        items: [
          {
            title: 'Templates Inteligentes',
            description: 'Modelos que se adaptam ao contexto e tipo de documento'
          },
          {
            title: 'Preenchimento Automático',
            description: 'IA identifica e preenche campos relevantes automaticamente'
          },
          {
            title: 'Revisão Assistida',
            description: 'Sugestões de melhorias e correções em tempo real'
          }
        ]
      },
      {
        title: 'Análise de Documentos',
        description: 'Análise automática de documentos jurídicos',
        icon: 'Shield',
        iconColor: "text-red-500",
        iconBg: "bg-red-500/10",
        items: [
          {
            title: 'Extração de Dados',
            description: 'Identificação automática de informações relevantes'
          },
          {
            title: 'Classificação',
            description: 'Categorização automática de documentos por tipo e conteúdo'
          },
          {
            title: 'Análise de Risco',
            description: 'Avaliação automática de riscos e pontos críticos'
          }
        ]
      }
    ]
  }
}

export default function DocumentacaoPage({
  params
}: {
  params: { version: string }
}) {
  const { theme } = useTheme()
  const version = versions[params.version]

  // Se a versão não existir, redireciona para 404
  if (!version) {
    notFound()
  }

  return (
    <PageContainer
      header={{
        title: `Documentação ${version.number}`,
        description: version.description
      }}
    >
      {/* Logo e Botão Voltar */}
      <div className="flex flex-col items-center mb-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={theme === 'light' ? '/logo-dark.png' : '/logo-light.png'}
            alt="ADVSac Logo"
            width={200}
            height={60}
            className="transition-all duration-300 hover:scale-105"
            priority
          />
        </motion.div>

        <div className="flex items-center gap-4">
          <Link href="/novidades">
            <Button
              variant="ghost"
              className={cn(
                "gap-2",
                theme === 'light' 
                  ? "text-[#1e293b] hover:bg-[#1e293b]/5" 
                  : "text-white hover:bg-white/5"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Novidades
            </Button>
          </Link>

          <Badge variant="outline" className={cn(
            version.status === 'current'
              ? theme === 'light'
                ? "bg-green-500/10 text-green-600 border-green-200"
                : "bg-green-500/20 text-green-400 border-green-800"
              : theme === 'light'
                ? "bg-purple-500/10 text-purple-600 border-purple-200"
                : "bg-purple-500/20 text-purple-400 border-purple-800"
          )}>
            {version.status === 'current' ? 'Versão Atual' : 'Em Breve'}
          </Badge>
        </div>
      </div>

      {/* Informações da Versão */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className={cn(
          "p-6 rounded-xl border",
          theme === 'light'
            ? "bg-white border-gray-200"
            : "bg-[#0a192f] border-gray-800"
        )}>
          <h1 className={cn(
            "text-2xl font-semibold mb-2",
            theme === 'light' ? "text-gray-900" : "text-white"
          )}>
            {version.title}
          </h1>
          <p className={cn(
            "text-lg",
            theme === 'light' ? "text-gray-600" : "text-gray-400"
          )}>
            {version.description}
          </p>
          {version.releaseDate && (
            <p className={cn(
              "text-sm mt-2",
              theme === 'light' ? "text-gray-500" : "text-gray-500"
            )}>
              Lançamento: {version.releaseDate}
            </p>
          )}
        </div>
      </motion.div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {version.sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="group"
          >
            <div className={cn(
              "rounded-lg border transition-all duration-200",
              theme === 'light'
                ? "bg-white hover:bg-gray-50/50 hover:border-gray-200"
                : "bg-[#0a192f] hover:bg-[#0a192f]/80 border-gray-800 hover:border-gray-700",
              section.iconColor === "text-blue-500"
                ? "hover:shadow-blue-500/30 hover:shadow-xl dark:hover:shadow-blue-500/20"
                : section.iconColor === "text-emerald-500"
                  ? "hover:shadow-emerald-500/30 hover:shadow-xl dark:hover:shadow-emerald-500/20"
                  : section.iconColor === "text-amber-500"
                    ? "hover:shadow-amber-500/30 hover:shadow-xl dark:hover:shadow-amber-500/20"
                    : section.iconColor === "text-purple-500"
                      ? "hover:shadow-purple-500/30 hover:shadow-xl dark:hover:shadow-purple-500/20"
                      : "hover:shadow-gray-500/30 hover:shadow-xl dark:hover:shadow-gray-500/20"
            )}>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className={cn(
                    "p-3 rounded-xl shrink-0 transition-colors",
                    section.iconBg,
                    theme === 'light'
                      ? "group-hover:bg-opacity-70"
                      : "group-hover:bg-opacity-30"
                  )}>
                    <div className={section.iconColor}>
                      {typeof section.icon === 'string' ? (
                        section.icon === 'Brain' ? <Brain className="w-6 h-6" /> :
                        section.icon === 'Building2' ? <Building2 className="w-6 h-6" /> :
                        section.icon === 'Users' ? <Users className="w-6 h-6" /> :
                        section.icon === 'Book' ? <Book className="w-6 h-6" /> :
                        section.icon === 'Code' ? <Code className="w-6 h-6" /> :
                        section.icon === 'Workflow' ? <Workflow className="w-6 h-6" /> :
                        <Bot className="w-6 h-6" />
                      ) : (
                        section.icon
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className={cn(
                      "text-xl font-semibold mb-2",
                      theme === 'light' ? "text-gray-900" : "text-white"
                    )}>
                      {section.title}
                    </h2>
                    <p className={cn(
                      "text-sm mb-4",
                      theme === 'light' ? "text-gray-600" : "text-gray-400"
                    )}>
                      {section.description}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {section.items.map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (i * 0.05) }}
                          className={cn(
                            "p-4 rounded-lg transition-colors",
                            theme === 'light'
                              ? "hover:bg-gray-50/80"
                              : "hover:bg-[#112240]"
                          )}
                        >
                          <h3 className={cn(
                            "text-sm font-medium mb-1",
                            theme === 'light' ? "text-gray-900" : "text-white"
                          )}>
                            {item.title}
                          </h3>
                          <p className={cn(
                            "text-sm leading-relaxed",
                            theme === 'light' ? "text-gray-600" : "text-gray-400"
                          )}>
                            {item.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  )
}
