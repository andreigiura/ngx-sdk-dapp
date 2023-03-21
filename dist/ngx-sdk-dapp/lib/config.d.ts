import { InjectionToken } from '@angular/core';
interface AuthApis {
    [index: string]: string;
}
export declare const DAPP_CONFIG: InjectionToken<DappConfig>;
export interface DappConfig {
    apiURL: string;
    gatewayURL: string;
    walletURL: string;
    explorerURL: string;
    chainID: string;
    nativeAuthAPIs: AuthApis;
}
export {};
