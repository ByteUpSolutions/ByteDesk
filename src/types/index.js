// Tipos principais do sistema ByteDesk

// Tenant/Empresa
export const TenantSchema = {
  id: '',
  name: '',
  logo: '',
  theme: {
    primary: '#3B82F6',
    secondary: '#64748B', 
    accent: '#10B981',
    background: '#F8FAFC'
  },
  settings: {}
};

// Usuário
export const UserSchema = {
  id: '',
  email: '',
  name: '',
  tenantId: '',
  role: 'user' // 'admin' | 'user'
};

// Venda
export const SaleSchema = {
  id: '',
  date: '',
  customerId: '',
  customerName: '',
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  status: 'pending', // 'pending' | 'paid' | 'cancelled'
  notes: '',
  tenantId: ''
};

// Item de Venda
export const SaleItemSchema = {
  id: '',
  productId: '',
  productName: '',
  quantity: 0,
  unitPrice: 0,
  total: 0
};

// Conta a Receber/Pagar
export const AccountSchema = {
  id: '',
  type: 'receivable', // 'receivable' | 'payable'
  description: '',
  amount: 0,
  dueDate: '',
  status: 'pending', // 'pending' | 'paid' | 'overdue'
  customerId: '',
  customerName: '',
  tenantId: ''
};

// Produto
export const ProductSchema = {
  id: '',
  name: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  minStock: 0,
  active: true,
  tenantId: ''
};

// Agendamento
export const AppointmentSchema = {
  id: '',
  title: '',
  description: '',
  date: '',
  time: '',
  customerId: '',
  customerName: '',
  status: 'scheduled', // 'scheduled' | 'completed' | 'cancelled'
  tenantId: ''
};

// Viagem/Logística
export const TravelSchema = {
  id: '',
  destination: '',
  purpose: '',
  startDate: '',
  endDate: '',
  cost: 0,
  status: 'planned', // 'planned' | 'in_progress' | 'completed'
  notes: '',
  tenantId: ''
};

// Dashboard Metrics
export const DashboardMetrics = {
  totalSales: 0,
  totalAccounts: 0,
  totalProducts: 0,
  lowStockAlerts: 0,
  overdueAccounts: 0,
  upcomingAppointments: 0
};

// Filtros de busca
export const FilterSchema = {
  search: '',
  dateFrom: '',
  dateTo: '',
  status: '',
  category: '',
  page: 1,
  limit: 10
};

// Resposta da API
export const ApiResponse = {
  data: null,
  message: '',
  success: true,
  total: 0,
  page: 1,
  limit: 10
};

