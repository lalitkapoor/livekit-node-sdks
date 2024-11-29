// Use the Web Crypto API if available, otherwise fallback to Node.js crypto
export default async function digest(data: string): Promise<ArrayBuffer> {
  if (globalThis.crypto?.subtle) {
    const encoder = new TextEncoder();
    return crypto.subtle.digest('SHA-256', encoder.encode(data));
  } else {
    const nodeCrypto = await import('node:crypto');
    return nodeCrypto.createHash('sha256').update(data).digest();
  }
}
