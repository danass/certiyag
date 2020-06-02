const fs = require("fs")


const ledger = JSON.parse(fs.readFileSync("./public/dc-ledger.json", "utf8"))
let ledgerarray = []
for (e in ledger) {
   for(c in ledger[e].certs) {
      console.log(c )
   if (ledger[e].certs[c].assertion.badge == "http://certificats.villettemakerz.com/dc/cer-1.json") {
    var theAssertion = ledger[e].certs[c].assertion
    theAssertion.Prenom = ledger[e].Prenom
    theAssertion.Nom = ledger[e].Nom
    ledgerarray.push(theAssertion)
   }}
}
console.log(ledgerarray)

module.exports = { ledgerarray }
exports.ledger = this.module