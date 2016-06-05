import React from 'react'
import File from './file'

class FileBrowser extends React.Component {


    render(){
        return(
        <div className="fileBrowser">
            <div className="header">
                <div className="title">FILES</div>
                <div className="options">
                    <div className="option material-icons">add</div>
                    <div className="option material-icons">delete</div>
                </div>
            </div>
            <div className="container">

                <File />

            </div>
        </div>

    );
    }


}

export default FileBrowser