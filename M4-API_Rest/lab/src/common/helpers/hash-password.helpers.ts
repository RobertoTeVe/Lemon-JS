import crypto from 'crypto';
import { promisify } from 'util';

const randomBytes = promisify(crypto.randomBytes);
const saltLength = 16;

export const generateSalt = async (): Promise<string> => {
    const salt = await randomBytes(saltLength);
    return salt.toString('hex');
};

const iterations = 16384;
const passwordLength = 64; // 512bits = 64Bytes

export const hashPassword = async (
    password: string,
    salt: string
): Promise<string> => {
    const promise = new Promise<string>((resolve, reject) => {
        crypto.scrypt(
            password,
            salt,
            passwordLength,
            {
                cost: iterations,
                blockSize: 8,
                parallelization: 1,
                maxmem: 32 * 1024 * 1024,
            },
            (error, hashedPassword) => {
                if (error) {
                    reject(error);
                }

                resolve(hashedPassword.toString('hex'));
            }
        );
    });

    return promise;
};