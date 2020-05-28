const fs = require("fs");
const _ = require("lodash")
const Jimp = require("jimp")
const { uuid, sha, hashEmailAddress} = require("./unico.js")

const cData = JSON.parse(fs.readFileSync("data/Certification.json", 'utf8'))
const pData = JSON.parse(fs.readFileSync("data/Personne.json", 'utf8'))

function getId(id, file) {
    return _.find(file, function(o) { return o.id == id });
}


let certificats = {}
let badgeAssertion = {}
let ledger = {}
let allbadges = {}

pData.forEach(function(rec, i, a) { 
    try {
        if (rec.fields.Certification) {
    certificats[i] = {}
    certificats[i].id = rec.id
    certificats[i].Prenom = rec.fields.Prenom
    certificats[i].Nom =  rec.fields.Nom
    
    certificats[i].Certificats = rec.fields.Certification
        
        rec.fields.Certification.forEach(function(o, io, ia)  {
        let filename = getId(o, cData).fields.Nom.replace(/[^\w]/g,'').toLowerCase().substring(0, 3) + "-1"  
        let prenomfile = rec.fields.Prenom.toString().toLowerCase().replace(/[^\w]/g,'')

        badgeAssertion[o] = {}
        badgeAssertion[o].uid = uuid()
        badgeAssertion[o].recipient = {}
        badgeAssertion[o].recipient.type = "email"
        badgeAssertion[o].recipient.hashed = true
        badgeAssertion[o].recipient.salt = "designcirculairevillettemakerz"
        badgeAssertion[o].recipient.identity = hashEmailAddress(rec.fields.Email, badgeAssertion[o].recipient.salt )
        badgeAssertion[o].recipient.email = rec.fields.Email
        badgeAssertion[o].image = getId(o, cData).fields.site + "dc/" + filename + "/" + filename + "-"+prenomfile+"-"+badgeAssertion[o].uid + ".png"
        badgeAssertion[o].issuedOn = Math.floor(Date.now()/1000)
        badgeAssertion[o].badge = getId(o, cData).fields.site + "dc/" + filename + ".json"
        badgeAssertion[o].verify = {}   
        badgeAssertion[o].verify.type = "hosted"
        badgeAssertion[o].verify.url = getId(o, cData).fields.site + "dc/" + filename + "/" + filename + "-"+prenomfile+"-"+badgeAssertion[o].uid + ".json"
       

        certificats[i].Certificats[io] = {}
        certificats[i].Certificats[io].name = getId(o, cData).fields.Nom 
        certificats[i].Certificats[io].description = getId(o, cData).fields.Info 
        certificats[i].Certificats[io].niveau = getId(o, cData).fields.Niveau 
        certificats[i].Certificats[io].issuer = getId(o, cData).fields.issuer 
        certificats[i].Certificats[io].tags = getId(o, cData).fields.tags 
        certificats[i].Certificats[io].image = getId(o, cData).fields.site + "dc/" + filename + ".png"
        certificats[i].Certificats[io].criteria = getId(o, cData).fields.criteria
        
        fs.writeFileSync("public/dc/" + filename + ".json", JSON.stringify(certificats[i].Certificats[io], null, 1 )) // create badgefile
        fs.mkdirSync("./public/dc/" + filename,  {recursive: true}); //create folders
        fs.writeFileSync("./public/dc/" + filename + "/" + filename + "-"+prenomfile+"-"+badgeAssertion[o].uid + ".json" , JSON.stringify(badgeAssertion[o], null, 2)) // create assertion
    
        let assert = getId(o, cData).fields.site + "dc/" + filename + "/" + filename + "-"+prenomfile+"-"+badgeAssertion[o].uid + ".json"
        if (!ledger[i]) {ledger[i] = {}}
        ledger[i].Prenom = rec.fields.Prenom
        if (!ledger[i].certs) {ledger[i].certs = {}}
        ledger[i].certs[io] = assert
        if (!ledger[i].certs.uuid) {ledger[i].certs.uuid = {}}
        ledger[i].certs.uuid[io] = badgeAssertion[o].uid

        fs.writeFileSync("./public/dc/dc-ledger.json",  JSON.stringify(ledger, null, 4))

        async function main() {
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        const image = await Jimp.read("./public/dc/" + filename + ".png");
  
  
        image.print(font, 200, 700, rec.fields.Prenom + " " + rec.fields.Nom);
        await image.writeAsync("./public/dc/" + filename + "/" + filename + "-"+prenomfile+"-"+ledger[i].certs.uuid[io] + ".png");
        }
       // main()
    })
}}
catch(e) {console.log(e)}
})

module.exports = {
    certificats:certificats,
}

