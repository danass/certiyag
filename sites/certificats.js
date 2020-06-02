//certificats site
const fs = require("fs")
const { ledgerarray } = require("../src/ledgerarray.js")

var QRCode = require('qrcode')
const app = require('express')();
const express = require('express');
const server = require('http').createServer(app).listen(80);
//const server1 = require('http').createServer(app).listen(82);

//const ledger = JSON.parse(fs.readFileSync("./public/dc-ledger.json", "utf8"))





module.exports = async function(site){
  const foldir = process.cwd()


console.log(process.cwd())
  app.use(express.static(process.cwd() + '/public'))
  app.set("view engine", "pug");
 // app.use(express.static(foldir));


  app.get("/", function(req, res, next) {

      res.render("certificats/index", {
        title: "Digital certification",
        ledger : ledger

      });
    
      next();
    });
    
    let qr = ""
   
    app.get("/dc/:uid", function(req, res, next) {
      for (let l of ledgerarray) {
        if (req.params.uid == l.uid) {
         
         QRCode.toDataURL("http://certificats.villettemakerz.com/dc/" + l.uid, function (err, url) {
          qr = url
        })

      res.render("certificats/certificat", {
        title: "Digital certification",
        ledger: l,
        url: "http://certificats.villettemakerz.com/dc/" + l.uid,
        prenom: l.Prenom,
        nom: l.Nom,
        qr:qr


      });
    }}
      next();
    });


}()