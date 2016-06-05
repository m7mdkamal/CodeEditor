import {EventEmitter} from "events"
import dispatcher from "../dispatcher"


var TAB_CHANGE_EVENT = 'TABCHANGE';

class TabStore extends EventEmitter {


    constructor() {
        super();
        this.tabs = [];
        this.errors = [];
        this.state = {error: null, selected: null};
    }

    handleActions(action) {
        console.log("TabStore received an action", action)
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
        this.updateView();
    }

    openTab(file) {
        if (!this.searchTabs(file.id))
            this.tabs.push(file)
    }

    searchTabs(id) {
        this.tabs.forEach((tab)=> {
            if (id == tab.id) {
                return tab;
            }
        });
        return null;
    }

    closeTab(id) {
        this.tabs.forEach((tab) => {
            if (tab.id == id) {
                this.tabs.splice(this.tabs.indexOf(tab), 1);
                return
            }
        });
        this.state.error = "Error";
    }

    selectTab(id){
        this.tabs.forEach((tab) => {
            if (tab.id === id) {
                tab.isSelected = true;
            } else {
                tab.isSelected = false;
            }
        });
    }

    getTabs() {
        return this.tabs
    }

    updateView() {
        this.emit(TAB_CHANGE_EVENT);
    }

}


const tabStore = new TabStore;

dispatcher.register(tabStore.handleActions.bind(tabStore));
export default tabStore;