# ByteDesk - Arquitetura do Sistema Frontend

## Visão Geral
ByteDesk é uma plataforma de gestão multi-cliente (multi-tenant) para pequenas e médias empresas, desenvolvida em React com integração a backend FastAPI.

## Tecnologias Principais
- **Framework**: React 18 com TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Roteamento**: React Router v6
- **Estado Global**: Context API + useReducer
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **HTTP Client**: Axios
- **Formulários**: React Hook Form + Zod
- **Exportação**: jsPDF + xlsx

## Arquitetura Multi-Tenant

### Estrutura de Dados
```typescript
interface Tenant {
  id: string;
  name: string;
  logo?: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  settings: Record<string, any>;
}

interface User {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  role: 'admin' | 'user';
}
```

### Contexto Global
- **AuthContext**: Gerencia autenticação e dados do usuário
- **TenantContext**: Gerencia dados da empresa/tenant atual
- **ThemeContext**: Aplica temas personalizados dinamicamente

## Estrutura de Componentes

### Layout Principal
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   │   └── MobileNav.tsx
│   ├── ui/ (shadcn/ui components)
│   └── common/
│       ├── DataTable.tsx
│       ├── FormField.tsx
│       ├── Modal.tsx
│       └── Charts/
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── TenantSelect.tsx
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   ├── sales/
│   │   ├── SalesList.tsx
│   │   ├── SalesForm.tsx
│   │   └── SalesDetail.tsx
│   ├── accounts/
│   ├── products/
│   ├── appointments/
│   ├── travels/
│   └── reports/
├── hooks/
├── services/
├── utils/
└── types/
```

## Funcionalidades Principais

### 1. Dashboard
- **Métricas**: Total de vendas, contas a receber, produtos em estoque
- **Alertas**: Estoque baixo, contas vencidas, agendamentos próximos
- **Gráficos**: Vendas por período, categorias, performance
- **Widgets**: Configuráveis por empresa

### 2. Módulos CRUD

#### Vendas
- Listagem com filtros e paginação
- Formulário de criação/edição
- Detalhes da venda
- Histórico de alterações
- Integração com IA para classificação automática

#### Contas a Receber/Pagar
- Gestão de cobranças
- Status de pagamento
- Relatórios de inadimplência
- Alertas de vencimento

#### Produtos
- Catálogo de produtos
- Controle de estoque
- Categorização
- Alertas de estoque mínimo

### 3. Agendamentos
- Calendário interativo
- Agendamento de clientes
- Notificações automáticas
- Sincronização com Google Calendar

### 4. Viagens/Logística
- Controle de entregas
- Rastreamento de veículos
- Otimização de rotas
- Relatórios de custos

### 5. Relatórios
- Dashboards personalizáveis
- Exportação Excel/PDF
- Filtros avançados
- Agendamento de relatórios

## Sistema de Temas

### Implementação
```typescript
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  logo: string;
  fonts: {
    primary: string;
    secondary: string;
  };
}
```

### Aplicação Dinâmica
- CSS Variables para cores
- Componentes temáticos
- Logo personalizado no header
- Persistência no localStorage

## Integração com Backend

### Endpoints Principais
```
/api/auth/login
/api/tenants/{id}
/api/sales
/api/accounts
/api/products
/api/appointments
/api/travels
/api/reports
/api/ai/classify
```

### Interceptors
- Autenticação automática
- Tratamento de erros
- Loading states
- Retry automático

## Responsividade

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Adaptações
- Sidebar colapsível
- Navegação mobile
- Tabelas responsivas
- Formulários adaptáveis

## Performance

### Otimizações
- Lazy loading de rotas
- Memoização de componentes
- Virtualização de listas grandes
- Cache de dados
- Compressão de imagens

## Segurança

### Medidas
- Autenticação JWT
- Proteção de rotas
- Sanitização de dados
- HTTPS obrigatório
- Isolamento de dados por tenant

