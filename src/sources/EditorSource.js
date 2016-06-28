import * as request from './../utils/Requests'
import * as actions from './../actions/actions'

export function fetchCode(name) {
    var promise = request.fetch('http://localhost:8080/files/' + name);
    promise.then(function (data) {
        data = JSON.parse(data);
        if(data.status == "SUCCESS"){
            return actions.fetchCodeSuccess(name, data.data);
        }
    }).catch(function (err) {

    })
}

export function updateFile(file,sourceCode) {
    var promise = request.post('http://localhost:8080/files/' + file,sourceCode);
    promise.then(function (files) {
        console.log(files);
        actions.postFileSuccess(JSON.parse(files));
    }).catch(function (err) {

    })
}


export function compile() {
    var promise = request.post('http://localhost:8080/compile');
    promise.then(function (data) {
        console.log(data);
        data = JSON.parse(data);
        // if(data.status == "SUCCESS" || data.status == "SUCCESS")
            actions.compileSuccess(data.data);
        
    }).catch(function (err) {

    })
}