const bakery = require('openbadges-bakery-v2');
const fs = require("fs")

const ledger = JSON.parse(fs.readFileSync("./public/dc-ledger.json", "utf8"))
for (e in ledger) {
   for(c in ledger[e].certs) {
    var theAssertion =ledger[e].certs[c].assertion
    var img=fs.readFileSync("public/" + ledger[e].certs[c].assertion.image.substring(38));
    var options = {
        image: img,
        assertion: theAssertion,
    };
       //console.log(ledger[e].certs[c].assertion)
       bakery.bake(options, function(err, data){
        //give the baked badge a file name
        var fileName = ledger[e].certs[c].assertion.image.substring(38);
        var imagePath = "public/"+fileName;//"baked" directory
        //write the returned baked badge data to file
        fs.writeFile(imagePath, data, function (err) {
            if(err) {console.log(err)}
            
        });
    });
    
    
   }
}



