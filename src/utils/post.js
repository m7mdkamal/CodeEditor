var xhr = require('xhr');

module.exports = function (url , file) {
    return new Promise(function (resolve, reject) {
        xhr(url , {method:"POST",json:  file } ,function(err, res , body){
            if(err) return reject(err);
            if(res.statusCode !== 200) return reject(new Error(body));
            resolve(body)
        })
    })
}