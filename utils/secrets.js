import path from 'path';
import { config } from 'dotenv';

config({ path: path.join(path.resolve(), 'config/config.env') });

export const JWT_SECRET = process.env.SECRET;
export const JWT_EXPIRE_TIME = process.env.EXPIRES;
