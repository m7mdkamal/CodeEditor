import dispatcher from "../dispatcher"

export function createFile(name) {
    dispatcher.dispatch({
        type : "CREATE_FILE",
        name
    })
}

export function deleteFile(id) {
    dispatcher.dispatch({
        type : "DELETE_FILE",
        id
    })
}

export function selectFile(id) {
    dispatcher.dispatch({
        type : "SELECT_FILE",
        id
    })
}

export function fetchFilesSuccess(dirs){
    dispatcher.dispatch({
        type: "FETCH_FILES_SUCCESS",
        dirs
    })
}

/*
    Tabs actions
 */
export function openTab(file) {
    dispatcher.dispatch({
        type: "OPEN_TAB",
        file
    })
}

export function closeTab(id) {
    dispatcher.dispatch({
        type: "CLOSE_TAB",
        id
    })
}

export function selectTab(id) {
    dispatcher.dispatch({
        type: "SELECT_TAB",
        id
    })
}

/*
  Editor actions
 */

export function sourceCodeChanged(sourceCode){
    dispatcher.dispatch({
        type: "SOURCECODE_CHANGE",
        sourceCode
    })
}

export function fetchSourceCode(filename){
    dispatcher.dispatch({
        type: "PULL_SOURCECODE",
        filename
    })
}

export function fetchSourceCodeSuccess(code){
    dispatcher.dispatch({
        type: "PULL_SOURCECODE_SUCCESS",
        code
    })
}

export function fetchSourceCodeFail(){
    dispatcher.dispatch({
        type: "PULL_SOURCECODE_FAIL"
    })
}

export function pushSourceCode(filename) {
    dispatcher.dispatch({
        type: "PUSH_SOURCECODE",
        filename
    })
}

export function pushSourceCodeSuccess() {
    dispatcher.dispatch({
        type: "PUSH_SOURCECODE_SUCCESS"
    })
}

