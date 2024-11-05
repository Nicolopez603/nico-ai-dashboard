'use client';

import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApiKeys = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/keys');
      if (!response.ok) throw new Error('Failed to fetch API keys');
      const data = await response.json();
      setApiKeys(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load API keys');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createApiKey = useCallback(async (name) => {
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      
      if (!response.ok) throw new Error('Failed to create API key');
      
      const newKey = await response.json();
      setApiKeys(prev => [newKey, ...prev]);
      toast.success('API Key created successfully');
      return newKey;
    } catch (err) {
      toast.error('Failed to create API key');
      throw err;
    }
  }, []);

  const updateApiKey = useCallback(async (id, name) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      
      if (!response.ok) throw new Error('Failed to update API key');
      
      const updatedKey = await response.json();
      setApiKeys(prev => prev.map(key => 
        key.id === id ? updatedKey : key
      ));
      toast.success('API Key updated successfully');
      return updatedKey;
    } catch (err) {
      toast.error('Failed to update API key');
      throw err;
    }
  }, []);

  const deleteApiKey = useCallback(async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete API key');
      
      setApiKeys(prev => prev.filter(key => key.id !== id));
      toast.success('API Key deleted successfully');
    } catch (err) {
      toast.error('Failed to delete API key');
      throw err;
    }
  }, []);

  return {
    apiKeys,
    isLoading,
    error,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
  };
} 