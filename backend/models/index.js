import sequelize from "../config/db.js"
import defineCollaborateur from "./collaborateur.js"
import defineUser from "./user.js"

const db = {}
db.sequelize = sequelize
db.Collaborateur = defineCollaborateur(sequelize)
db.User = defineUser(sequelize)

export default db
