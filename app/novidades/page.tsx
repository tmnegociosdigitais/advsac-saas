/**
 * Página de Novidades do ADVSac
 * 
 * Esta página exibe as últimas atualizações e versões do sistema, organizada em duas seções principais:
 * 1. Atualizações Recentes: Cards com notícias e dicas
 * 2. Versões do Sistema: Cards detalhando as versões atual e futura
 * 
 * Características visuais:
 * - Efeitos de hover com scale e sombras coloridas
 * - Sombras que correspondem às cores dos ícones
 * - Layout responsivo para diferentes tamanhos de tela
 * - Animações suaves usando framer-motion
 */

'use client'

import { PageContainer } from '@/components/page-container'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/ThemeContext'
import { motion } from 'framer-motion'
import { ArrowLeft, Bot, Brain, Building2, Star, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getUpdatesData } from '../lib/updates'

/**
 * Componente principal da página de Novidades
 */
export default function NovidadesPage() {
  const { theme } = useTheme()
  const { news, updates } = getUpdatesData()

  return (
    <PageContainer
      header={{
        title: "Bem-vindo ao ADVSac",
        description: "Explore as últimas atualizações, recursos e melhorias do seu sistema jurídico inteligente. Mantenha-se atualizado com todas as novidades que tornam seu trabalho mais eficiente."
      }}
    >
      {/* Logo com animação de entrada e hover */}
      <div className="flex flex-col items-center mb-8 md:mb-12">
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
      </div>

      {/* Container principal com largura máxima e padding responsivo */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-12">
          {/* Seção: Atualizações Recentes */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 dark:text-white">
              Atualizações Recentes
            </h2>

            {/* Grid de cards de notícias */}
            <div className="grid gap-4 md:gap-6">
              {news.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  {/* Card com sombra colorida baseada no tipo */}
                  <Card className={cn(
                    "transition-all duration-200 border border-transparent",
                    theme === 'light'
                      ? "bg-white hover:bg-gray-50/50 hover:border-gray-200"
                      : "bg-[#0a192f] hover:bg-[#0a192f]/80 hover:border-gray-800",
                    item.type === 'update'
                      ? "hover:shadow-blue-500/30 hover:shadow-xl dark:hover:shadow-blue-500/20"
                      : item.type === 'tip'
                        ? "hover:shadow-amber-500/30 hover:shadow-xl dark:hover:shadow-amber-500/20"
                        : "hover:shadow-purple-500/30 hover:shadow-xl dark:hover:shadow-purple-500/20"
                  )}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Ícone com background colorido */}
                        <div className={cn(
                          "p-4 rounded-2xl shrink-0 transition-colors",
                          item.type === 'update' 
                            ? "bg-blue-500/10 group-hover:bg-blue-500/20" 
                            : item.type === 'tip' 
                              ? "bg-amber-500/10 group-hover:bg-amber-500/20"
                              : "bg-purple-500/10 group-hover:bg-purple-500/20"
                        )}>
                          {item.type === 'update' ? <Zap className={cn(
                            "w-6 h-6",
                            "text-blue-500"
                          )} /> : item.type === 'tip' ? <Star className={cn(
                            "w-6 h-6",
                            "text-amber-500"
                          )} /> : <Bot className={cn(
                            "w-6 h-6",
                            "text-purple-500"
                          )} />}
                        </div>
                        {/* Conteúdo do card */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                            <h3 className="text-lg font-medium dark:text-white line-clamp-1">
                              {item.title}
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {item.date}
                            </span>
                          </div>
                          <p className="mt-2 text-base text-gray-600 dark:text-gray-300 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Seção: Versões do Sistema */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 dark:text-white">
              Versões do Sistema
            </h2>

            {/* Grid de cards de versões */}
            <div className="grid gap-4 md:gap-6">
              {updates.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  {/* Card com sombra colorida baseada no ícone */}
                  <Card className={cn(
                    "transition-all duration-200 border border-transparent h-full",
                    theme === 'light'
                      ? "bg-white hover:bg-gray-50/50 hover:border-gray-200"
                      : "bg-[#0a192f] hover:bg-[#0a192f]/80 hover:border-gray-800",
                    item.iconColor === 'text-blue-500'
                      ? "hover:shadow-blue-500/30 hover:shadow-xl dark:hover:shadow-blue-500/20"
                      : item.iconColor === 'text-amber-500'
                        ? "hover:shadow-amber-500/30 hover:shadow-xl dark:hover:shadow-amber-500/20"
                        : "hover:shadow-purple-500/30 hover:shadow-xl dark:hover:shadow-purple-500/20"
                  )}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Ícone com background colorido */}
                        <div className={cn(
                          "p-4 rounded-2xl shrink-0 transition-colors",
                          item.iconBg,
                          theme === 'light'
                            ? "group-hover:bg-opacity-70"
                            : "group-hover:bg-opacity-30"
                        )}>
                          <div className={item.iconColor}>
                            {item.icon === 'Zap' ? <Zap className="w-6 h-6" /> : 
                             item.icon === 'Star' ? <Star className="w-6 h-6" /> : 
                             item.icon === 'Brain' ? <Brain className="w-6 h-6" /> : 
                             item.icon === 'Building2' ? <Building2 className="w-6 h-6" /> : 
                             <Bot className="w-6 h-6" />}
                          </div>
                        </div>
                        {/* Conteúdo do card */}
                        <div className="flex-1 min-w-0">
                          {/* Cabeçalho com título e badge de status */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
                            <h3 className="text-lg font-medium dark:text-white line-clamp-1">
                              {item.title}
                            </h3>
                            <Badge variant={item.status === 'current' ? 'default' : 'secondary'} className="w-fit">
                              {item.status === 'current' ? 'Versão Atual' : 'Em Breve'}
                            </Badge>
                          </div>
                          {/* Descrição da versão */}
                          <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                          {/* Lista de features */}
                          <ul className="space-y-2 mb-6">
                            {item.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                              >
                                <div className="mr-2 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          {/* Link para documentação */}
                          <Link 
                            href={item.href}
                            className={cn(
                              "inline-flex items-center text-sm font-medium transition-colors",
                              theme === 'light'
                                ? "text-blue-600 hover:text-blue-700"
                                : "text-blue-400 hover:text-blue-300"
                            )}
                          >
                            Saiba mais
                            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  )
}
