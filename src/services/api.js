// Configuração base da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Classe para gerenciar requisições HTTP
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Obter token de autenticação
  getAuthToken() {
    return localStorage.getItem('bytedesk_token');
  }

  // Headers padrão
  getHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Método genérico para requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // PATCH
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
}

// Instância singleton
const apiService = new ApiService();

// Serviços específicos por módulo

// Autenticação
export const authAPI = {
  login: (email, password) => apiService.post('/auth/login', { email, password }),
  logout: () => apiService.post('/auth/logout'),
  refresh: () => apiService.post('/auth/refresh'),
  me: () => apiService.get('/auth/me')
};

// Vendas
export const salesAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/sales?${params}`);
  },
  getById: (id) => apiService.get(`/sales/${id}`),
  create: (data) => apiService.post('/sales', data),
  update: (id, data) => apiService.put(`/sales/${id}`, data),
  delete: (id) => apiService.delete(`/sales/${id}`),
  classify: (data) => apiService.post('/sales/classify', data) // IA
};

// Contas
export const accountsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/accounts?${params}`);
  },
  getById: (id) => apiService.get(`/accounts/${id}`),
  create: (data) => apiService.post('/accounts', data),
  update: (id, data) => apiService.put(`/accounts/${id}`, data),
  delete: (id) => apiService.delete(`/accounts/${id}`),
  markAsPaid: (id) => apiService.patch(`/accounts/${id}/pay`)
};

// Produtos
export const productsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/products?${params}`);
  },
  getById: (id) => apiService.get(`/products/${id}`),
  create: (data) => apiService.post('/products', data),
  update: (id, data) => apiService.put(`/products/${id}`, data),
  delete: (id) => apiService.delete(`/products/${id}`),
  getLowStock: () => apiService.get('/products/low-stock')
};

// Agendamentos
export const appointmentsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/appointments?${params}`);
  },
  getById: (id) => apiService.get(`/appointments/${id}`),
  create: (data) => apiService.post('/appointments', data),
  update: (id, data) => apiService.put(`/appointments/${id}`, data),
  delete: (id) => apiService.delete(`/appointments/${id}`),
  getUpcoming: () => apiService.get('/appointments/upcoming')
};

// Viagens
export const travelsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/travels?${params}`);
  },
  getById: (id) => apiService.get(`/travels/${id}`),
  create: (data) => apiService.post('/travels', data),
  update: (id, data) => apiService.put(`/travels/${id}`, data),
  delete: (id) => apiService.delete(`/travels/${id}`)
};

// Relatórios
export const reportsAPI = {
  getDashboard: () => apiService.get('/reports/dashboard'),
  getSalesReport: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/reports/sales?${params}`);
  },
  getAccountsReport: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/reports/accounts?${params}`);
  },
  exportExcel: (type, filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/reports/export/excel/${type}?${params}`);
  },
  exportPDF: (type, filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiService.get(`/reports/export/pdf/${type}?${params}`);
  }
};

// Tenant/Empresa
export const tenantAPI = {
  get: () => apiService.get('/tenant'),
  update: (data) => apiService.put('/tenant', data),
  updateTheme: (theme) => apiService.patch('/tenant/theme', theme),
  uploadLogo: (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    return apiService.request('/tenant/logo', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${apiService.getAuthToken()}`
      }
    });
  }
};

// IA
export const aiAPI = {
  classifyTransaction: (data) => apiService.post('/ai/classify', data),
  getSuggestions: (type, data) => apiService.post(`/ai/suggestions/${type}`, data),
  analyzeData: (data) => apiService.post('/ai/analyze', data)
};

export default apiService;

