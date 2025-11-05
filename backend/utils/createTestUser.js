// backend/utils/createTestUser.js
import bcrypt from "bcryptjs";
import db from "../models/index.js";

const { User } = db;

export const createTestUser = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      console.log("En production — création automatique du compte test désactivée.");
      return;
    }

    const testEmail = "benouniswided@gmail.com";
    const testPassword = "qualipro123";

    const existing = await User.findOne({ where: { email: testEmail } });
    if (!existing) {
      const hashed = await bcrypt.hash(testPassword, 10);
      await User.create({ email: testEmail, password: hashed });
      console.log("Compte test créé :", testEmail);
    } else {
      console.log("Compte test déjà présent :", testEmail);
    }
  } catch (err) {
    console.error("Erreur création compte test :", err);
  }
};
