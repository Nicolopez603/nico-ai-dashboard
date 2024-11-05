'use client';

import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
          <a
            href="https://docs.tavily.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            Documentation
          </a>
        </div>
      </div>
    </header>
  );
} 