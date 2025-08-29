import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Upload, 
  Save, 
  RotateCcw, 
  Eye,
  CheckCircle,
  Building2,
  User,
  Bell,
  Shield
} from 'lucide-react';

export default function Settings() {
  const { user, tenant, updateTenant } = useAuth();
  const { theme, updateTheme, resetTheme } = useTheme();
  
  const [themeData, setThemeData] = useState({
    primary: theme.primary || '#3B82F6',
    secondary: theme.secondary || '#64748B',
    accent: theme.accent || '#10B981',
    background: theme.background || '#F8FAFC'
  });
  
  const [companyData, setCompanyData] = useState({
    name: tenant?.name || '',
    logo: tenant?.logo || ''
  });
  
  const [saveStatus, setSaveStatus] = useState('');

  // Cores predefinidas
  const presetColors = {
    blue: { primary: '#3B82F6', secondary: '#64748B', accent: '#10B981', background: '#F8FAFC' },
    green: { primary: '#059669', secondary: '#6B7280', accent: '#3B82F6', background: '#F0FDF4' },
    purple: { primary: '#7C3AED', secondary: '#6B7280', accent: '#F59E0B', background: '#FAF5FF' },
    red: { primary: '#DC2626', secondary: '#6B7280', accent: '#059669', background: '#FEF2F2' },
    orange: { primary: '#EA580C', secondary: '#6B7280', accent: '#3B82F6', background: '#FFF7ED' },
    pink: { primary: '#DB2777', secondary: '#6B7280', accent: '#059669', background: '#FDF2F8' }
  };

  const handleThemeChange = (field, value) => {
    setThemeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePresetSelect = (preset) => {
    setThemeData(presetColors[preset]);
  };

  const handleSaveTheme = async () => {
    try {
      setSaveStatus('saving');
      
      // Aplicar tema imediatamente
      updateTheme(themeData);
      
      // Simular salvamento no backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar tenant com novo tema
      const updatedTenant = {
        ...tenant,
        theme: themeData
      };
      updateTenant(updatedTenant);
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleResetTheme = () => {
    const defaultTheme = presetColors.blue;
    setThemeData(defaultTheme);
    updateTheme(defaultTheme);
  };

  const handleCompanyChange = (field, value) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveCompany = async () => {
    try {
      setSaveStatus('saving');
      
      // Simular salvamento no backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar tenant
      const updatedTenant = {
        ...tenant,
        ...companyData
      };
      updateTenant(updatedTenant);
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua empresa e personalize a aparência do sistema
        </p>
      </div>

      {/* Status de salvamento */}
      {saveStatus && (
        <Alert className={saveStatus === 'success' ? 'border-green-200 bg-green-50' : 
                         saveStatus === 'error' ? 'border-red-200 bg-red-50' : 
                         'border-blue-200 bg-blue-50'}>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            {saveStatus === 'saving' && 'Salvando configurações...'}
            {saveStatus === 'success' && 'Configurações salvas com sucesso!'}
            {saveStatus === 'error' && 'Erro ao salvar configurações. Tente novamente.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs de configurações */}
      <Tabs defaultValue="theme" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Tema
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
        </TabsList>

        {/* Configurações de Tema */}
        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Personalização Visual
              </CardTitle>
              <CardDescription>
                Customize as cores e aparência do sistema para sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cores predefinidas */}
              <div>
                <Label className="text-base font-medium">Temas Predefinidos</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-3">
                  {Object.entries(presetColors).map(([name, colors]) => (
                    <button
                      key={name}
                      onClick={() => handlePresetSelect(name)}
                      className="flex flex-col items-center p-3 rounded-lg border hover:border-primary transition-colors"
                    >
                      <div className="flex space-x-1 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: colors.accent }}
                        />
                      </div>
                      <span className="text-xs capitalize">{name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cores personalizadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="primary">Cor Primária</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <Input
                        id="primary"
                        type="color"
                        value={themeData.primary}
                        onChange={(e) => handleThemeChange('primary', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeData.primary}
                        onChange={(e) => handleThemeChange('primary', e.target.value)}
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondary">Cor Secundária</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <Input
                        id="secondary"
                        type="color"
                        value={themeData.secondary}
                        onChange={(e) => handleThemeChange('secondary', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeData.secondary}
                        onChange={(e) => handleThemeChange('secondary', e.target.value)}
                        placeholder="#64748B"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accent">Cor de Destaque</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <Input
                        id="accent"
                        type="color"
                        value={themeData.accent}
                        onChange={(e) => handleThemeChange('accent', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeData.accent}
                        onChange={(e) => handleThemeChange('accent', e.target.value)}
                        placeholder="#10B981"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="background">Cor de Fundo</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <Input
                        id="background"
                        type="color"
                        value={themeData.background}
                        onChange={(e) => handleThemeChange('background', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeData.background}
                        onChange={(e) => handleThemeChange('background', e.target.value)}
                        placeholder="#F8FAFC"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <Label className="text-base font-medium">Preview</Label>
                  <div className="mt-3 p-4 border rounded-lg" style={{ backgroundColor: themeData.background }}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: themeData.primary }}
                        />
                        <span className="text-sm font-medium">ByteDesk</span>
                      </div>
                      <div 
                        className="px-3 py-2 rounded text-white text-sm"
                        style={{ backgroundColor: themeData.primary }}
                      >
                        Botão Primário
                      </div>
                      <div 
                        className="px-3 py-2 rounded text-white text-sm"
                        style={{ backgroundColor: themeData.accent }}
                      >
                        Botão de Destaque
                      </div>
                      <div className="p-3 bg-white rounded border">
                        <div className="text-sm font-medium">Card de Exemplo</div>
                        <div className="text-xs text-gray-600 mt-1">Conteúdo do card</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleResetTheme}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Resetar
                </Button>
                <Button
                  onClick={handleSaveTheme}
                  disabled={saveStatus === 'saving'}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Tema'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações da Empresa */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações da Empresa
              </CardTitle>
              <CardDescription>
                Configure os dados da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  value={companyData.name}
                  onChange={(e) => handleCompanyChange('name', e.target.value)}
                  placeholder="Nome da sua empresa"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="companyLogo">Logo da Empresa</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      {companyData.logo ? (
                        <img src={companyData.logo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                      ) : (
                        <Building2 className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Fazer Upload
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recomendado: PNG ou JPG, máximo 2MB, proporção quadrada
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={handleSaveCompany}
                  disabled={saveStatus === 'saving'}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Informações'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Perfil */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Perfil do Usuário
              </CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nome</Label>
                <Input value={user?.name || ''} disabled className="mt-2" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={user?.email || ''} disabled className="mt-2" />
              </div>
              <div>
                <Label>Função</Label>
                <Badge variant="secondary" className="mt-2">
                  {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Notificações */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Estoque baixo</div>
                    <div className="text-sm text-muted-foreground">Alertas quando produtos estão com estoque baixo</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Contas vencendo</div>
                    <div className="text-sm text-muted-foreground">Notificações de contas próximas ao vencimento</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Novas vendas</div>
                    <div className="text-sm text-muted-foreground">Alertas quando uma nova venda é registrada</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

