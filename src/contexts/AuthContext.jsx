import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial
const initialState = {
  user: null,
  tenant: null,
  isAuthenticated: false,
  isLoading: true,
  token: null
};

// Actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_TENANT: 'SET_TENANT'
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        tenant: action.payload.tenant,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        tenant: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        isLoading: false
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case AUTH_ACTIONS.SET_TENANT:
      return {
        ...state,
        tenant: action.payload
      };
    
    default:
      return state;
  }
}

// Context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar token salvo no localStorage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('bytedesk_token');
        const userData = localStorage.getItem('bytedesk_user');
        const tenantData = localStorage.getItem('bytedesk_tenant');

        if (token && userData && tenantData) {
          const user = JSON.parse(userData);
          const tenant = JSON.parse(tenantData);
          
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: { user, tenant, token }
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // Simulação de login - em produção seria uma chamada para a API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock de dados de usuário e tenant
      const mockUser = {
        id: '1',
        email: email,
        name: 'Usuário Demo',
        tenantId: 'tenant1',
        role: 'admin'
      };

      const mockTenant = {
        id: 'tenant1',
        name: 'Empresa Demo',
        logo: '',
        theme: {
          primary: '#3B82F6',
          secondary: '#64748B',
          accent: '#10B981',
          background: '#F8FAFC'
        },
        settings: {}
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Salvar no localStorage
      localStorage.setItem('bytedesk_token', mockToken);
      localStorage.setItem('bytedesk_user', JSON.stringify(mockUser));
      localStorage.setItem('bytedesk_tenant', JSON.stringify(mockTenant));

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: mockUser,
          tenant: mockTenant,
          token: mockToken
        }
      });

      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE });
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('bytedesk_token');
    localStorage.removeItem('bytedesk_user');
    localStorage.removeItem('bytedesk_tenant');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Atualizar tenant
  const updateTenant = (tenant) => {
    localStorage.setItem('bytedesk_tenant', JSON.stringify(tenant));
    dispatch({ type: AUTH_ACTIONS.SET_TENANT, payload: tenant });
  };

  const value = {
    ...state,
    login,
    logout,
    updateTenant
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

