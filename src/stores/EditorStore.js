import {EventEmitter} from "events"
import dispatcher from "../dispatcher"
import  * as editorSource from '../sources/EditorSource'
import tabStore from './TabStore'
import fileStore from './FileStore'
import  * as actions from './../actions/actions'
import alertify from 'alertify.js'

var EDITOR_CHANGE_EVENT = 'EDITORCHANGE';
var TAB_CHANGE_EVENT = 'TABCHANGE';
var TAB_CLOSE_EVENT = 'TABCLOSEEVENT';

class EditorStore extends EventEmitter {


    constructor() {
        super();

        this.cache = {};
        this.active = 0;
        this.errors = [];
        this.state = {error: null, selected: null};

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleTabClose = this.handleTabClose.bind(this);
        tabStore.on(TAB_CHANGE_EVENT, this.handleTabChange);
        tabStore.on(TAB_CLOSE_EVENT, this.handleTabClose);
    }

    handleActions(action) {
        switch (action.type) {
            case "FETCH_SOURCE_CODE":
                // this.fetchCode(action.name);
                break;
            case "PULL_CODE_SUCCESS":
                this.fetchCode(action.key, action.code);
                break;
            case "CODE_CHANGED":
                this.handleCodeChanging(action.code);
                break;
            case "CLEAR_FILE_CACHE":
                this.handleTabClose(action.id)
                break;

        }

    }

    handleTabClose(id) {
        delete this.cache[id];
    }

    handleTabChange() {
        var tab = tabStore.getSelectedTab();
        if (tab != null) {
            var id = tab.id;
            if (this.cache[id])
                return this.fetchCode(id, this.cache[id].code)
            editorSource.fetchCode(tab.id);
        } else {
            this.active = 0;
        }
        this.updateView();
    }

    fetchCode(key, code) {
        this.cache[key] = {
            isModified: false,
            code
        };
        this.active = key;
        this.updateView();
    }

    getCurrentCode() {
        // console.log("EDITOR CACHE", this.cache);
        if (this.active == 0) return null;
        return this.cache[this.active].code;
    }

    handleCodeChanging(code) {
        this.cache[tabStore.getSelectedTab().id] = {
            isModified: true,
            code
        }
    }

    updateView() {
        this.emit(EDITOR_CHANGE_EVENT);
    }

}


const editorStore = new EditorStore;
window.EditorS = editorStore;
dispatcher.register(editorStore.handleActions.bind(editorStore));
export default editorStore;