/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IGlobalConfig {
  getPaymentExternalLink(): Promise<string>;
}

export interface IGlobalConfigWithRaw extends IGlobalConfig {
  getGlobalConfig(): Promise<any>;
}


