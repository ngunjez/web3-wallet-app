import React from "react";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface}e6;
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  animation: slideInDown 0.5s ease-out;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.5),
    0 0 40px ${({ theme }) => theme.colors.primary}10;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.black};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-shadow:
    0 0 20px ${({ theme }) => theme.colors.primary}80,
    0 0 40px ${({ theme }) => theme.colors.primary}40;

  &::before {
    content: "◆";
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    animation: glow 2s ease-in-out infinite;
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.primary});
  }
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xxxl}
    ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl}
      ${({ theme }) => theme.spacing.md};
  }
`;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo>Web3 Wallet</Logo>
        </HeaderContent>
      </Header>

      <Main>{children}</Main>
    </LayoutContainer>
  );
};
