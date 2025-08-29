import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { tenant } = useAuth();

  // Aplicar tema da empresa
  useEffect(() => {
    if (tenant?.theme) {
      const root = document.documentElement;
      
      // Converter cores hex para oklch (simplificado)
      const hexToOklch = (hex) => {
        // Para simplificar, vamos usar as cores diretamente
        // Em produção, seria necessário converter adequadamente
        return hex;
      };

      // Aplicar cores personalizadas
      root.style.setProperty('--primary', tenant.theme.primary);
      root.style.setProperty('--secondary', tenant.theme.secondary);
      root.style.setProperty('--accent', tenant.theme.accent);
      root.style.setProperty('--background', tenant.theme.background);
      
      // Cores derivadas para melhor contraste
      root.style.setProperty('--primary-foreground', '#ffffff');
      root.style.setProperty('--secondary-foreground', '#ffffff');
      root.style.setProperty('--accent-foreground', '#ffffff');
      
      // Sidebar colors
      root.style.setProperty('--sidebar-primary', tenant.theme.primary);
      root.style.setProperty('--sidebar-accent', tenant.theme.accent);
    }
  }, [tenant]);

  // Função para atualizar tema
  const updateTheme = (newTheme) => {
    if (tenant) {
      const updatedTenant = {
        ...tenant,
        theme: { ...tenant.theme, ...newTheme }
      };
      
      // Atualizar no contexto de auth
      // updateTenant(updatedTenant);
    }
  };

  // Função para resetar tema
  const resetTheme = () => {
    const root = document.documentElement;
    root.style.removeProperty('--primary');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--background');
    root.style.removeProperty('--primary-foreground');
    root.style.removeProperty('--secondary-foreground');
    root.style.removeProperty('--accent-foreground');
    root.style.removeProperty('--sidebar-primary');
    root.style.removeProperty('--sidebar-accent');
  };

  const value = {
    theme: tenant?.theme || {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#10B981',
      background: '#F8FAFC'
    },
    updateTheme,
    resetTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}

