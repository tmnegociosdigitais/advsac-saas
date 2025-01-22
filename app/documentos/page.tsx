'use client'

import { Settings, FileText } from 'lucide-react'

export default function DocumentosPage() {
  return (
    <div className="p-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Documentos</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Crie documentos jurídicos automaticamente com ajuda da nossa IA. Escolha o tipo de documento e deixe a IA fazer o trabalho pesado para você.
        </p>
      </div>

      {/* Cards de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Petição Inicial */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold">Escreva uma Petição Inicial ✨</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A IA irá escrever uma petição baseada nos dados que você fornecer.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Petições personalizadas</li>
            <li>• Formatação automática</li>
            <li>• Base legal atualizada</li>
          </ul>
        </div>

        {/* Card Parecer Jurídico */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
              <FileText className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold">Escreva um Parecer Jurídico ✨</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A IA irá escrever um parecer jurídico baseado nos dados que você fornecer.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Análise detalhada</li>
            <li>• Fundamentação jurídica</li>
            <li>• Conclusões objetivas</li>
          </ul>
        </div>

        {/* Card Contrato */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold">Escreva seu Contrato ✨</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A IA irá escrever um contrato baseado nos dados que você fornecer.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Cláusulas customizadas</li>
            <li>• Termos atualizados</li>
            <li>• Revisão automática</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
