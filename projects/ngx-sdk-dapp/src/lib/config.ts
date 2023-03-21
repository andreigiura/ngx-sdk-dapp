import { InjectionToken } from '@angular/core';

interface AuthApis {
  [index: string]: string;
}

export const DAPP_CONFIG = new InjectionToken<DappConfig>('config');
export interface DappConfig {
  apiURL: string;
  gatewayURL: string;
  walletURL: string;
  explorerURL: string;
  chainID: string;
  nativeAuthAPIs: AuthApis;
}
