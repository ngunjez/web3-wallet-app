import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { formatETH, formatUSDT } from '../utils/format';

interface BalanceCardProps {
  type: 'eth' | 'usdt';
  balance: string;
  isLoading: boolean;
}

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BalanceLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const TokenIcon = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.black};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 0 20px ${({ $color }) => $color}80,
              0 4px 12px rgba(0, 0, 0, 0.5);
  border: 2px solid ${({ $color }) => $color}40;
`;

const BalanceAmount = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeights.black};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const BalanceSymbol = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LoadingDot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out ${({ $delay }) => $delay}s infinite;
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const getTokenConfig = (type: 'eth' | 'usdt') => {
  if (type === 'eth') {
    return {
      label: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      color: '#627EEA',
      formatter: formatETH,
    };
  }
  return {
    label: 'Tether USD',
    symbol: 'USDT',
    icon: '₮',
    color: '#26A17B',
    formatter: formatUSDT,
  };
};

export const BalanceCard: React.FC<BalanceCardProps> = ({ type, balance, isLoading }) => {
  const config = getTokenConfig(type);
  
  return (
    <Card $variant="highlighted" $padding="large">
      <BalanceContainer>
        <BalanceLabel>
          <TokenIcon $color={config.color}>{config.icon}</TokenIcon>
          {config.label}
        </BalanceLabel>
        
        {isLoading ? (
          <LoadingContainer>
            <LoadingDot $delay={0} />
            <LoadingDot $delay={0.2} />
            <LoadingDot $delay={0.4} />
          </LoadingContainer>
        ) : (
          <BalanceAmount>
            {config.formatter(balance)}
            <BalanceSymbol>{config.symbol}</BalanceSymbol>
          </BalanceAmount>
        )}
      </BalanceContainer>
    </Card>
  );
};