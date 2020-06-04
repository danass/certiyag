const fs = require("fs")


const ledger = JSON.parse(fs.readFileSync(process.cwd() + "/public/dc-ledger.json", "utf8"))
let ledgerarray = []
for (e in ledger) {
   for(c in ledger[e].certs) {
   if (ledger[e].certs[c].assertion.badge == "http://certificats.villettemakerz.com/dc/cer-1.json") {
    var theAssertion = ledger[e].certs[c].assertion
    theAssertion.Prenom = ledger[e].Prenom
    theAssertion.Nom = ledger[e].Nom
    ledgerarray.push(theAssertion)
   }}
}
let ledgercerts = []
for (e in ledger) {
   for(c in ledger[e].certs) {
   if (true) {
    var theAssertion = ledger[e].certs[c].assertion
    theAssertion.Prenom = ledger[e].Prenom
    theAssertion.Nom = ledger[e].Nom
    ledgercerts.push(theAssertion)
   }}
}

module.exports = { ledgerarray, ledgercerts }
exports.ledger = this.module