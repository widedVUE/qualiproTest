import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

// ici j'ai chargé les var d env
const {
  DB_HOST = "localhost",
  DB_PORT = 3306,
  DB_NAME = "qualipro_db",
  DB_USER = "root",
  DB_PASS = "",
  DB_DIALECT = "mysql"
  
} = process.env

//  Initialisation Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false, 
  define: {
    freezeTableName: true, 
    underscored: true, 
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "+01:00" 
})

export default sequelize
