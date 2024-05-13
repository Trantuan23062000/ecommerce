require("dotenv").config()
const cofigCors = (app) =>{
    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
        res.setHeader("Access-Control-Allow-Origin", process.env.PORT_URL);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
      });
      
}
export default cofigCors