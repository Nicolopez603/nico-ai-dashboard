'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import CreateKeyModal from '../../components/ui/CreateKeyModal'

export default function DashboardPage() {
    const [apiKeys, setApiKeys] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingKey, setEditingKey] = useState(null)

    useEffect(() => {
        fetchApiKeys()
    }, [])

    const fetchApiKeys = async () => {
        try {
            const response = await fetch('/api/keys')
            if (!response.ok) throw new Error('Failed to fetch API keys')
            const data = await response.json()
            console.log('Fetched keys:', data) // Para debugging
            setApiKeys(data)
        } catch (error) {
            console.error('Error fetching keys:', error)
            toast.error('Failed to load API keys')
        }
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">API Keys</h1>
                <button
                    onClick={() => {
                        setEditingKey(null)
                        setIsModalOpen(true)
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Create API Key
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left p-4 text-sm font-medium text-gray-500">
                                NAME
                            </th>
                            <th className="text-left p-4 text-sm font-medium text-gray-500">
                                USAGE
                            </th>
                            <th className="text-left p-4 text-sm font-medium text-gray-500">
                                KEY
                            </th>
                            <th className="text-right p-4 text-sm font-medium text-gray-500">
                                OPTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiKeys.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center p-4 text-gray-500"
                                >
                                    No API keys found
                                </td>
                            </tr>
                        ) : (
                            apiKeys.map((key) => (
                                <tr
                                    key={key.id}
                                    className="border-b border-gray-200 last:border-0"
                                >
                                    <td className="p-4 text-sm text-gray-900">
                                        {key.name || 'Unnamed Key'}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {key.usage || '0'}
                                    </td>
                                    <td className="p-4 font-mono text-sm text-gray-900">
                                        {key.value || 'No key available'}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        key.value
                                                    )
                                                    toast.success(
                                                        'API Key copied to clipboard'
                                                    )
                                                }}
                                                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                                                title="Copy API Key"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingKey(key)
                                                    setIsModalOpen(true)
                                                }}
                                                className="p-2 text-gray-500 hover:text-yellow-600 transition-colors"
                                                title="Edit API Key"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (
                                                        confirm(
                                                            'Are you sure you want to delete this API key?'
                                                        )
                                                    ) {
                                                        try {
                                                            const response =
                                                                await fetch(
                                                                    `/api/keys/${key.id}`,
                                                                    {
                                                                        method: 'DELETE',
                                                                    }
                                                                )
                                                            if (!response.ok)
                                                                throw new Error(
                                                                    'Failed to delete API key'
                                                                )
                                                            await fetchApiKeys()
                                                            toast.success(
                                                                'API Key deleted successfully'
                                                            )
                                                        } catch (error) {
                                                            console.error(
                                                                'Error deleting key:',
                                                                error
                                                            )
                                                            toast.error(
                                                                'Failed to delete API key'
                                                            )
                                                        }
                                                    }
                                                }}
                                                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                                title="Delete API Key"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <CreateKeyModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingKey(null)
                }}
                onSubmit={async (name) => {
                    try {
                        if (editingKey) {
                            const response = await fetch(
                                `/api/keys/${editingKey.id}`,
                                {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ name }),
                                }
                            )
                            if (!response.ok)
                                throw new Error('Failed to update API key')
                        } else {
                            const response = await fetch('/api/keys', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name }),
                            })
                            if (!response.ok)
                                throw new Error('Failed to create API key')
                        }
                        await fetchApiKeys()
                        setIsModalOpen(false)
                        setEditingKey(null)
                        toast.success(
                            `API Key ${
                                editingKey ? 'updated' : 'created'
                            } successfully`
                        )
                    } catch (error) {
                        console.error('Error:', error)
                        toast.error(
                            `Failed to ${
                                editingKey ? 'update' : 'create'
                            } API key`
                        )
                    }
                }}
                initialName={editingKey?.name || ''}
                mode={editingKey ? 'edit' : 'create'}
            />
        </div>
    )
}
