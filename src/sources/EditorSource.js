import * as request from './../utils/Requests'
import * as actions from './../actions/actions'

export function fetchCode(name) {
    var promise = request.fetch('http://localhost:8080/files/' + name);
    promise.then(function (code) {
        // console.log("FETCHCODE", code);
        actions.fetchCodeSuccess(name, code);
    }).catch(function (err) {

    })
}

export function updateFile(file) {
    var promise = request.post('https://project-2517129240075729404.firebaseio.com/files.json',file)
    promise.then(function (files) {
        console.log(files);
        actions.postFileSuccess(JSON.parse(files));
    }).catch(function (err) {

    })
}

// export function deleteFile(name) {
//     var promise = del('https://project-2517129240075729404.firebaseio.com/files/'+name+'.json');
//     promise.then(function (files) {
//         console.log(files);
//         actions.deleteFileSuccess(JSON.parse(files));
//     }).catch(function (err) {
//
//     })
// }