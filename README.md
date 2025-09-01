# ByteDesk - Sistema de Gestão Empresarial

## 📋 Sobre o Projeto

ByteDesk é uma plataforma completa de gestão multi-cliente para pequenas e médias empresas, desenvolvida em React com integração a backend FastAPI. O sistema oferece funcionalidades abrangentes para gerenciamento de vendas, contas, produtos, agendamentos, viagens e relatórios, com suporte a temas personalizáveis e inteligência artificial.

## ✨ Funcionalidades Principais

### 🔐 Sistema Multi-Tenant
- Login seguro com autenticação JWT
- Isolamento completo de dados por empresa
- Gerenciamento de usuários e permissões

### 🎨 Temas Personalizáveis
- Cores customizáveis por empresa
- Upload de logo personalizado
- Preview em tempo real das alterações
- Temas predefinidos (Azul, Verde, Roxo, Vermelho, Laranja, Rosa)

### 📊 Dashboard Inteligente
- Métricas em tempo real (vendas, contas, produtos, alertas)
- Gráficos interativos com Recharts
- Comparação de vendas vs metas
- Distribuição por categorias
- Alertas prioritários

### 💰 Gestão de Vendas
- CRUD completo de vendas
- Classificação automática com IA
- Histórico de transações
- Status de pagamento

### 📋 Contas a Receber/Pagar
- Controle de cobranças
- Alertas de vencimento
- Relatórios de inadimplência
- Gestão de status

### 📦 Controle de Produtos
- Catálogo completo
- Controle de estoque
- Alertas de estoque mínimo
- Categorização

### 📅 Agendamentos
- Calendário interativo
- Notificações automáticas
- Gestão de clientes
- Status de agendamentos

### 🚚 Controle de Viagens
- Gestão de logística
- Controle de custos
- Rastreamento de entregas
- Relatórios de viagens

### 📈 Relatórios Avançados
- Dashboards personalizáveis
- Exportação Excel/PDF
- Filtros avançados
- Análises de performance

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Router** - Roteamento
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones
- **React Hook Form** - Formulários
- **Zod** - Validação de dados

### Backend (Integração)
- **FastAPI** - API REST
- **Python** - Linguagem backend
- **JWT** - Autenticação
- **IA** - Classificação automática

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd bytedesk

# Instale as dependências
pnpm install

# Execute o servidor de desenvolvimento
pnpm run dev

# Acesse http://localhost:5173
```

### Build para Produção
```bash
# Gere o build otimizado
pnpm run build

# Preview do build
pnpm run preview
```

## 🔑 Credenciais de Demonstração

Para acessar o sistema de demonstração, use:
- **Email:** demo@bytedesk.com
- **Senha:** demo123

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 📱 Dispositivos móveis (< 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktop (> 1024px)

## 🎯 Arquitetura

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/         # Layout principal, sidebar, header
│   ├── ui/             # Componentes UI (shadcn/ui)
│   └── common/         # Componentes comuns
├── pages/              # Páginas da aplicação
│   ├── auth/           # Autenticação
│   ├── dashboard/      # Dashboard principal
│   ├── sales/          # Gestão de vendas
│   ├── accounts/       # Contas a receber/pagar
│   ├── products/       # Controle de produtos
│   ├── appointments/   # Agendamentos
│   ├── travels/        # Viagens/logística
│   ├── reports/        # Relatórios
│   └── settings/       # Configurações
├── contexts/           # Contextos React
├── services/           # Serviços de API
├── utils/              # Utilitários
└── types/              # Tipos TypeScript
```

### Contextos Principais
- **AuthContext** - Gerenciamento de autenticação e usuário
- **ThemeContext** - Temas personalizáveis por empresa

## 🔧 Configuração de Temas

O sistema permite personalização completa de cores por empresa:

```javascript
const theme = {
  primary: '#059669',      // Cor primária
  secondary: '#6B7280',    // Cor secundária  
  accent: '#3B82F6',       // Cor de destaque
  background: '#F0FDF4'    // Cor de fundo
};
```

## 📊 Métricas do Dashboard

O dashboard apresenta métricas essenciais:
- Total de vendas com crescimento percentual
- Contas a receber com status
- Quantidade de produtos em estoque
- Alertas críticos (estoque baixo, contas vencidas)

## 🔔 Sistema de Alertas

Alertas inteligentes por prioridade:
- 🔴 **Urgente** - Contas vencendo hoje
- 🟠 **Alto** - Estoque baixo, contas em atraso
- 🟡 **Médio** - Metas, agendamentos próximos
- 🔵 **Baixo** - Informações gerais

## 🌐 Integração com Backend

O frontend está preparado para integração completa com backend FastAPI:

```javascript
// Exemplo de chamada de API
const response = await salesAPI.getAll({
  page: 1,
  limit: 10,
  status: 'pending'
});
```

## 🔒 Segurança

- Autenticação JWT
- Proteção de rotas
- Sanitização de dados
- Isolamento por tenant
- HTTPS obrigatório

## 📈 Performance

- Lazy loading de rotas
- Memoização de componentes
- Virtualização de listas
- Cache de dados
- Otimização de imagens

## 🎨 Design System

O sistema utiliza um design system consistente baseado em:
- Cores semânticas
- Tipografia hierárquica
- Espaçamentos padronizados
- Componentes reutilizáveis
- Estados interativos

## 🚀 Deploy

O sistema pode ser deployado em qualquer plataforma que suporte aplicações React:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps
- GitHub Pages

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o sistema:
- 📧 Email: suporte@bytedesk.com
- 📱 WhatsApp: (11) 99999-9999
- 🌐 Site: https://bytedesk.com

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**ByteDesk** - Gestão Empresarial Inteligente 🚀

