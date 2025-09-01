import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Package,
  Calendar,
  Truck,
  BarChart3,
  Settings,
  Building2,
  X,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Vendas', href: '/sales', icon: ShoppingCart },
  { name: 'Contas', href: '/accounts', icon: CreditCard },
  { name: 'Produtos', href: '/products', icon: Package },
  { name: 'Agendamentos', href: '/appointments', icon: Calendar },
  { name: 'Viagens', href: '/travels', icon: Truck },
  { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export default function MobileNav({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { user, tenant, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      logout();
    }
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Fechar sidebar</span>
                    <X className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              {/* Sidebar content */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-6 pb-4">
                {/* Logo e nome da empresa */}
                <div className="flex h-16 shrink-0 items-center">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                      <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold text-sidebar-foreground">ByteDesk</h1>
                      {tenant && (
                        <p className="text-xs text-sidebar-foreground/70">{tenant.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navegação */}
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          const isActive = location.pathname === item.href || 
                            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
                          
                          return (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={cn(
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors',
                                  isActive
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                )}
                              >
                                <item.icon
                                  className={cn(
                                    'h-6 w-6 shrink-0',
                                    isActive ? 'text-sidebar-accent-foreground' : 'text-sidebar-foreground/70'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    {/* Informações do usuário e logout */}
                    <li className="mt-auto">
                      <div className="border-t border-sidebar-border pt-4">
                        {/* Informações do usuário */}
                        {user && (
                          <div className="mb-4 px-2">
                            <div className="flex items-center space-x-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary">
                                <span className="text-sm font-medium text-sidebar-primary-foreground">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-sidebar-foreground truncate">
                                  {user.name}
                                </p>
                                <p className="text-xs text-sidebar-foreground/70 truncate">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Botão de logout */}
                        <button
                          onClick={handleLogout}
                          className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                        >
                          <LogOut
                            className="h-6 w-6 shrink-0 text-sidebar-foreground/70"
                            aria-hidden="true"
                          />
                          Sair
                        </button>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

