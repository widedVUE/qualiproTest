import express from "express"
import { lister, creer, modifier, supprimer } from "../controllers/collaborateurController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()
router.get("/", authMiddleware, lister)
router.post("/", authMiddleware, creer)
router.put("/:id", authMiddleware, modifier)
router.delete("/:id", authMiddleware, supprimer)


export default router