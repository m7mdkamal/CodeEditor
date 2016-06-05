import {EventEmitter} from "events"
import dispatcher from "../dispatcher"


var FILE_CHANGE_EVENT = 'FILECHANGE';

class FileStore extends EventEmitter {

    constructor() {
        super();

        this.files = [
            {
                fileName : "java1.java",
                isSelected : false,
                id : 1
            },
            {
                fileName : "ja42.java",
                isSelected : true,
                id : 2
            },
            {
                fileName : "java2.java",
                isSelected : false,
                id : 3
            }
        ];
        this.errors = [];
        this.state = {error: null, selected: null};
    }


    fetchDirectoriesSuccess(directories) {

        this.files = directories.map((file)=> {
            return {
                fileName: file.fileName,
                id: file.id,
                isSelected: false
            }
        });

        //console.log(directories)
    }


    updatefile(file) {
        this.files = file
    }

    getFiles() {
        return this.files
    }

    handleActions(action) {
        // console.log("filestore received an action", action)
        switch (action.type) {
            case "CREATE_FILE" :
                this.addFile(action.name);
                break;
            case "SELECT_FILE":
                this.selectFile(action.id);
                break;
            case "DELETE_FILE":
                this.deleteFile(action.id);
                break;
            case "FETCH_FILES_SUCCESS":
                this.fetchDirectoriesSuccess(action.dirs)
                break
        }
        this.emit(FILE_CHANGE_EVENT)
    }

    addFile(fileName) {
        if (this.searchByFileName(fileName) != null) {
            this.errors.push("File name exist");
            return
        }
        this.files.push({
            fileName: fileName,
            isSelected: false,
            id: fileName
        })
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
                this.files.splice(this.files.indexOf(file), 1);
                return
            }
        });
        this.state.error = "Error";
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

    getErrors() {
        return this.errors;
    }

    clearErrors() {
        this.errors = []
    }
}

const fileStore = new FileStore;

dispatcher.register(fileStore.handleActions.bind(fileStore));
// window.dispatcher = dispatcher
export default fileStore;