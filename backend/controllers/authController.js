import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import db from "../models/index.js"

dotenv.config()
const { User } = db
const JWT_SECRET = process.env.JWT_SECRET

//  Enregistrement d'un user
export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: "Email et mot de passe requis." })

    const existing = await User.findOne({ where: { email } })
    if (existing) return res.status(409).json({ message: "Email déjà utilisé." })

    const user = await User.create({ email, password })
    res.status(201).json({ message: "Utilisateur créé avec succès.", user: { id: user.id, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur lors de l'inscription." })
  }
}

//  Connexion utilisateur
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: "Email et mot de passe requis." })

    const user = await User.findOne({ where: { email } })
    if (!user)
      return res.status(401).json({ message: "Utilisateur introuvable." })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
      return res.status(401).json({ message: "Mot de passe incorrect." })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,  
      { expiresIn: "2h" }
    )

    res.json({ token }) 
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur lors de la connexion." })
  }
}

