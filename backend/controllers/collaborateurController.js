import db from "../models/index.js";
const { Collaborateur } = db;

/**
 * Lister tous les collaborateurs
 */
export const lister = async (req, res) => {
  try {
    const list = await Collaborateur.findAll({ order: [["id", "ASC"]] });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de la récupération." });
  }
};

/**
 * Créer un collaborateur
 */
export const creer = async (req, res) => {
  try {
    const { nom, prenom, email, poste, dateEntree } = req.body;
    if (!nom || !prenom || !email || !poste || !dateEntree) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    const existing = await Collaborateur.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email déjà utilisé." });
    }
    const created = await Collaborateur.create({ nom, prenom, email, poste, dateEntree });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de la création." });
  }
};

/**
 * Mettre à jour un collaborateur
 */
export const modifier = async (req, res) => {
  try {
    const id = req.params.id;
    const collab = await Collaborateur.findByPk(id);
    if (!collab) return res.status(404).json({ message: "Collaborateur non trouvé." });

    const { nom, prenom, email, poste, dateEntree } = req.body;
    // Si l'email change, vérifier unicité
    if (email && email !== collab.email) {
      const exists = await Collaborateur.findOne({ where: { email } });
      if (exists) return res.status(409).json({ message: "Email déjà utilisé." });
    }

    await collab.update({ nom, prenom, email, poste, dateEntree });
    res.json(collab);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de la modification." });
  }
};

/**
 * Supprimer un collaborateur
 */
export const supprimer = async (req, res) => {
  try {
    const id = req.params.id;
    const collab = await Collaborateur.findByPk(id);
    if (!collab) return res.status(404).json({ message: "Collaborateur non trouvé." });

    await collab.destroy();
    res.json({ message: "Collaborateur supprimé." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de la suppression." });
  }
};
