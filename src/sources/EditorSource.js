import * as request from './../utils/Requests'
import * as actions from './../actions/actions'

export function fetchCode(name) {
    var promise = request.fetch('files/' + name);
    promise.then(function (data) {
        data = JSON.parse(data);
        if (data.status == "SUCCESS") {
            return actions.fetchCodeSuccess(name, data.data);
        }
    }).catch(function (err) {

    })
}

export function updateFile(file, sourceCode) {
    var promise = request.post('files/' + file, sourceCode);
    promise.then(function (files) {
        console.log(files);
        actions.postFileSuccess(JSON.parse(files));
    }).catch(function (err) {

    })
}


export function compile() {
    var promise = request.post('compile');
    promise.then(function (data) {
        console.log(data);
        data = JSON.parse(data);
        // if(data.status == "SUCCESS" || data.status == "SUCCESS")
        actions.compileSuccess(data.data);

    }).catch(function (err) {

    })
}

export function fetchDependency() {
    var promise = request.fetch('dependency');
    promise.then(function (data) {
        data = JSON.parse(data);
        if (data.status == "SUCCESS") {
            return actions.fetchDependencySuccess(data.data);
        }
    }).catch(function (err) {

    })
}

export function updateDependency(pom) {
    var promise = request.post('dependency', pom);
    promise.then(function (data) {
        actions.updateDependencySuccess();
    }).catch(function (err) {

    })
}