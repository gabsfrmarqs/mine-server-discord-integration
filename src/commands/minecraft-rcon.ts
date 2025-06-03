import dotenv from 'dotenv';
import { createRequire } from 'module';

dotenv.config();

const require = createRequire(import.meta.url);
const { connect, TimeoutError } = require('working-rcon');

export class MinecraftRconService {
    private static client: any;

    static async connect() {
        if (!process.env.RCON_IP) {
            throw Error("Could not find RCON_IP in your environment");
        }
        if (!process.env.RCON_PORT) {
            throw Error("Could not find RCON_PORT in your environment");
        }
        if (!process.env.RCON_PASS) {
            throw Error("Could not find RCON_PASS in your environment");
        }

        try {
            this.client = await connect(
                process.env.RCON_IP, 
                process.env.RCON_PORT, 
                process.env.RCON_PASS, 
                5000
            );
            console.log('RCON connected successfully');
            return this.client;
        } catch (err) {
            if (err instanceof TimeoutError) {
                console.error('RCON connection timed out');
            }
            throw err;
        }
    }

    static async disconnect() {
        if (this.client) {
            await this.client.disconnect();
            console.log('RCON disconnected');
        }
    }

    static getClient() {
        return this.client;
    }
}