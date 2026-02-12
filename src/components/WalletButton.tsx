import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { formatAddress } from '../utils/format';

interface WalletButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const AddressDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}40,
              inset 0 0 20px ${({ theme }) => theme.colors.primary}08,
              0 4px 12px rgba(0, 0, 0, 0.4);
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
    }
    50% {
      opacity: 0.5;
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const WalletButton: React.FC<WalletButtonProps> = ({
  isConnected,
  isConnecting,
  address,
  onConnect,
  onDisconnect,
}) => {
  if (isConnected && address) {
    return (
      <ButtonGroup>
        <AddressDisplay>
          <StatusDot />
          {formatAddress(address)}
        </AddressDisplay>
        <Button $variant="outline" $size="medium" onClick={onDisconnect}>
          Disconnect
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <Button
      $variant="primary"
      $size="large"
      onClick={onConnect}
      $isLoading={isConnecting}
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};