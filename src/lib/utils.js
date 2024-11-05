export function generateApiKey() {
    // Prefijo para identificar fácilmente que es una API key
    const prefix = 'ak_';
    
    // Generar una cadena aleatoria de 32 caracteres
    const randomString = Array.from(crypto.getRandomValues(new Uint8Array(24)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    
    return `${prefix}${randomString}`;
}

export async function handleApiResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

export function formatDate(date) {
  return new Intl.DateTimeFormatter('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date));
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatError(error) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
} 