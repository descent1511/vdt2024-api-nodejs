import { Sequelize } from 'sequelize-typescript'
import User from '../models/user'
require('dotenv').config();

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: dbPort,
    dialect: "postgres",
    logging: false
})

const models = [
    User 
]

sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     console.log('synced models')
  })
  .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
    } catch (error) {
    }
}

testConnection()

export default sequelize