const fs = require("fs");
const _ = require("lodash")
const Jimp = require("jimp")
const { uuid, sha, hashEmailAddress} = require("./unico.js")

const cData = JSON.parse(fs.readFileSync("data/Certification.json", 'utf8'))
const pData = JSON.parse(fs.readFileSync("data/Personne.json", 'utf8'))

function getId(id, file) {
    return _.find(file, function(o) { return o.id == id });
}

//cData.map(r => (r.fields.Personne.map(personne => console.log( getId(personne).fields.Nom ) )))

let certificats = {}
let badgeAssertion = {}
let ledger = {}

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
         certificats[i].Certificats[io].image = getId(o, cData).fields.image
         certificats[i].Certificats[io].criteria = getId(o, cData).fields.criteria
         //console.log(badgeAssertion[o])
         fs.mkdirSync("public/dc/" + filename,  {recursive: true});
         fs.writeFileSync("public/dc/" + filename + "/" + filename + "-"+prenomfile+"-"+badgeAssertion[o].uid + ".json" , JSON.stringify(badgeAssertion[o], null, 2))
         let assert = getId(o, cData).fields.site + "public/dc/" + filename + "/" + filename + "-"+prenomfile+"-"+badgeAssertion[o].uid + ".json"
         if (!ledger[i]) {ledger[i] = {}}
         ledger[i].Prenom = rec.fields.Prenom
         if (!ledger[i].certs) {ledger[i].certs = {}}
         ledger[i].certs[io] = assert

        
        })
    }}
    catch(e) {console.log(e)}
})

console.log(ledger)
// let badges = certificats[32].Certificats
// try {
// badges.forEach(o => { let filename = o.name.replace(/[^\w]/g,'').toLowerCase().substring(0, 3)
// fs.writeFileSync("public/dc/" + filename + ".json"  , JSON.stringify(o, null, 2))
// })
// }
// catch (e) {console.log(e)}

// Object.values(certificats).forEach((e, i, a) => {
//    // console.log(a[i])
//    // fs.writeFileSync("public/"+ a[i].verify.url.replace("http://www.super-daniel.com/", "")  , JSON.stringify(a[i], null, 2) )
// })

module.exports = {
    certificats:certificats
}



async function main() {
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const image = await Jimp.read('public/badges/courses/badge-maker1.png');
  
  
    image.print(font, 10, 10, 'Hello World!');
    await image.writeAsync('public/badges/courses/image.png');
  }
  
//  main()