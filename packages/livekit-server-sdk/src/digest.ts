// Use the Web Crypto API if available, otherwise fallback to Node.js crypto
export default async function digest(algorithm: string, data: ArrayBuffer): Promise<ArrayBuffer> {
  if (globalThis.crypto?.subtle) {
    return globalThis.crypto.subtle.digest(algorithm, data);
  } else {
    const nodeCrypto = await import('node:crypto');
    const hash = nodeCrypto.createHash(algorithm.replace('-', '').toLowerCase());
    hash.update(Buffer.from(data));
    return hash.digest();
  }
}
