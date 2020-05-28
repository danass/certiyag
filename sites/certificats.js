//certificats site

const app = require('express')();
const server = require('http').createServer(app);



module.exports = async function (site) {

   // async function dcvm() {return await db.reload("dcvm").then(function (e) { return e.dcvm.data})}
    app.set("view engine", "pug");
    
    app.get("/", async function (req, res, next) {
      
        res.render("certificats/index", {
         title: "Certificats numériques",
        // persons: await dcvm()
 
       });
       next();
     });
    
server.listen(80)
}

