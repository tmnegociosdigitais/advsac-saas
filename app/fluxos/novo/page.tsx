'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
    className: 'bg-background border-2 border-primary text-foreground rounded-lg px-4 py-2',
  },
];

export default function NovoFluxoPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [flowName, setFlowName] = useState('Novo Fluxo');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsOpen(true);
    // Aqui você implementaria a lógica de salvamento
  };

  return (
    <div className="h-screen w-full bg-background relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
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
                className="text-xl font-semibold bg-transparent border-b-2 border-primary outline-none px-1 min-w-[200px]"
                autoFocus
              />
            ) : (
              <h1
                onClick={() => setIsEditing(true)}
                className="text-xl font-semibold cursor-pointer hover:text-primary transition-colors duration-200"
                title="Clique para editar o nome"
              >
                {flowName}
              </h1>
            )}
          </div>
          <button
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors duration-200"
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
        fitView
        className="bg-dots-darker dark:bg-dots-lighter"
      >
        <Panel position="top-left" className="bg-background/80 backdrop-blur-sm p-2 rounded-lg mt-20">
          <div className="flex flex-col gap-2">
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Mensagem</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Pergunta</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Menu</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Menu Lista</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Botões</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Condição</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Fluxo</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Espera</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Mídia</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Setor</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Atendente</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Encerrar Ticket</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Notificação</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md flex items-center gap-2">
              <span>Tag Kanban</span>
            </button>
          </div>
        </Panel>
        <Background />
        <Controls />
        <MiniMap />
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
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            Fechar
          </button>
        </div>
      </Dialog>
    </div>
  );
}
