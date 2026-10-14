import crypto from 'crypto';

/**
 * Hashes a plaintext password using standard scrypt key derivation.
 * Output format: "salt:derivedKeyHex"
 */
export function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Verifies a plaintext password against a stored "salt:derivedKeyHex" hash
 * uses timingSafeEqual to protect against timing attacks.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
    try {
        const [salt, key] = storedHash.split(':');
        if (!salt || !key) return false;

        const keyBuffer = Buffer.from(key, 'hex');
        const derivedKey = crypto.scryptSync(password, salt, 64);

        if (keyBuffer.length !== derivedKey.length) return false;
        return crypto.timingSafeEqual(keyBuffer, derivedKey);
    } catch {
        return false;
    }
}
