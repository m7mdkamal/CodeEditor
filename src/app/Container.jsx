import React from 'react'
import FileBrowser from './filebrowser/FileBrowser'
import Editor from './editor/Editor'
import ConsoleLog from './consolelog/ConsoleLog'

class Container extends React.Component {


    render(){
        return(
            <div className="container">
                <FileBrowser />
                <Editor/>
                <ConsoleLog />
            </div>
        );
    }


}

export default Container