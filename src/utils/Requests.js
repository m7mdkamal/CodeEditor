var xhr = require('xhr');

export function del(url) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    return new Promise(function (resolve, reject) {
        xhr(url + "/", {method: "DELETE", headers: {'X-CSRF-TOKEN': token}}, function (err, res, body) {
            if (err) return reject(err);
            if (res.statusCode !== 200) return reject(new Error(body));
            resolve(body)
        })
    })
}

export function fetch(url) {
    return new Promise(function (resolve, reject) {
        xhr(url + "/", {timeout: 5000},
            function (err, res, body) {
                if (err) return reject(err);
                if (res.statusCode !== 200) return reject(new Error(body));
                resolve(body)
            })
    })
}

export function post(url, file) {
    var token = $("meta[name='_csrf']").attr("content");
    return new Promise(function (resolve, reject) {
        xhr(url + "/", {method: "POST", body: file, headers: {'X-CSRF-TOKEN': token}}, function (err, res, body) {
            if (err) return reject(err);
            if (res.statusCode !== 200) return reject(new Error(body));
            resolve(body)
        })
    })
}