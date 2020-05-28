var Airtable = require('airtable');
var config = require("./config.js");
const fs = require("fs")

var base = new Airtable({apiKey: config.dcvm.auth_key}).base(config.dcvm.base_name);

function tojson(table) {
    return base(table).select({
        // Selecting the first 3 records in Grid view:
        
        //view: "Retrieve"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        try {
            fs.unlinkSync("data/" + table + ".json")
        }
        catch(e) {console.log(e)}
        try {  
        
            fs.appendFile("data/" + table + ".json", JSON.stringify(records, null, 2), function callback(err) {  })
            
        fetchNextPage();
        }
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        catch(e) { console.log(e)}
    
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    
}


tojson("Certification")
tojson("Personne")