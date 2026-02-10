/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IGlobalConfig {
  getPaymentExternalLink(): Promise<string>;
  getGlobalConfig(): Promise<any>;
}

export interface IGlobalConfigWithRaw extends IGlobalConfig {
  getGlobalConfig(): Promise<any>;
}


