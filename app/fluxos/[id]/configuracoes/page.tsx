'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface DayConfig {
  day: string;
  selected: boolean;
}

interface KeywordConfig {
  keyword: string;
  type: 'igual' | 'contem' | 'comeca' | 'termina';
  caseSensitive: boolean;
}

export default function ConfiguracoesFluxo({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [days, setDays] = useState<DayConfig[]>([
    { day: 'Segunda', selected: false },
    { day: 'Terça', selected: false },
    { day: 'Quarta', selected: false },
    { day: 'Quinta', selected: false },
    { day: 'Sexta', selected: false },
    { day: 'Sábado', selected: false },
    { day: 'Domingo', selected: false },
  ]);
  const [keywords, setKeywords] = useState<KeywordConfig[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedType, setSelectedType] = useState<'igual' | 'contem' | 'comeca' | 'termina'>('igual');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [menuSendCount, setMenuSendCount] = useState('1');

  const handleDayToggle = (index: number) => {
    const newDays = [...days];
    newDays[index].selected = !newDays[index].selected;
    setDays(newDays);
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([
        ...keywords,
        {
          keyword: newKeyword.trim(),
          type: selectedType,
          caseSensitive: isCaseSensitive,
        },
      ]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    router.push('/fluxos');
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/fluxos')}
            className="p-2 hover:bg-accent rounded-full transition-colors duration-200"
            title="Voltar para lista de fluxos"
          >
            <ArrowLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Configurações do Fluxo</h1>
        </div>

        {/* Business Hours */}
        <div className="bg-card rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-500">Horário de Expediente</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {days.map((day, index) => (
              <label key={day.day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={day.selected}
                  onChange={() => handleDayToggle(index)}
                  className="form-checkbox h-5 w-5 text-primary rounded border-gray-300"
                />
                <span>{day.day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div className="bg-card rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-500">Palavras-chave</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Digite uma palavra-chave"
              className="flex-1 px-4 py-2 rounded-md bg-background border border-input"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-4 py-2 rounded-md bg-background border border-input"
            >
              <option value="igual">Igual</option>
              <option value="contem">Contém</option>
              <option value="comeca">Começa com</option>
              <option value="termina">Termina com</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isCaseSensitive}
                onChange={(e) => setIsCaseSensitive(e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary rounded border-gray-300"
              />
              <span>Sensível a Maiúsculas</span>
            </label>
            <button
              onClick={handleAddKeyword}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {keywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-background rounded-md">
                <div className="flex items-center space-x-2">
                  <span>{keyword.keyword}</span>
                  <span className="text-sm text-muted-foreground">({keyword.type})</span>
                  {keyword.caseSensitive && (
                    <span className="text-sm text-muted-foreground">Case Sensitive</span>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveKeyword(index)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Send Count */}
        <div className="bg-card rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-500">Quantidade de Envio do Menu</h2>
          <input
            type="number"
            value={menuSendCount}
            onChange={(e) => setMenuSendCount(e.target.value)}
            min="1"
            className="px-4 py-2 rounded-md bg-background border border-input w-32"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => router.push('/fluxos')}
            className="px-6 py-2 rounded-md bg-accent hover:bg-accent/80 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
