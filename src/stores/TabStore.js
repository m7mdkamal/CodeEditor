import {EventEmitter} from "events"
import dispatcher from "../dispatcher"
import  * as actions from './../actions/actions'
import fileStore from './FileStore'
import * as EditorSource from './../sources/EditorSource'
// import editorStore from './EditorStore'

var TAB_CHANGE_EVENT = 'TABCHANGE';
var TAB_CLOSE_EVENT = 'TABCLOSEEVENT';

class TabStore extends EventEmitter {


    constructor() {
        super();

        this.tabs = [];
        this.errors = [];
        this.state = {error: null, selected: null};

        this.currentFileKey = "";
    }

    handleActions(action) {
        switch (action.type) {
            case "OPEN_TAB" :
                this.openTab(action.file);
                break;
            case "CLOSE_TAB":
                this.closeTab(action.id);
                break;
            case "SELECT_TAB":
                this.selectTab(action.id);
                break;
        }
    }

    openTab(file) {
        // console.log(this.searchTabs(file));
        if (this.searchTabs(file) == null) {
            this.tabs.push({
                fileName: file.fileName,
                isSelected: false,
                id: file.id
            });
        }
        this.selectTab(file.id, {updateView: true});
    }

    searchTabs(file) {
        for (var i = 0; i < this.tabs.length; i++)
            if (file.id == this.tabs[i].id)
                return this.tabs[i];
        return null;
    }

    closeTab(id) {
        for (var i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[i];
            if (tab.id == id) {
                if (tab.isSelected == true) {
                    if (this.tabs.length > 1) {
                        //first tab
                        if (0 == i) {
                            this.selectTab(this.tabs[i + 1].id, {updateView: false});
                        } else {
                            this.selectTab(this.tabs[i - 1].id, {updateView: false});
                        }
                    }
                }
                // editorStore.handleTabClose(id);
                // actions.clearFileCache(id);
                this.tabs.splice(i, 1);
                this.updateView();
                this.emit(TAB_CLOSE_EVENT, id);
                return;
            }
        }
        this.state.error = "Error";
    }

    selectTab(id, options = {updateView: true}) {
        this.tabs.forEach((tab) => {
            tab.isSelected = tab.id == id;
        });
        if (options.updateView) {
            this.updateView();
        }
    }

    getTabs() {
        return this.tabs
    }

    updateView() {
        this.emit(TAB_CHANGE_EVENT);
    }

    getSelectedTab() {
        for (var i = 0; i < this.tabs.length; i++)
            if (true == this.tabs[i].isSelected)
                return this.tabs[i];
        return null;
    }

    getCurrentFileKey() {
        return this.currentFileKey;
    }

}

const tabStore = new TabStore;

dispatcher.register(tabStore.handleActions.bind(tabStore));
export default tabStore;