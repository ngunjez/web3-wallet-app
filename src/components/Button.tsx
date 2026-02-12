import styled, { css } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  $size?: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
  $isLoading?: boolean;
}

const getSizeStyles = (size: ButtonProps['$size']) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
        font-size: ${({ theme }) => theme.fontSizes.sm};
      `;
    case 'large':
      return css`
        padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xxl}`};
        font-size: ${({ theme }) => theme.fontSizes.lg};
      `;
    case 'medium':
    default:
      return css`
        padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
        font-size: ${({ theme }) => theme.fontSizes.md};
      `;
  }
};

const getVariantStyles = (variant: ButtonProps['$variant']) => {
  switch (variant) {
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.text};
        border: 2px solid ${({ theme }) => theme.colors.secondary};
        box-shadow: 0 0 20px ${({ theme }) => theme.colors.secondary}40,
                    0 4px 12px rgba(0, 0, 0, 0.4);
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.secondary}dd;
          border-color: ${({ theme }) => theme.colors.secondary};
          box-shadow: 0 0 30px ${({ theme }) => theme.colors.secondary}60,
                      0 6px 20px rgba(0, 0, 0, 0.5);
          transform: translateY(-2px);
        }
        
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      `;
    case 'outline':
      return css`
        background: ${({ theme }) => theme.colors.surface};
        color: ${({ theme }) => theme.colors.primary};
        border: 2px solid ${({ theme }) => theme.colors.primary};
        box-shadow: inset 0 0 20px ${({ theme }) => theme.colors.primary}10,
                    0 4px 12px rgba(0, 0, 0, 0.4);
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.primary}25;
          border-color: ${({ theme }) => theme.colors.primary};
          box-shadow: inset 0 0 30px ${({ theme }) => theme.colors.primary}20,
                      0 0 25px ${({ theme }) => theme.colors.primary}50,
                      0 6px 20px rgba(0, 0, 0, 0.5);
          transform: translateY(-2px);
        }
        
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: ${({ theme }) => theme.colors.text};
        border: 1px solid ${({ theme }) => theme.colors.border};
        
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.surface};
          border-color: ${({ theme }) => theme.colors.primary};
          transform: translateY(-1px);
        }
      `;
    case 'primary':
    default:
      return css`
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.background};
        border: 2px solid ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 25px ${({ theme }) => theme.colors.primary}60,
                    0 4px 12px rgba(0, 0, 0, 0.5);
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        position: relative;
        overflow: hidden;
        
        /* Shimmer effect on hover */
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }
        
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.primary};
          border-color: ${({ theme }) => theme.colors.primary};
          box-shadow: 0 0 35px ${({ theme }) => theme.colors.primary}80,
                      0 0 50px ${({ theme }) => theme.colors.primary}40,
                      0 6px 20px rgba(0, 0, 0, 0.6);
          transform: translateY(-3px);
          
          &::before {
            left: 100%;
          }
        }
        
        &:active:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 25px ${({ theme }) => theme.colors.primary}60,
                      0 2px 8px rgba(0, 0, 0, 0.5);
        }
      `;
  }
};

export const Button = styled.button<ButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  
  ${({ $size }) => getSizeStyles($size)}
  ${({ $variant }) => getVariantStyles($variant)}
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
    filter: grayscale(0.5);
  }
  
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      pointer-events: none;
      
      &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;