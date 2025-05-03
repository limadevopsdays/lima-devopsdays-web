import { injectable } from "inversify";
import { IGlobalConfig } from "./IGlobalConfig";

@injectable()
export class LocalGlobalConfigService implements IGlobalConfig{
  getPaymentExternalLink(): Promise<string> {
    return Promise.resolve(process.env.NEXT_PUBLIC_PAYMENT_EXTERNAL_LINK ?? "");
  }
}
