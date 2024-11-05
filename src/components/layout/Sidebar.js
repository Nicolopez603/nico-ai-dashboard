'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon, 
  BeakerIcon, 
  DocumentTextIcon, 
  CommandLineIcon,
  CreditCardIcon,
  BookOpenIcon,
  KeyIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Logo3D from '@/components/ui/Logo3D';

// Definimos menuItems fuera del componente
const menuItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'API Keys',
    href: '/dashboard',
    icon: KeyIcon,
  },
  {
    name: 'Research Assistant',
    href: '/research-assistant',
    icon: BeakerIcon,
  },
  {
    name: 'Research Reports',
    href: '/research-reports',
    icon: DocumentTextIcon,
  },
  {
    name: 'API Playground',
    href: '/api-playground',
    icon: CommandLineIcon,
  },
  {
    name: 'Invoices',
    href: '/invoices',
    icon: CreditCardIcon,
  },
  {
    name: 'Documentation',
    href: '/documentation',
    icon: BookOpenIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8">
              <Logo3D />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Nico AI</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon; // Importante: asignamos el componente a una variable que empiece con mayúscula

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-100'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {Icon && <Icon className="w-5 h-5 mr-3" />}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}