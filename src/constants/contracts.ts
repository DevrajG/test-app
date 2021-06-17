import { ChainId } from '@uniswap/sdk';

const MULTICALL_NETWORKS: { [chainId in ChainId | 56 | 137]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
  56: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
  137: '0xCa731e0f33Afbcfa9363d6F7449d1f5447d10C80',
};

const ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS =
  '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8';

export { ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS, MULTICALL_NETWORKS };
