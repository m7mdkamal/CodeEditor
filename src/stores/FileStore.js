import {EventEmitter} from "events"
import dispatcher from "../dispatcher"
import * as fileSource from '../sources/FileSource'
import * as Actions from '../actions/actions'
import TabStore from './TabStore'
var FILE_CHANGE_EVENT = 'FILECHANGE';
var FILE_MSG_EVENT = 'FILEMSG';

class FileStore extends EventEmitter {

    constructor() {
        super();

        this.files = [];
        this.msgs = [];


        this.state = {error: null, selected: null};

        fileSource.fetchFiles();
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_FILE" :
                this.createFile(action.name);
                break;
            case "CREATE_FILE_SUCCESS":
                this.createFileSuccess(action.name);
                break;
            case "CREATE_FILE_FAILED":
                this.createFileFailed(action.name);
                break;

            case "SELECT_FILE":
                this.selectFile(action.id);
                break;

            case "DELETE_FILE":
                this.deleteFile(action.id);
                break;
            case "DELETE_FILE_SUCCESS":
                this.deleteFileSuccess(action.name);
                break;
            case "DELETE_FILE_FAILED":
                this.deleteFileFailed();
                break;

            case "FETCH_FILES_SUCCESS":
                this.fetchDirectoriesSuccess(action.files);
                break;

            case "FETCH_FILES_FAILED":
                this.fetchDirectoriesFailed();
                break;

        }
        this.updateView(FILE_CHANGE_EVENT)
    }

    fetchDirectoriesSuccess(files) {
        this.files = files.map((file)=> {
            return {
                fileName: file.fileName,
                id: file.fileName,
                isSelected: false
            }
        });
    }

    fetchDirectoriesFailed() {
        this.msgs.push({
            type: "ERROR",
            text: "Error: Connection Failed"
        });
        this.updateView(FILE_MSG_EVENT);
    }

    updatefile(file) {
        this.files = file
    }

    getFiles() {
        return this.files
    }

    createFile(fileName) {
        fileSource.newFile(fileName);
    }

    createFileSuccess(fileName) {
        if (this.searchByFileName(fileName) != null) {
            this.msgs.push({
                type: "ERROR",
                text: "File name exist"
            });
            this.updateView(FILE_MSG_EVENT);
            return
        }
        var file = {
            fileName: fileName,
            isSelected: false,
            id: fileName
        };
        this.files.push(file);
        this.msgs.push({
            type: "LOG",
            text: fileName + " Created"
        });
        this.updateView(FILE_MSG_EVENT);

    }


    createFileFailed() {
        this.msgs.push({
            type: "ERROR",
            text: "Error: Connection Failed"
        });
        this.updateView(FILE_MSG_EVENT);
    }

    selectFile(id) {
        this.files.forEach((file) => {
            if (file.id === id) {
                file.isSelected = true;
            } else {
                file.isSelected = false;
            }
        });
        this.emit("change")
    }

    deleteFile(id) {
        this.files.forEach((file) => {
            if (file.id == id) {
                fileSource.deleteFile(file.fileName);
                return
            }
        });
    }

    deleteFileSuccess(name){
        this.files.forEach((file) => {
            if (file.id == name) {
                this.files.splice(this.files.indexOf(file), 1);
                TabStore.closeTab(file.id);

                this.msgs.push({
                    type: "LOG",
                    text: name + " Deleted"
                });
                this.updateView(FILE_MSG_EVENT);
                return
            }
        });
        // this.msgs.push({
        //     type: "ERROR",
        //     text: "Error: File not found"
        // });
        // this.updateView(FILE_MSG_EVENT);
        // return Actions.closeTab(name);
    }


    deleteFileFailed(){
        this.msgs.push({
            type: "ERROR",
            text: "Error: Delete Failed"
        });
        this.updateView(FILE_MSG_EVENT);
    }

    getSelectedFile() {
        for (var i = 0; i < this.files.length; i += 1) {
            if (this.files[i].isSelected) {
                return this.files[i];
            }
        }
        return null;
    }

    searchByFileName(fileName) {
        for (var i = 0; i < this.files.length; i += 1) {
            if (this.files[i].fileName == fileName) {
                return this.files[i];
            }
        }
        return null;
    }

    getMsgs() {
        return this.msgs;
    }

    clearMsgs() {
        this.msgs = []
    }

    updateView(eventName) {
        this.emit(eventName);
    }
}

const fileStore = new FileStore;

dispatcher.register(fileStore.handleActions.bind(fileStore));
// window.dispatcher = dispatcher;
export default fileStore;