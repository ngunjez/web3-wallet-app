export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: string, decimals: number = 4): string => {
  const num = parseFloat(balance);
  if (isNaN(num)) return '0.0000';
  return num.toFixed(decimals);
};

export const formatUSDT = (balance: string): string => {
  return formatBalance(balance, 2);
};

export const formatETH = (balance: string): string => {
  return formatBalance(balance, 4);
};