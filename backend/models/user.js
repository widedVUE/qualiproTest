import { DataTypes } from "sequelize"
import bcrypt from "bcryptjs"

export default (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: "users",
    timestamps: true,
    hooks: {
      //  Avant enregistrement  on hash le mot de passe
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  })

  return User
}
