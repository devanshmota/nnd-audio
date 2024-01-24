import { SHA256, enc, AES, mode as _mode } from 'crypto-js';

const encDecPrivateKey = 'base64:IH0mh+0AsIqQVW/zULiF+MQesoO69l8MsWZhEdOFbc0=';

const getEncDecKey = () => {
    try {
        const mainBackendKey = encDecPrivateKey;
        const hashedData = SHA256(mainBackendKey).toString(enc.Hex);
        const key = enc.Hex.parse(hashedData.substring(0, 16));
        return key;
    } catch (e) {
        throw new Error(e.toString());
    }
};

export const getDecryptedText = (encryptedText) => {
    try {
        const key = getEncDecKey();

        
        const ciphertext = enc.Base64.parse(encryptedText);

        console.log('Key:', key);
        console.log('Encrypted Text:', encryptedText);
        console.log('Ciphertext:', ciphertext);

        
        const decrypted = AES.decrypt({ ciphertext }, key, {
            mode: _mode.ECB,
        }).toString(enc.Utf8);

        console.log('Decrypted Text:', decrypted);
        return decrypted;
    } catch (e) {
        console.error('Decryption Error:', e.toString());
        return encryptedText;
    }
};
