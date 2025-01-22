'use client';

import { useState } from 'react';

export default function Atendimento() {
  const [activeTab, setActiveTab] = useState('ABERTAS');
  const [mensagem, setMensagem] = useState('');

  return (
    <div className="flex h-screen bg-[#0a192f] text-white">
      {/* Barra Lateral Esquerda */}
      <div className="w-1/4 p-4 border-r border-gray-700">
        <button className="w-full bg-blue-600 py-2 rounded mb-4">NOVO</button>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Filtros</h3>
          <div className="space-y-2">
            <button className="w-full text-left">Todos</button>
            <select className="w-full bg-transparent border border-gray-600 rounded p-1">
              <option>Setores</option>
            </select>
            <select className="w-full bg-transparent border border-gray-600 rounded p-1">
              <option>Tags</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>ATENDENDO</span>
              <span className="bg-blue-600 px-2 rounded">1</span>
            </div>
            <div>AGUARDANDO</div>
          </div>
        </div>

        <input 
          type="text" 
          placeholder="Buscar atendimento e mensagens" 
          className="w-full bg-transparent border border-gray-600 rounded p-1 mb-4"
        />

        <div className="space-y-2">
          {/* Lista de atendimentos */}
          <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded">
            <div>
              <div>#5915</div>
              <div className="text-sm text-gray-400">12:18</div>
              <div className="text-sm text-gray-400">Atribuído a: gwegegwg</div>
              <div className="flex gap-1 mt-1">
                <span className="text-xs bg-blue-600 px-1 rounded">TESTE</span>
                <span className="text-xs bg-green-600 px-1 rounded">GWEGEGWG</span>
                <span className="text-xs bg-red-600 px-1 rounded">SEM SETOR</span>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-400">X</button>
          </div>
        </div>
      </div>

      {/* Área Principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra Superior */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button>←</button>
            <div className="flex gap-4">
              {['ABERTAS', 'RESOLVIDOS', 'GRUPOS'].map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab 
                      ? 'border-b-2 border-blue-500 text-blue-500' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>553491942200 #5915</div>
            <div>Atribuído a: gwegegwg</div>
            <div>Setor: Nenhum</div>
            <button>💬</button>
          </div>
        </div>

        {/* Área de Chat */}
        <div className="flex-1 flex flex-col p-4">
          <div className="text-center text-gray-400 mb-4">18/12/2024</div>
          
          <div className="flex-1 bg-[#112240] rounded-lg p-4 mb-4 space-y-4">
            {/* Exemplo de mensagem */}
            <div className="flex flex-col">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Usuário</span>
                <span>12:18</span>
              </div>
              <div className="bg-[#0a2540] p-2 rounded-lg">
                Mensagem de exemplo
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded">📎</button>
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite uma mensagem"
              className="flex-1 bg-transparent border border-gray-600 rounded p-2 focus:outline-none focus:border-blue-500"
            />
            <button className="p-2 hover:bg-gray-700 rounded">😊</button>
            <button className="p-2 hover:bg-gray-700 rounded">🎙️</button>
          </div>
        </div>
      </div>

      {/* Barra Lateral Direita */}
      <div className="w-1/4 p-4 border-l border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="font-semibold">Opa</div>
          <div className="text-sm text-gray-400">12:18</div>
        </div>

        <div className="space-y-4">
          {/* Ícones de ações/ferramentas */}
          <div className="flex gap-2">
            <button>📋</button>
            <button>🔍</button>
            <button>📊</button>
          </div>
        </div>
      </div>
    </div>
  );
}
