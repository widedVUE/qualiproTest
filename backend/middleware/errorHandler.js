// ici Middleware  de gestion des erreurs 

export default function errorHandler(err, req, res, next) {
  console.error(" Erreur serveur :", err)

 res.status(err.status || 500).json({
    message: err.message || "Erreur interne du serveur.",
  })
}
