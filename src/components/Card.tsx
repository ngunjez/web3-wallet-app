import styled, { css } from 'styled-components';

interface CardProps {
  $variant?: 'default' | 'highlighted' | 'glass';
  $padding?: 'small' | 'medium' | 'large';
  $hoverable?: boolean;
}

const getPaddingStyles = (padding: CardProps['$padding']) => {
  switch (padding) {
    case 'small':
      return css`
        padding: ${({ theme }) => theme.spacing.md};
      `;
    case 'large':
      return css`
        padding: ${({ theme }) => theme.spacing.xxl};
      `;
    case 'medium':
    default:
      return css`
        padding: ${({ theme }) => theme.spacing.xl};
      `;
  }
};

const getVariantStyles = (variant: CardProps['$variant']) => {
  switch (variant) {
    case 'highlighted':
      return css`
        background: ${({ theme }) => theme.colors.surface};
        border: 2px solid ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 30px ${({ theme }) => theme.colors.primary}30,
                    inset 0 0 60px ${({ theme }) => theme.colors.primary}08,
                    0 8px 24px rgba(0, 0, 0, 0.6);
        position: relative;
        
        /* Glow effect */
        &::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: ${({ theme }) => theme.colors.gradient};
          border-radius: ${({ theme }) => theme.borderRadius.lg};
          opacity: 0.15;
          z-index: -1;
          filter: blur(10px);
        }
      `;
    case 'glass':
      return css`
        background: ${({ theme }) => theme.colors.surface}cc;
        backdrop-filter: blur(12px);
        border: 1px solid ${({ theme }) => theme.colors.border};
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
                    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
      `;
    case 'default':
    default:
      return css`
        background: ${({ theme }) => theme.colors.surface};
        border: 1px solid ${({ theme }) => theme.colors.border};
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      `;
  }
};

export const Card = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  
  ${({ $padding }) => getPaddingStyles($padding)}
  ${({ $variant }) => getVariantStyles($variant)}
  
  ${({ $hoverable, theme }) =>
    $hoverable &&
    css`
      cursor: pointer;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px ${theme.colors.shadowDark},
                    0 0 50px ${theme.colors.primary}20;
        border-color: ${theme.colors.primary};
      }
      
      &:active {
        transform: translateY(-2px);
      }
    `}
`;