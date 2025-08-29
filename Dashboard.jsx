import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Package,
  AlertTriangle,
  Calendar,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils';

export default function Dashboard() {
  const { user, tenant } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Simular carregamento de dados
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mock para demonstração
      const mockData = {
        metrics: {
          totalSales: 125400,
          salesGrowth: 12.5,
          totalAccounts: 34200,
          accountsGrowth: -2.3,
          totalProducts: 1234,
          productsGrowth: 5.8,
          lowStockAlerts: 8,
          overdueAccounts: 5,
          upcomingAppointments: 12
        },
        salesChart: [
          { month: 'Jan', vendas: 45000, meta: 50000 },
          { month: 'Fev', vendas: 52000, meta: 50000 },
          { month: 'Mar', vendas: 48000, meta: 50000 },
          { month: 'Abr', vendas: 61000, meta: 55000 },
          { month: 'Mai', vendas: 55000, meta: 55000 },
          { month: 'Jun', vendas: 67000, meta: 60000 },
          { month: 'Jul', vendas: 72000, meta: 60000 },
          { month: 'Ago', vendas: 69000, meta: 65000 },
          { month: 'Set', vendas: 75000, meta: 65000 },
          { month: 'Out', vendas: 82000, meta: 70000 },
          { month: 'Nov', vendas: 89000, meta: 70000 },
          { month: 'Dez', vendas: 95000, meta: 75000 }
        ],
        categoryChart: [
          { name: 'Eletrônicos', value: 35, amount: 43750 },
          { name: 'Roupas', value: 25, amount: 31250 },
          { name: 'Casa & Jardim', value: 20, amount: 25000 },
          { name: 'Esportes', value: 12, amount: 15000 },
          { name: 'Livros', value: 8, amount: 10000 }
        ],
        recentSales: [
          { id: 1, customer: 'João Silva', amount: 1250, date: '2024-12-15', status: 'paid' },
          { id: 2, customer: 'Maria Santos', amount: 890, date: '2024-12-15', status: 'pending' },
          { id: 3, customer: 'Pedro Lima', amount: 2100, date: '2024-12-14', status: 'paid' },
          { id: 4, customer: 'Ana Costa', amount: 750, date: '2024-12-14', status: 'paid' },
          { id: 5, customer: 'Carlos Oliveira', amount: 1680, date: '2024-12-13', status: 'pending' }
        ],
        alerts: [
          { id: 1, type: 'warning', message: 'Produto "Smartphone XYZ" com estoque baixo (5 unidades)', priority: 'high' },
          { id: 2, type: 'error', message: 'Conta de R$ 2.500 da empresa ABC vence hoje', priority: 'urgent' },
          { id: 3, type: 'info', message: 'Agendamento com cliente DEF amanhã às 14h', priority: 'medium' },
          { id: 4, type: 'warning', message: 'Meta de vendas do mês em 85%', priority: 'medium' },
          { id: 5, type: 'error', message: '3 contas em atraso precisam de atenção', priority: 'high' }
        ]
      };
      
      setDashboardData(mockData);
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  const { metrics, salesChart, categoryChart, recentSales, alerts } = dashboardData;

  // Cores para o gráfico de pizza
  const COLORS = ['#059669', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAlertColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-red-200 bg-red-50';
      case 'high': return 'border-orange-200 bg-orange-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta, {user?.name}! Aqui está o resumo do seu negócio.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Relatório Completo
          </Button>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalSales)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metrics.salesGrowth > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={metrics.salesGrowth > 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(metrics.salesGrowth)}%
              </span>
              <span className="ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas a Receber</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalAccounts)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metrics.accountsGrowth > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={metrics.accountsGrowth > 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(metrics.accountsGrowth)}%
              </span>
              <span className="ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalProducts)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">{metrics.productsGrowth}%</span>
              <span className="ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.lowStockAlerts + metrics.overdueAccounts}</div>
            <div className="text-xs text-muted-foreground">
              {metrics.lowStockAlerts} estoque baixo, {metrics.overdueAccounts} contas vencidas
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de vendas */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas vs Meta</CardTitle>
            <CardDescription>Comparação mensal de vendas realizadas com a meta estabelecida</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="vendas" 
                  stackId="1" 
                  stroke="#059669" 
                  fill="#059669" 
                  fillOpacity={0.6}
                  name="Vendas"
                />
                <Area 
                  type="monotone" 
                  dataKey="meta" 
                  stackId="2" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                  name="Meta"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>Distribuição das vendas por categoria de produto</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Vendas recentes e alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendas recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>Últimas transações realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{sale.customer}</p>
                      <p className="text-sm text-muted-foreground">{sale.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(sale.amount)}</p>
                    <Badge variant={sale.status === 'paid' ? 'default' : 'secondary'}>
                      {sale.status === 'paid' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas e Notificações</CardTitle>
            <CardDescription>Itens que precisam da sua atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <Alert key={alert.id} className={getAlertColor(alert.priority)}>
                  <div className="flex items-start space-x-2">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertDescription className="text-sm">
                        {alert.message}
                      </AlertDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {alert.priority === 'urgent' ? 'Urgente' :
                       alert.priority === 'high' ? 'Alto' :
                       alert.priority === 'medium' ? 'Médio' : 'Baixo'}
                    </Badge>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

