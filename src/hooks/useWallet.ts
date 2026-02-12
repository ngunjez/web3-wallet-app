import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider } from 'ethers';
import { WalletState, ETHEREUM_MAINNET_CHAIN_ID } from '@/src/types/web3';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
    error: null,
  });

  const checkIfWalletIsConnected = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const network = await provider.getNetwork();
        setWalletState({
          address: accounts[0].address,
          isConnected: true,
          isConnecting: false,
          chainId: Number(network.chainId),
          error: null,
        });
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setWalletState(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install MetaMask to use this app.',
      }));
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      
      const chainId = Number(network.chainId);
      
      if (chainId !== ETHEREUM_MAINNET_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }],
          });
          const newNetwork = await provider.getNetwork();
          setWalletState({
            address: accounts[0],
            isConnected: true,
            isConnecting: false,
            chainId: Number(newNetwork.chainId),
            error: null,
          });
        } catch (switchError: any) {
          setWalletState(prev => ({
            ...prev,
            isConnecting: false,
            error: 'Please switch to Ethereum Mainnet in MetaMask.',
          }));
          return;
        }
      } else {
        setWalletState({
          address: accounts[0],
          isConnected: true,
          isConnecting: false,
          chainId,
          error: null,
        });
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setWalletState({
        address: null,
        isConnected: false,
        isConnecting: false,
        chainId: null,
        error: error.message || 'Failed to connect wallet. Please try again.',
      });
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
      error: null,
    });
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWalletState(prev => ({
            ...prev,
            address: accounts[0],
            isConnected: true,
          }));
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [checkIfWalletIsConnected, disconnectWallet]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
  };
};