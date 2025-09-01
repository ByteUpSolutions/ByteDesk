// Utilitários gerais do sistema ByteDesk

// Formatação de moeda
export const formatCurrency = (value) => {
  if (typeof value !== 'number') return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Formatação de data
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return new Intl.DateTimeFormat('pt-BR').format(d);
};

// Formatação de data e hora
export const formatDateTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
};

// Formatação de número
export const formatNumber = (value, decimals = 0) => {
  if (typeof value !== 'number') return '0';
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

// Validação de email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de CPF (simplificada)
export const isValidCPF = (cpf) => {
  if (!cpf) return false;
  
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se não são todos iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  return true; // Validação simplificada
};

// Formatação de CPF
export const formatCPF = (cpf) => {
  if (!cpf) return '';
  
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Formatação de telefone
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

// Debounce para otimizar buscas
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Gerar ID único simples
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Calcular idade
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Calcular diferença de dias
export const daysDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Verificar se data está vencida
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  
  const today = new Date();
  const due = new Date(dueDate);
  return due < today;
};

// Obter status baseado na data de vencimento
export const getAccountStatus = (dueDate, isPaid = false) => {
  if (isPaid) return 'paid';
  if (isOverdue(dueDate)) return 'overdue';
  return 'pending';
};

// Cores para status
export const getStatusColor = (status) => {
  const colors = {
    pending: 'text-yellow-600 bg-yellow-100',
    paid: 'text-green-600 bg-green-100',
    overdue: 'text-red-600 bg-red-100',
    cancelled: 'text-gray-600 bg-gray-100',
    scheduled: 'text-blue-600 bg-blue-100',
    completed: 'text-green-600 bg-green-100',
    in_progress: 'text-orange-600 bg-orange-100',
    planned: 'text-purple-600 bg-purple-100'
  };
  
  return colors[status] || 'text-gray-600 bg-gray-100';
};

// Tradução de status
export const translateStatus = (status) => {
  const translations = {
    pending: 'Pendente',
    paid: 'Pago',
    overdue: 'Vencido',
    cancelled: 'Cancelado',
    scheduled: 'Agendado',
    completed: 'Concluído',
    in_progress: 'Em Andamento',
    planned: 'Planejado'
  };
  
  return translations[status] || status;
};

// Filtrar dados por texto
export const filterByText = (items, searchText, fields) => {
  if (!searchText) return items;
  
  const search = searchText.toLowerCase();
  
  return items.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(search);
      }
      return false;
    });
  });
};

// Ordenar dados
export const sortData = (items, field, direction = 'asc') => {
  return [...items].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];
    
    // Converter para número se possível
    if (!isNaN(aVal) && !isNaN(bVal)) {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }
    
    // Converter para data se for string de data
    if (typeof aVal === 'string' && aVal.match(/^\d{4}-\d{2}-\d{2}/)) {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    
    if (direction === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};

// Paginar dados
export const paginateData = (items, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: items.slice(startIndex, endIndex),
    total: items.length,
    page,
    limit,
    totalPages: Math.ceil(items.length / limit)
  };
};

// Exportar para CSV
export const exportToCSV = (data, filename) => {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Validar formulário
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = 'Este campo é obrigatório';
    } else if (value) {
      if (rule.minLength && value.length < rule.minLength) {
        errors[field] = `Mínimo de ${rule.minLength} caracteres`;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        errors[field] = `Máximo de ${rule.maxLength} caracteres`;
      }
      if (rule.email && !isValidEmail(value)) {
        errors[field] = 'Email inválido';
      }
      if (rule.min && Number(value) < rule.min) {
        errors[field] = `Valor mínimo: ${rule.min}`;
      }
      if (rule.max && Number(value) > rule.max) {
        errors[field] = `Valor máximo: ${rule.max}`;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

