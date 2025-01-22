# Gerenciamento de Novidades e Atualizações

Este diretório contém os arquivos responsáveis por gerenciar as novidades e atualizações exibidas no sistema.

## Estrutura do Projeto

```
app/
├── data/
│   ├── README.md    # Este arquivo
│   └── updates.json # Dados das novidades e atualizações
└── lib/
    └── updates.ts   # Utilitário para processamento dos dados
```

## Como Usar

Para atualizar as novidades do sistema, você só precisa modificar o arquivo `updates.json`. 

Consulte a documentação técnica em:
- Tipos e interfaces: Ver comentários em `app/lib/updates.ts`
- Estrutura dos dados: Ver documentação em `app/data/updates.json`

## Boas Práticas

1. **Ordenação**
   - Mantenha as notificações ordenadas por data (mais recente primeiro)
   - Mantenha as versões ordenadas por número (mais recente primeiro)

2. **Versionamento**
   - Mantenha apenas uma versão com status "current"
   - Use versionamento semântico (X.Y.Z) para as versões

3. **Conteúdo**
   - Mantenha descrições concisas e claras
   - Use linguagem amigável e profissional
   - Revise o texto antes de commitar

4. **Manutenção**
   - Remova notificações antigas periodicamente
   - Mantenha o histórico de versões atualizado
   - Faça backup antes de grandes alterações
