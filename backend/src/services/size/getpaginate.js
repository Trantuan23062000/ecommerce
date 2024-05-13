import db from "../../models";
const getUserPagination = async (page, limit) => {
    try {
      let offset = (page - 1) * limit;
      const { count, rows } = await db.Sizes.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "size", "description"],
        order: [["size", "DESC"]],
      });
      let totalPages = Math.ceil(count / limit);
      let data = {
        totalRows: count,
        totalPages: totalPages,
        size: rows,
      };
      return {
        EM: "OK",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: "Something wrongs with servies",
        EC: 1,
        DT: [],
      };
    }
  };


  module.exports = {getUserPagination}