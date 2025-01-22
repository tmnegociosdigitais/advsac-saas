'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { 
  PencilIcon, 
  TrashIcon, 
  ArrowPathIcon, 
  Cog6ToothIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

interface Flow {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
}

interface FlowConfig {
  businessHours: {
    days: { day: string; selected: boolean; }[];
  };
  keywords: {
    keyword: string;
    type: 'igual' | 'contem' | 'comeca' | 'termina';
    caseSensitive: boolean;
  }[];
  menuSendCount: string;
  isActive: boolean;
}

const mockFlows: Flow[] = [
  {
    id: '1',
    name: 'Fluxo de Atendimento',
    createdAt: '2025-01-15T12:00:00',
    updatedAt: '2025-01-15T14:30:00',
    status: 'active',
  },
  {
    id: '2',
    name: 'Fluxo de Vendas',
    createdAt: '2025-01-14T10:00:00',
    updatedAt: '2025-01-15T09:15:00',
    status: 'inactive',
  },
];

export default function FluxosPage() {
  const [flows, setFlows] = useState<Flow[]>(mockFlows);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [flowConfig, setFlowConfig] = useState<FlowConfig>({
    businessHours: {
      days: [
        { day: 'Segunda', selected: false },
        { day: 'Terça', selected: false },
        { day: 'Quarta', selected: false },
        { day: 'Quinta', selected: false },
        { day: 'Sexta', selected: false },
        { day: 'Sábado', selected: false },
        { day: 'Domingo', selected: false },
      ],
    },
    keywords: [],
    menuSendCount: '1',
    isActive: true
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedType, setSelectedType] = useState<'igual' | 'contem' | 'comeca' | 'termina'>('igual');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const handleDelete = () => {
    if (selectedFlowId) {
      setFlows(flows.filter(flow => flow.id !== selectedFlowId));
      setIsDeleteModalOpen(false);
      setSelectedFlowId(null);
    }
  };

  const handleStatusToggle = (flowId: string) => {
    setFlows(flows.map(flow => 
      flow.id === flowId 
        ? { ...flow, status: flow.status === 'active' ? 'inactive' : 'active' }
        : flow
    ));
  };

  const handleImportFlow = () => {
    setIsImporting(true);
    // Simular importação
    setTimeout(() => {
      setIsImporting(false);
    }, 1500);
  };

  const handleDownloadFlow = (flowId: string) => {
    try {
      const flow = flows.find(f => f.id === flowId);
      if (!flow) return;

      const jsonString = JSON.stringify(flow, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Criar um elemento <a> temporário para download
      const link = document.createElement('a');
      link.href = url;
      link.download = `flow-${flowId}.json`;
      document.body.appendChild(link);
      link.click();
      
      // Limpar
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar o fluxo:', error);
      // Adicionar feedback visual de erro aqui se necessário
    }
  };

  const handleDuplicateFlow = (flowId: string) => {
    const flowToDuplicate = flows.find(f => f.id === flowId);
    if (flowToDuplicate) {
      const newFlow = {
        ...flowToDuplicate,
        id: Date.now().toString(),
        name: `${flowToDuplicate.name} (Cópia)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setFlows([...flows, newFlow]);
    }
  };

  const handleOpenConfig = (flowId: string) => {
    setSelectedFlowId(flowId);
    setIsConfigModalOpen(true);
  };

  const handleDayToggle = (index: number) => {
    const newDays = [...flowConfig.businessHours.days];
    newDays[index].selected = !newDays[index].selected;
    setFlowConfig({
      ...flowConfig,
      businessHours: { ...flowConfig.businessHours, days: newDays },
    });
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setFlowConfig({
        ...flowConfig,
        keywords: [
          ...flowConfig.keywords,
          {
            keyword: newKeyword.trim(),
            type: selectedType,
            caseSensitive: caseSensitive,
          },
        ],
      });
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFlowConfig({
      ...flowConfig,
      keywords: flowConfig.keywords.filter((_, i) => i !== index),
    });
  };

  const handleSaveConfig = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    setIsConfigModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Fluxos</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button 
            onClick={handleImportFlow}
            disabled={isImporting}
            className="w-full sm:w-auto bg-pink-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isImporting ? (
              <>
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                <span className="whitespace-nowrap">Importando...</span>
              </>
            ) : (
              'Importar Fluxo'
            )}
          </button>
          <Link 
            href="/fluxos/novo" 
            className="w-full sm:w-auto bg-green-500 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md hover:bg-green-600 transition-all duration-200 text-center whitespace-nowrap"
          >
            Criar Fluxo
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow divide-y divide-border">
        {flows.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-muted-foreground">
            <p className="text-base sm:text-lg mb-2">Nenhum fluxo encontrado</p>
            <p className="text-sm sm:text-base">Crie um novo fluxo para começar a automatizar seus atendimentos</p>
          </div>
        ) : (
          flows.map((flow) => (
            <div
              key={flow.id}
              className="p-3 sm:p-4 hover:bg-accent/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-medium text-foreground truncate">{flow.name}</h3>
                    <span 
                      className={`px-2 py-0.5 text-xs sm:text-sm rounded-full whitespace-nowrap ${
                        flow.status === 'active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {flow.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 mt-1 text-xs sm:text-sm text-muted-foreground">
                    <span title="Data de criação" className="whitespace-nowrap">Criado em: {new Date(flow.createdAt).toLocaleDateString('pt-BR')}</span>
                    <span className="hidden sm:inline">•</span>
                    <span title="Última atualização" className="whitespace-nowrap">Atualizado em: {new Date(flow.updatedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <Link
                    href={`/fluxos/${flow.id}`}
                    className="p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors duration-200 group"
                    title="Editar fluxo"
                  >
                    <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedFlowId(flow.id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors duration-200 group"
                    title="Excluir fluxo"
                  >
                    <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-red-500" />
                  </button>
                  <button
                    onClick={() => handleDownloadFlow(flow.id)}
                    className="p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors duration-200 group"
                    title="Baixar JSON do fluxo"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground" />
                  </button>
                  <button
                    onClick={() => handleDuplicateFlow(flow.id)}
                    className="p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors duration-200 group"
                    title="Duplicar fluxo"
                  >
                    <DocumentDuplicateIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground" />
                  </button>
                  <button
                    onClick={() => handleOpenConfig(flow.id)}
                    className="p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors duration-200 group"
                    title="Configurações do fluxo"
                  >
                    <Cog6ToothIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog
        open={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <div className="relative bg-background rounded-lg shadow-lg w-[95%] sm:w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background p-3 sm:p-4 border-b border-border flex justify-between items-center">
            <Dialog.Title className="text-base sm:text-xl font-semibold">
              Configurações do Fluxo
            </Dialog.Title>
            <button
              onClick={() => setIsConfigModalOpen(false)}
              className="p-1.5 hover:bg-accent rounded-full transition-colors duration-200"
            >
              <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="p-3 sm:p-6 space-y-4 sm:space-y-8">
            <div className="bg-accent/5 p-3 sm:p-4 rounded-lg">
              <h3 className="text-sm sm:text-base font-medium mb-3 sm:mb-4">Status do Fluxo</h3>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flowConfig.isActive}
                    onChange={(e) => {
                      setFlowConfig({ ...flowConfig, isActive: e.target.checked });
                      if (selectedFlowId) {
                        setFlows(flows.map(flow => 
                          flow.id === selectedFlowId 
                            ? { ...flow, status: e.target.checked ? 'active' : 'inactive' }
                            : flow
                        ));
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-accent peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className="text-xs sm:text-sm font-medium">
                  {flowConfig.isActive ? 'Fluxo ativo' : 'Fluxo inativo'}
                </span>
              </div>
            </div>

            <div className="bg-accent/5 p-3 sm:p-4 rounded-lg">
              <h3 className="text-sm sm:text-base font-medium mb-3 sm:mb-4">Horário de Expediente</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {flowConfig.businessHours.days.map((day, index) => (
                  <label
                    key={day.day}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={day.selected}
                      onChange={(e) => handleDayToggle(index)}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-accent text-green-500 focus:ring-green-500"
                    />
                    <span className="text-xs sm:text-sm group-hover:text-green-500 transition-colors">
                      {day.day}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-accent/5 p-3 sm:p-4 rounded-lg">
              <h3 className="text-sm sm:text-base font-medium mb-3 sm:mb-4">Palavras-chave</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {flowConfig.keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 sm:gap-2 bg-background px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm"
                    >
                      <span>{keyword.keyword}</span>
                      <button
                        onClick={() => handleRemoveKeyword(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <XMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Digite uma palavra-chave"
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-background border border-input rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full sm:w-auto px-2.5 sm:px-3 py-1.5 sm:py-2 bg-background border border-input rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="igual">Igual</option>
                    <option value="contem">Contém</option>
                    <option value="comeca">Começa com</option>
                    <option value="termina">Termina com</option>
                  </select>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={caseSensitive}
                      onChange={(e) => setCaseSensitive(e.target.checked)}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-accent text-green-500 focus:ring-green-500"
                    />
                    <span className="text-xs sm:text-sm whitespace-nowrap">
                      Sensível a Maiúsculas
                    </span>
                  </label>
                  <button
                    onClick={handleAddKeyword}
                    disabled={!newKeyword}
                    className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500 text-white text-xs sm:text-sm rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 p-3 sm:p-4 rounded-lg">
              <h3 className="text-sm sm:text-base font-medium mb-3 sm:mb-4">Quantidade de Envio do Menu</h3>
              <input
                type="number"
                min="1"
                value={flowConfig.menuSendCount}
                onChange={(e) => setFlowConfig({ ...flowConfig, menuSendCount: e.target.value })}
                className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-background border border-input rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="sticky bottom-0 z-10 bg-background p-3 sm:p-4 border-t border-border flex justify-end gap-2 sm:gap-3">
            <button
              onClick={() => setIsConfigModalOpen(false)}
              className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md border border-input hover:bg-accent transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveConfig}
              className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
            >
              Salvar
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <div className="relative bg-background p-4 sm:p-6 rounded-lg shadow-lg w-[90%] max-w-md mx-auto">
          <div className="flex flex-col gap-4">
            <Dialog.Title className="text-base sm:text-lg font-medium">
              Excluir Fluxo
            </Dialog.Title>
            <p className="text-sm sm:text-base text-muted-foreground">
              Tem certeza que deseja excluir este fluxo? Esta ação não pode ser desfeita.
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md border border-input hover:bg-accent transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
