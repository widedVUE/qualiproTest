import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: "Token manquant." })

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    const msg = err.name === "TokenExpiredError"
      ? "Token expiré, veuillez vous reconnecter."
      : "Token invalide."
    res.status(401).json({ message: msg })
  }
}
