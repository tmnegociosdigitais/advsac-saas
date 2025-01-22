'use client'

import { PageContainer } from '@/components/page-container'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/ThemeContext'
import { motion } from 'framer-motion'
import { ArrowLeft, Book, Code, Users, Workflow, Bot, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface DocSection {
  title: string
  description: string
  icon: React.ReactNode
  iconColor: string
  iconBg: string
  items: {
    title: string
    description: string
  }[]
}

const sections: DocSection[] = [
  {
    title: 'Atendimento ao Cliente',
    description: 'Sistema completo para gerenciar atendimentos',
    icon: <Users className="w-6 h-6" />,
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
    icon: <Book className="w-6 h-6" />,
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
    icon: <Workflow className="w-6 h-6" />,
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
  },
  {
    title: 'Integrações',
    description: 'Conecte-se com outros sistemas e serviços',
    icon: <Code className="w-6 h-6" />,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    items: [
      {
        title: 'APIs Jurídicas',
        description: 'Integração com tribunais e sistemas jurídicos'
      },
      {
        title: 'Serviços Externos',
        description: 'Conexão com ferramentas de produtividade e comunicação'
      },
      {
        title: 'Webhooks',
        description: 'Notificações em tempo real de eventos importantes'
      }
    ]
  },
  {
    title: 'Inteligência Artificial',
    description: 'Recursos avançados de IA para otimizar seu trabalho',
    icon: <Bot className="w-6 h-6" />,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    items: [
      {
        title: 'Análise Preditiva',
        description: 'Previsões e insights baseados em dados históricos'
      },
      {
        title: 'Classificação Automática',
        description: 'Categorização inteligente de documentos e casos'
      },
      {
        title: 'Sugestões Inteligentes',
        description: 'Recomendações contextuais durante o trabalho'
      }
    ]
  },
  {
    title: 'Segurança',
    description: 'Proteção avançada para seus dados',
    icon: <Shield className="w-6 h-6" />,
    iconColor: "text-red-500",
    iconBg: "bg-red-500/10",
    items: [
      {
        title: 'Controle de Acesso',
        description: 'Gerenciamento granular de permissões de usuários'
      },
      {
        title: 'Criptografia',
        description: 'Dados sensíveis protegidos com criptografia de ponta'
      },
      {
        title: 'Auditoria',
        description: 'Registro detalhado de todas as ações no sistema'
      }
    ]
  }
]

export default function DocumentacaoPage() {
  const { theme } = useTheme()

  return (
    <PageContainer
      header={{
        title: "Documentação",
        description: "Guia completo de funcionalidades do AdvSac 1.0"
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
            alt="AdvSac Logo"
            width={200}
            height={60}
            className="transition-all duration-300 hover:scale-105"
            priority
          />
        </motion.div>
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
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
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
                ? "hover:shadow-blue-500/30 hover:shadow-xl"
                : section.iconColor === "text-emerald-500"
                  ? "hover:shadow-emerald-500/30 hover:shadow-xl"
                  : section.iconColor === "text-amber-500"
                    ? "hover:shadow-amber-500/30 hover:shadow-xl"
                    : section.iconColor === "text-purple-500"
                      ? "hover:shadow-purple-500/30 hover:shadow-xl"
                      : "hover:shadow-gray-500/30 hover:shadow-xl"
            )}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-xl shrink-0 transition-colors",
                    section.iconBg,
                    theme === 'light'
                      ? "group-hover:bg-opacity-70"
                      : "group-hover:bg-opacity-30"
                  )}>
                    <div className={section.iconColor}>
                      {section.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className={cn(
                      "text-xl font-semibold mb-1",
                      theme === 'light' ? "text-gray-900" : "text-white"
                    )}>
                      {section.title}
                    </h2>
                    <p className={cn(
                      "text-sm",
                      theme === 'light' ? "text-gray-600" : "text-gray-400"
                    )}>
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (i * 0.05) }}
                      className={cn(
                        "p-4 rounded-lg transition-colors",
                        theme === 'light'
                          ? "hover:bg-gray-50"
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
          </motion.div>
        ))}
      </div>
    </PageContainer>
  )
}
