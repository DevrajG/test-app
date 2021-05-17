import { useState, useEffect, useCallback } from 'react';
import { ethers, BigNumber } from 'ethers';

import { useTransact } from 'hooks';
import { useWeb3 } from 'state/application/hooks';
import { useTokenContract } from './useContract';

export function useApproval(fromAddress: string, toAddress: string) {
  const { signer, account } = useWeb3();
  const [loading, setLoading] = useState(true);
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const tokenContract = useTokenContract(fromAddress);
  const transact = useTransact();

  const fetchAllowance = useCallback(async () => {
    if (!tokenContract) return;

    const allowance = await tokenContract?.allowance(account, toAddress);

    setAllowance(allowance);
    setLoading(false);
  }, [tokenContract, account, toAddress]);

  useEffect(() => {
    if (account && toAddress && tokenContract) {
      fetchAllowance().catch((e) => console.error(e));
    }

    const refreshInterval = setInterval(fetchAllowance, 1000);

    return () => clearInterval(refreshInterval);
  }, [account, tokenContract, toAddress, fetchAllowance]);

  const handleApprove = useCallback(async (approval: boolean = true) => {
    if (!tokenContract || !toAddress || !signer) return;

    try {
      const symbol = await tokenContract.connect(signer!).symbol();

      return transact(
        tokenContract
          .connect(signer!)
          .approve(toAddress, approval ? ethers.constants.MaxUint256 : 0),
        {
          closeOnSuccess: true,
          option: null,
          description: `${approval ? 'Approve' : 'Disapprove'} ${symbol} transfer`,
        },
      );
    } catch (e) {
      return console.error(e);
    }
  }, [signer, transact, toAddress, tokenContract]);

  return { loading, allowance, onApprove: handleApprove };
}

export default useApproval;