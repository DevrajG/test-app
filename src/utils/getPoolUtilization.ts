import { Pool, UserOwnedPool } from 'web3/pools';
import { getPoolSize } from './getPoolSize';

export function getPoolUtilization(pool?: Pool | UserOwnedPool): number {
  if (!pool) return 0;

  const totalCapital = getPoolSize(pool);

  return totalCapital > 0
    ? (Number(pool?.totalLocked) /
        10 ** pool?.underlying.decimals /
        totalCapital) *
        100
    : 0;
}
