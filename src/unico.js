var CryptoJS = require("crypto-js");
var crypto = require('crypto');

function unico(name) {
    let chuc = require('unicode/category/So')
    Object.entries(chuc).find(e => 
        { if (e[1].name.includes(
        ""+name
        .toUpperCase())) {git
            console.log(String.fromCodePoint(parseInt(e[1].value, 16)), e[1]. name,e[1].symbol)
        }})
    }
    
    //unico("heart")

    function uuid(){
        var dt = new Date().getTime();
        var uuid = 'uuidxxxxx-dcvm-4xxx-yxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    function sha(f, c=false) {
        let sha = "sha256$" + CryptoJS.MD5(f).toString()
        if (c) {
            console.log(sha)
        }
        return sha
    }
    

    function hashEmailAddress(email, salt) {
      var sum = crypto.createHash('sha256');
      sum.update(email + salt);
      return 'sha256$'+ sum.digest('hex');
    }

    exports.unico = {
        uuid:uuid,
        unico:unico,
        sha:sha,
        hashEmailAddress:hashEmailAddress
    }

    module.exports = this.unico