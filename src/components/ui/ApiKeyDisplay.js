'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function ApiKeyDisplay({ value }) {
  const [isVisible, setIsVisible] = useState(false);

  if (!value || value === 'No key available') {
    return <span className="text-gray-400">No key available</span>;
  }

  const maskedValue = `${value.slice(0, 8)}${'•'.repeat(20)}${value.slice(-8)}`;

  return (
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-md px-3 py-1.5 w-full">
      <code className="font-mono text-sm text-gray-900 dark:text-gray-100 flex-1 overflow-x-auto">
        {isVisible ? value : maskedValue}
      </code>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        title={isVisible ? "Hide API Key" : "Show API Key"}
      >
        {isVisible ? (
          <EyeSlashIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
} 