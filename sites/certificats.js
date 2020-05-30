//certificats site

const app = require('express')();
const express = require('express');
const server = require('http').createServer(app).listen(80);
const server1 = require('http').createServer(app).listen(82);



module.exports = async function (site) {

   // async function dcvm() {return await db.reload("dcvm").then(function (e) { return e.dcvm.data})}
    app.set("view engine", "pug");
    app.use(express.static('public'))
    app.get("/", async function (req, res, next) {
      
        res.render("certificats/index", {
         title: "Certificats numériques",
        // persons: await dcvm()
 
       });
       next();
     });

}

