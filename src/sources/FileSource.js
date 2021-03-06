import * as request from './../utils/Requests'
import * as actions from './../actions/actions'

export function fetchFiles() {
    var promise = request.fetch('files')
    promise.then(function (data) {
        data = JSON.parse(data);
        if(data.status == "SUCCESS"){
            actions.fetchFilesSuccess(JSON.parse(data.data));
        }else{
            throw err("failed");
        }
    }).catch(function (err) {
        actions.fetchFilesFailed();
    });
}

export function newFile(fileName) {
    var promise = request.post('files/'+fileName," ");
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
    var promise = request.del('files/'+name);
    promise.then(function (data) {
        console.log(data);
        data = JSON.parse(data);
        if(data.status == "SUCCESS"){
            return actions.deleteFileSuccess(name);
        }
    }).catch(function (err) {
        console.error(err)
        actions.deleteFileFailed();
    })
}