import pg from 'pg';
import { config } from 'dotenv';
config();
export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});
pool.on('connect', () => {
    console.log('Conectado a la base de datos');
});
pool.on('error', (err) => {
    console.log('Error de la base de datos: ', err);
});
