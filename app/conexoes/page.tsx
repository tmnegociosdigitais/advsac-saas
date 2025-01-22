'use client'

import { QrCode, Smartphone, CheckCircle2, XCircle } from 'lucide-react'
import Image from 'next/image'

export default function ConexoesPage() {
  return (
    <div className="p-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <QrCode className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Conexões WhatsApp</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie suas conexões do WhatsApp e integre números ao sistema
        </p>
      </div>

      {/* Área de QR Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Painel de Nova Conexão */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Nova Conexão
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white rounded-lg">
                  <Image
                    src="/qr-placeholder.png"
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="animate-pulse"
                  />
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Escaneie o QR Code com o WhatsApp que deseja conectar
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Conectado</span>
              <span className="text-green-500">• Online</span>
            </div>
          </div>
        </div>

        {/* Lista de Conexões */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Conexões Ativas</h2>

          <div className="space-y-3">
            {/* Item de Conexão */}
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">+55 34 99123-4567</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Última conexão: 18/12/2024 12:34
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-green-500">Online</span>
              </div>
            </div>

            {/* Item Desconectado */}
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">+55 34 98765-4321</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Última conexão: 17/12/2024 18:45
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500">Desconectado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
