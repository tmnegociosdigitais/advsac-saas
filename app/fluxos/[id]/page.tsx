'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Flow {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

interface Node {
  id: string;
  type: 'whatsapp' | 'ai' | 'condition' | 'message';
  position: { x: number; y: number };
  data: {
    message?: string;
    phoneNumber?: string;
    template?: string;
    variables?: string[];
    condition?: string;
    aiPrompt?: string;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

const initialNodes = [
  {
    id: 'start',
    type: 'input',
    data: { label: 'Seu fluxo começa aqui' },
    position: { x: 250, y: 25 },
    className: 'bg-background border-2 border-green-500 text-foreground rounded-lg px-4 py-2 shadow-md',
  },
];

const nodeTypes = {
  message: { /* ... */ },
  question: { /* ... */ },
  menu: { /* ... */ },
  condition: { /* ... */ },
};

export default function FluxoPage({ params }: { params: { id: string } }) {
  const { theme } = useTheme();
  const router = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [flowName, setFlowName] = useState('Carregando...');
  const [isEditing, setIsEditing] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  // Simular carregamento do nome do fluxo
  useEffect(() => {
    // Aqui você normalmente faria uma chamada à API
    const mockFlow = {
      id: params.id,
      name: 'Fluxo de Atendimento'
    };
    setFlowName(mockFlow.name);
  }, [params.id]);

  const handleSave = () => {
    setIsOpen(true);
    // Aqui você implementaria a lógica de salvamento
  };

  const nodeCategories = {
    'Mensagens': [
      { id: 'message', label: 'Mensagem', icon: '💬' },
      { id: 'question', label: 'Pergunta', icon: '❓' },
    ],
    'Ações e Fluxos': [
      { id: 'menu', label: 'Menu', icon: '≡' },
      { id: 'menuList', label: 'Menu Lista', icon: '≡' },
      { id: 'buttons', label: 'Botões', icon: '⋮' },
      { id: 'condition', label: 'Condição', icon: '⚡' },
      { id: 'flow', label: 'Fluxo', icon: '⚙️' },
      { id: 'wait', label: 'Espera', icon: '⏲️' },
      { id: 'media', label: 'Mídia', icon: '📁' },
      { id: 'sector', label: 'Setor', icon: '🏢' },
      { id: 'attendant', label: 'Atendente', icon: '👤' },
      { id: 'closeTicket', label: 'Encerrar Ticket', icon: '🔒' },
      { id: 'notification', label: 'Notificação', icon: '🔔' },
      { id: 'tagKanban', label: 'Tag Kanban', icon: '🏷️' },
    ],
  };

  return (
    <div className="h-screen w-full bg-background relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-10 border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/fluxos')}
              className="p-2 hover:bg-accent rounded-full transition-colors duration-200"
              title="Voltar para lista de fluxos"
            >
              <ArrowLeftIcon className="w-5 h-5 text-foreground" />
            </button>
            {isEditing ? (
              <input
                type="text"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditing(false);
                  }
                }}
                className="text-lg font-semibold bg-transparent border-b-2 border-green-500 outline-none px-1 min-w-[200px]"
                autoFocus
              />
            ) : (
              <h1
                onClick={() => setIsEditing(true)}
                className="text-lg font-semibold cursor-pointer hover:text-green-500 transition-colors duration-200"
                title="Clique para editar o nome"
              >
                {flowName}
              </h1>
            )}
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
          >
            Salvar Fluxo
          </button>
        </div>
      </div>

      {/* Flow Editor */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-dots-darker dark:bg-dots-lighter"
      >
        {/* Right Panel */}
        <Panel position="top-right" className="bg-background/95 backdrop-blur-sm rounded-lg mt-16 mr-4 shadow-lg border border-border overflow-hidden">
          <div className="p-3 border-b border-border">
            <h2 className="text-base font-medium">Painel</h2>
          </div>
          <div className="p-4 text-sm text-center text-muted-foreground">
            Selecione um nó para editar a mensagem de texto
          </div>
        </Panel>

        {/* Left Panel - Node Types */}
        <Panel position="top-left" className="bg-background/95 backdrop-blur-sm rounded-lg mt-16 ml-4 shadow-lg border border-border overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-border">
            <h2 className="text-base font-medium">Adicionar Nó</h2>
            <button
              onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
              className={`p-1 hover:bg-accent rounded-full transition-all duration-200 ${isPanelCollapsed ? 'rotate-180' : ''}`}
            >
              <ChevronUpIcon className="w-5 h-5" />
            </button>
          </div>
          
          {!isPanelCollapsed && (
            <>
              <div className="p-3 bg-muted/30 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="animate-bounce">👆</span>
                  <p>Arraste e solte os nós abaixo para criar seu fluxo</p>
                </div>
              </div>
              <div className="p-3 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {Object.entries(nodeCategories).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors duration-200 cursor-grab active:cursor-grabbing"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/reactflow', item.id);
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                        >
                          <span className="w-5 h-5 flex items-center justify-center text-green-500">
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Panel>

        <Background />
        <Controls />
        <MiniMap style={{ background: 'rgb(var(--background))' }} />
      </ReactFlow>

      {/* Save Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <div className="relative bg-background p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-medium mb-4">Salvar Fluxo</Dialog.Title>
          <p>Seu fluxo foi salvo com sucesso!</p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md"
          >
            Fechar
          </button>
        </div>
      </Dialog>
    </div>
  );
}
