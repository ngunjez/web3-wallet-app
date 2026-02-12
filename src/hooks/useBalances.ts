import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, Contract, formatUnits } from 'ethers';
import { BalanceState, USDT_CONTRACT_ADDRESS } from '@/src/types/web3';

// Minimal ERC20 ABI for balanceOf
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export const useBalances = (address: string | null, isConnected: boolean) => {
  const [balances, setBalances] = useState<BalanceState>({
    eth: '0.0000',
    usdt: '0.00',
    isLoading: false,
    error: null,
  });

  const fetchBalances = useCallback(async () => {
    if (!address || !isConnected || typeof window === 'undefined' || !window.ethereum) {
      return;
    }

    setBalances(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const provider = new BrowserProvider(window.ethereum);
      
      // Fetch ETH balance
      const ethBalance = await provider.getBalance(address);
      const ethFormatted = formatUnits(ethBalance, 18);
      
      // Fetch USDT balance
      const usdtContract = new Contract(USDT_CONTRACT_ADDRESS, ERC20_ABI, provider);
      const usdtBalance = await usdtContract.balanceOf(address);
      const usdtDecimals = await usdtContract.decimals();
      const usdtFormatted = formatUnits(usdtBalance, usdtDecimals);
      
      setBalances({
        eth: ethFormatted,
        usdt: usdtFormatted,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('Error fetching balances:', error);
      setBalances(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch balances. Please try again.',
      }));
    }
  }, [address, isConnected]);

  useEffect(() => {
    if (address && isConnected) {
      fetchBalances();
    }
  }, [address, isConnected, fetchBalances]);

  return {
    ...balances,
    refetch: fetchBalances,
  };
};