import {EventEmitter} from "events"
import dispatcher from "../dispatcher"
import  * as actions from './../actions/actions'
import fileStore from './FileStore'
import * as editorSource from './../sources/EditorSource'
// import editorStore from './EditorStore'

// var TAB_CHANGE_EVENT = 'TABCHANGE';
var LOG_CHANGE_EVENT = 'LOGCHANGEEVENT';

class LogsStore extends EventEmitter {


    constructor() {
        super();

        this.logs = [];
        this.errors = [];
        this.state = {};

        this.currentFileKey = "";
    }

    handleActions(action) {
        switch (action.type) {
            case "COMPILE":
                this.compile();
                break;
            case "COMPILE_SUCCESS":
                this.compileSuccess(action.log);
                break;
            //todo: handle failer
            case "ADD_LOG" :
                this.addLog(action.log);
                break;
            case "CLEAR_LOGS":
                this.clearLogs();
                break;

        }
    }

    compile() {
        editorSource.compile();
    }

    compileSuccess(log){
        this.addLog(log)
    }

    getLogs() {
        return this.logs
    }

    addLog(log) {
        this.logs.push(log)
        this.updateView(LOG_CHANGE_EVENT);
    }

    clearLogs() {
        console.log("Clear logs")
        this.logs = [];
        this.updateView(LOG_CHANGE_EVENT);
    }

    updateView(eventName) {
        this.emit(eventName);
    }
}

const logsStore = new LogsStore;

dispatcher.register(logsStore.handleActions.bind(logsStore));
export default logsStore;