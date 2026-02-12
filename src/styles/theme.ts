export const theme = {
  colors: {
    primary: '#00FF88',
    primaryDark: '#00CC6A',
    secondary: '#FF0055',
    background: '#0A0A0F',
    surface: '#151520',
    surfaceHover: '#1D1D2E',
    text: '#FFFFFF',
    textSecondary: '#A0A0B8',
    error: '#FF3366',
    success: '#00FF88',
    warning: '#FFB800',
    border: '#2A2A3E',
    borderAccent: '#00FF88',
    gradient: 'linear-gradient(135deg, #00FF88 0%, #00B8FF 100%)',
    gradientAlt: 'linear-gradient(135deg, #FF0055 0%, #FF8800 100%)',
    shadow: 'rgba(0, 255, 136, 0.2)',
    shadowDark: 'rgba(0, 0, 0, 0.5)',
  },
  
  fonts: {
    display: '"Space Mono", "Courier New", monospace',
    body: '"JetBrains Mono", "Consolas", monospace',
    accent: '"Orbitron", sans-serif',
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
    xxxl: '3rem',
    huge: '4rem',
  },
  
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 16px rgba(0, 0, 0, 0.2)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(0, 255, 136, 0.3)',
    glowStrong: '0 0 40px rgba(0, 255, 136, 0.5)',
    neon: '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3), 0 0 30px rgba(0, 255, 136, 0.1)',
  },
  
  zIndex: {
    base: 1,
    dropdown: 1000,
    modal: 2000,
    tooltip: 3000,
  },
} as const;

export type Theme = typeof theme;