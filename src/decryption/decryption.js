import CryptoJS from "crypto-js";

const getEncDecKey = () => {
    try {
        const mainBackendKey = "base64:IH0mh+0AsIqQVW/zULiF+MQesoO69l8MsWZhEdOFbc0=";
        const hashedData = CryptoJS.SHA256(mainBackendKey).toString();
        const substring = hashedData.substring(0, 16);
        const key = CryptoJS.enc.Utf8.parse(substring);
        return key;
    } catch (e) {
        throw new Error(e.toString());
    }
};

export const getDecryptedText = (encryptedText) => {
    try {
        const key = getEncDecKey();
        const iv = CryptoJS.enc.Base64.parse(""); // You need to provide a valid IV here

        const decryptedText = CryptoJS.AES.decrypt(
            { ciphertext: CryptoJS.enc.Base64.parse(encryptedText) },
            key,
            { iv, mode: CryptoJS.mode.ECB }
        ).toString(CryptoJS.enc.Utf8);
        return decryptedText;
    } catch (e) {
        return encryptedText;
    }
};






