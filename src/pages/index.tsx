import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout } from '@/Layout';
import { WalletButton } from '../components/WalletButton';
import { BalanceCard } from '../components/BalanceCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { Card } from '../components/Card';
import { useWallet } from '../hooks/useWallet';
import { useBalances } from '../hooks/useBalances';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  animation: fadeIn 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.huge};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: slideInDown 0.6s ease-out;
  filter: drop-shadow(0 0 30px ${({ theme }) => theme.colors.primary}40);
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: slideInUp 0.6s ease-out 0.2s backwards;
`;

const ConnectSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  animation: slideInUp 0.6s ease-out 0.4s backwards;
`;

const BalancesSection = styled.section`
  animation: slideInUp 0.6s ease-out 0.6s backwards;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}20;
  
  &::before {
    content: '';
    width: 6px;
    height: 40px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.primary}60;
  }
`;

const BalancesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
`;

const EmptyStateIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.huge};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.3;
`;

const EmptyStateText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NetworkBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: ${({ theme }) => theme.colors.primary}25;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}40,
              inset 0 0 20px ${({ theme }) => theme.colors.primary}10,
              0 4px 12px rgba(0, 0, 0, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const NetworkDot = styled.span`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
`;

const ErrorContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  word-break: break-all;
`;

export default function Home() {
  const { address, isConnected, isConnecting, chainId, error, connectWallet, disconnectWallet } = useWallet();
  const { eth, usdt, isLoading, error: balanceError } = useBalances(address, isConnected);
  const [dismissedError, setDismissedError] = useState(false);

  const displayError = error || balanceError;
  const showError = displayError && !dismissedError;

  return (
    <Layout>
      <Container>
        <Hero>
          <Title>Web3 Wallet Dashboard</Title>
          <Subtitle>
            Connect your MetaMask wallet to view your Ethereum and USDT balances on Ethereum Mainnet
          </Subtitle>
          
          <ConnectSection>
            <WalletButton
              isConnected={isConnected}
              isConnecting={isConnecting}
              address={address}
              onConnect={connectWallet}
              onDisconnect={disconnectWallet}
            />
          </ConnectSection>
        </Hero>

        {showError && (
          <ErrorContainer>
            <ErrorMessage
              message={displayError}
              onDismiss={() => setDismissedError(true)}
            />
          </ErrorContainer>
        )}

        {isConnected && address && (
          <>
            <NetworkBadge>
              <NetworkDot />
              Ethereum Mainnet
            </NetworkBadge>

            <InfoCard $variant="glass" $padding="medium">
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Connected Address</InfoLabel>
                  <InfoValue>{address}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Network</InfoLabel>
                  <InfoValue>Ethereum Mainnet (Chain ID: {chainId})</InfoValue>
                </InfoItem>
              </InfoGrid>
            </InfoCard>

            <BalancesSection>
              <SectionTitle>Your Balances</SectionTitle>
              <BalancesGrid>
                <BalanceCard type="eth" balance={eth} isLoading={isLoading} />
                <BalanceCard type="usdt" balance={usdt} isLoading={isLoading} />
              </BalancesGrid>
            </BalancesSection>
          </>
        )}

        {!isConnected && !isConnecting && (
          <EmptyState $variant="glass" $padding="large">
            <EmptyStateIcon>🔌</EmptyStateIcon>
            <EmptyStateText>
              Connect your wallet to view your balances and interact with the Ethereum blockchain
            </EmptyStateText>
          </EmptyState>
        )}
      </Container>
    </Layout>
  );
}