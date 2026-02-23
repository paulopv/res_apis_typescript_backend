// src/config/db.ts
import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config();
console.log(process);

const db = new Sequelize(process.env.DATABASE_URL!, {
   models:[__dirname + '/../models/**/*']
})

export default db
