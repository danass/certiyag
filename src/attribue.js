const certificat = require("./agregebadge").certificats



 let badgeAssertion = {}

// badgeAssertion[i] = {}
// badgeAssertion[i].uid = uuid()
// badgeAssertion[i].recipient = {}
// badgeAssertion[i].recipient.type = "email"
// badgeAssertion[i].recipient.hashed = true
// badgeAssertion[i].recipient.salt = "designcirculaire@villettemakerz.com"
// badgeAssertion[i].recipient.identity = hashEmailAddress(a[i].email, badgeAssertion[i].recipient.salt )
// badgeAssertion[i].image = badgesite + badgefolder + badgetitle + "-" + a[i].prenom.toLowerCase() + ".png"
// badgeAssertion[i].issuedOn = Math.floor(Date.now()/1000)
// badgeAssertion[i].badge = badgesite + badgefolder + badgetitle + ".json"
// badgeAssertion[i].verify = {}
// badgeAssertion[i].verify.type = "hosted"
// badgeAssertion[i].verify.url = badgesite + badgefolder + badgetitle + "-"+a[i].prenom.toLowerCase()+"-"+badgeAssertion[i].uid + ".json"