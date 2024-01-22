import CryptoJS from "crypto-js";

function getEncDecKey() {
    try {
        const mainBackendKey = "base64:IH0mh+0AsIqQVW/zULiF+MQesoO69l8MsWZhEdOFbc0==";
        const hashedData = CryptoJS.SHA256(mainBackendKey).toString(CryptoJS.enc.Hex);
        const substring = hashedData.substring(0, 16); // 32 hex characters (16 bytes)
        const key = CryptoJS.enc.Hex.parse(substring);
        return key;
    } catch (e) {
        throw new Error(e.toString());
    }
}

export function getDecryptedText(encryptedText) {
    try {
        const key = getEncDecKey();
        const decryptedText = CryptoJS.AES.decrypt(encryptedText, key, { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8);
        return decryptedText;
    } catch (e) {
        return encryptedText;
    }
}



