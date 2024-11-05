export const copyToast = () => {
  return {
    duration: 2000,
    position: 'bottom-center',
    style: {
      background: '#1a1a1a',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      fontSize: '14px',
      fontWeight: '500',
    },
    icon: (
      <svg 
        className="w-5 h-5 text-green-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 13l4 4L19 7" 
        />
      </svg>
    ),
  };
}; 