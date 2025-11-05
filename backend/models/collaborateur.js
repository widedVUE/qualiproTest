import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Collaborateur = sequelize.define("Collaborateur", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    poste: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    dateEntree: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "date_entree",
      validate: { isDate: true }
    }
  }, {
    tableName: "collaborateurs",
    timestamps: false
  });

  return Collaborateur;
};
