import sql from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'posts.db');
const db = new sql(dbPath);

export default db; // Samo eksportuje konekciju


