import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import db from "./models/index.js"

import authRoutes from "./routes/authRoutes.js"
import collaborateursRoutes from "./routes/collaborateurRoutes.js"
import { authMiddleware } from "./middleware/authMiddleware.js"
import errorHandler from "./middleware/errorHandler.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

//  Middlewares globaux
app.use(cors({ origin: "*" })) 
app.use(express.json())

// mes  Routes principales 
app.use("/api", authRoutes)
app.use("/api/collaborateurs", collaborateursRoutes)

app.get("/", (req, res) => {
  res.json({ message: "API en ligne et opérationnelle" })
})

//  Middleware global d’erreurs
app.use(errorHandler)

//  Connexion et synchronisation DB
db.sequelize
  .authenticate()
  .then(() => {
    console.log(" Connexion à la base de données réussie.")
    return db.sequelize.sync({ alter: false }) 
  })
  .then(() => {
    console.log(" Base de données synchronisée.")
    app.listen(PORT, () => console.log(` Serveur lancé sur le port ${PORT}`))
  })
  .catch((err) => {
    console.error(" Erreur de connexion à la base :", err.message)
    process.exit(1)
  })
