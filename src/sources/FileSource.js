import * as request from './../utils/Requests'
import * as actions from './../actions/actions'

export function fetchFiles() {
    var promise = request.fetch('http://localhost:8080/files')
    promise.then(function (data) {
        data = JSON.parse(data);
        if(data.status == "SUCCESS"){
            console.log(data);
            actions.fetchFilesSuccess(JSON.parse(data.data));
        }else{
            throw err("failed");
        }
    }).catch(function (err) {
        actions.fetchFilesFailed();
    });
}

export function newFile(fileName) {
    var promise = request.post('http://localhost:8080/files/'+fileName," ");
    promise.then(function (data) {
        data = JSON.parse(data);
        if(data.status == "SUCCESS"){
            actions.createFileSuccess(fileName);
        }else{
            throw err("failed");
        }
    }).catch(function (err) {
        actions.createFileFailed();
    })
}

export function deleteFile(name) {
    var promise = request.del('http://localhost:8080/files/'+name);
    promise.then(function (data) {
        data = JSON.parse(data);
        if(data.status == "SUCCESS"){
            actions.deleteFileSuccess(name);
        }else{
            throw err("failed");
        }
    }).catch(function (err) {
        actions.deleteFileFailed();
    })
}