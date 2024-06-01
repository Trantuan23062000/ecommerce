import db from "../../models";

const getBanner = async () =>{
  const allbanner = await db.Banner.findAll()
  return allbanner
}

module.exports = {getBanner}