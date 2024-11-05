'use client';

import { useEffect, useState } from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import CreateKeyModal from '@/components/ui/CreateKeyModal';
import ApiKeyDisplay from '@/components/ui/ApiKeyDisplay';
import { 
  PlusIcon,
  ClipboardIcon,
  PencilIcon,
  TrashIcon,
  KeyIcon 
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function DashboardPage() {
  const {
    apiKeys,
    isLoading,
    error,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
  } = useApiKeys();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  const handleCopyKey = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      toast.success('API Key copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy API key');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">API Keys</h1>
        <button
          onClick={() => {
            setEditingKey(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create API Key
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {apiKeys.map((key) => (
              <tr key={key.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {key.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {key.usage || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap min-w-[400px]">
                  <ApiKeyDisplay value={key.value} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      onClick={() => handleCopyKey(key.value)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Copy API Key"
                    >
                      <ClipboardIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingKey(key);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Edit API Key"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this API key?')) {
                          deleteApiKey(key.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Delete API Key"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingKey(null);
        }}
        onSubmit={async (name) => {
          if (editingKey) {
            await updateApiKey(editingKey.id, name);
          } else {
            await createApiKey(name);
          }
          setIsModalOpen(false);
          setEditingKey(null);
        }}
        initialName={editingKey?.name || ''}
        mode={editingKey ? 'edit' : 'create'}
      />
    </div>
  );
} 