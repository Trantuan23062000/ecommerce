import db from "../../models/index"

const getUser = async () => {
    const data = await db.Users.findAll({
        where: {
            role: {
                [db.Sequelize.Op.ne]: 0
            }
        }
    })
    return data
}
module.exports = { getUser }
