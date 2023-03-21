import { DappConfig } from 'ngx-sdk-dapp';

export const SDK_DAPP_CONFIG: DappConfig = {
  apiURL: 'https://elrond-api-devnet.public.blastapi.io',
  gatewayURL: 'https://devnet-gateway.multiversx.com',
  walletURL: 'https://devnet-wallet.multiversx.com',
  explorerURL: 'https://devnet-explorer.elrond.com',
  chainID: 'D',
  nativeAuthAPIs: { toolsApi: 'https://tools.multiversx.com' },
};

export const MY_APP_CONFIG = {
  pingPongContractAddress:
    'erd1qqqqqqqqqqqqqpgq72l6vl07fkn3alyfq753mcy4nakm0l72396qkcud5x',
  egldLabel: 'xEGLD',
};
