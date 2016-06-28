import dispatcher from "../dispatcher"
import ActionsConstants from "./../constants/ActionsConstants"


/*
 Filebrowser Actions
 */

export function createFile(name) {
    dispatcher.dispatch({
        type: "CREATE_FILE",
        name
    })
}

export function deleteFile(id) {
    dispatcher.dispatch({
        type: "DELETE_FILE",
        id
    })
}

export function deleteFileSuccess(name) {
    dispatcher.dispatch({
        type: "DELETE_FILE_SUCCESS",
        name
    })
}

export function deleteFileFailed() {
    dispatcher.dispatch({
        type: "DELETE_FILE_FAILED",
        name
    })
}

export function selectFile(id) {
    dispatcher.dispatch({
        type: "SELECT_FILE",
        id
    })
}

export function fetchFilesSuccess(files) {
    dispatcher.dispatch({
        type: "FETCH_FILES_SUCCESS",
        files
    })
}

export function fetchFilesFailed() {
    dispatcher.dispatch({
        type: "FETCH_FILES_FAILED"
    })
}

export function createFileSuccess(name) {
    dispatcher.dispatch({
        type: "CREATE_FILE_SUCCESS",
        name
    })
}

export function createFileFailed() {
    dispatcher.dispatch({
        type: "CREATE_FILE_FAILED"
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

export function fetchCode(name) {
    dispatcher.dispatch({
        type: "FETCH_SOURCE_CODE",
        name
    })
}

export function fetchCodeSuccess(key, code) {
    dispatcher.dispatch({
        type: "PULL_CODE_SUCCESS",
        code, key
    })
}

export function fetchSourceCodeFail() {
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

export function codeChanged(code) {
    dispatcher.dispatch({
        type: "CODE_CHANGED",
        code
    })
}

export function clearFileCache(id) {
    dispatcher.dispatch({
        type:"CLEAR_FILE_CACHE",
        id
    })
}

export function pushAll() {
    dispatcher.dispatch({
        type:"PUSH_ALL"
    })
}

export function pushAllSuccess() {
    dispatcher.dispatch({
        type:"PUSH_ALL_SUCCESS"
    })
}

export function pushAllFailed() {
    dispatcher.dispatch({
        type:"PUSH_ALL_FAILED"
    })
}

export function compile() {
    dispatcher.dispatch({
        type:"COMPILE"
    })
}

export function compileSuccess(log) {
    dispatcher.dispatch({
        type:"COMPILE_SUCCESS",
        log
    })
}

export function compileFailed() {
    dispatcher.dispatch({
        type:"COMPILE_FAILED",
        log
    })
}

export function clearLogs() {
    dispatcher.dispatch({
        type:"CLEAR_LOGS",
    })
}