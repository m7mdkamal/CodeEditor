var xhr = require('xhr');

export function del(url) {
    return new Promise(function (resolve, reject) {
        xhr(url+"/" , {method:"DELETE"} ,function(err, res , body){
            if(err) return reject(err);
            if(res.statusCode !== 200) return reject(new Error(body));
            resolve(body)
        })
    })
}

export function fetch(url) {
    return new Promise(function (resolve, reject) {
        xhr(url+"/" ,{timeout:5000},
                function(err, res , body){
            if(err) return reject(err);
            if(res.statusCode !== 200) return reject(new Error(body));
            resolve(body)
        })
    })
}

export function post(url , file) {
    return new Promise(function (resolve, reject) {
        xhr(url+"/" , {method:"POST",body:  file } ,function(err, res , body){
            if(err) return reject(err);
            if(res.statusCode !== 200) return reject(new Error(body));
            resolve(body)
        })
    })
}