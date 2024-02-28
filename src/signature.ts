import { IConfig } from "./types";

import Crypto from 'crypto-js';

export default class Signature {
    static getSignature(config: IConfig, date: string, policyBase64: string){
        const getSignatureKey = (Crypto: typeof CryptoJS, key: string, dateStamp: string, regionName: string) => {
            const kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
            const kRegion = Crypto.HmacSHA256(regionName, kDate);
            const kService = Crypto.HmacSHA256('s3', kRegion);
            const kSigning = Crypto.HmacSHA256("aws4_request", kService);
            return kSigning;
        }
        const signature = (policyEncoded: string | Crypto.lib.WordArray) => {
            return Crypto.HmacSHA256(
                policyEncoded,
                getSignatureKey(Crypto, config.secretAccessKey, date, config.region)
            ).toString(Crypto.enc.Hex);
        }
        return signature(policyBase64)
    }
}