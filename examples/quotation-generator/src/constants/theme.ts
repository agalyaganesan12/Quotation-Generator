/**
 * Theme configuration for the Quotation/Invoice Generator
 * Red-brown color palette
 */

export const THEME = {
  // Primary colors (Saddle Brown family)
  primary: {
    50: '#fdf8f6',
    100: '#f5e6e0',
    200: '#e8c4b8',
    300: '#d4978a',
    400: '#c06d5c',
    500: '#a0522d',  // Sienna - light primary
    600: '#8b4513',  // Saddle Brown - main primary
    700: '#6b3410',  // Dark primary
    800: '#4a240b',
    900: '#2a1507',
  },

  // Accent color
  accent: '#cd853f',  // Peru

  // Semantic colors
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
  info: '#0284c7',
} as const;

// CSS color values for direct use
export const COLORS = {
  primary: '#8b4513',
  primaryHover: '#6b3410',
  primaryLight: '#a0522d',
  accent: '#cd853f',
} as const;

// Tailwind-compatible class names
export const THEME_CLASSES = {
  button: {
    primary: 'bg-[#8b4513] text-white hover:bg-[#6b3410] focus:ring-[#a0522d]',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
  },
  focus: 'focus:ring-[#a0522d]',
  border: 'border-[#8b4513]',
} as const;
