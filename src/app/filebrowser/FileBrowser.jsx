import React from 'react'
import File from './File'
import FileStore from '../../stores/FileStore'
import alertify from 'alertify.js'
import  * as Actions from '../../actions/actions'

var FILE_CHANGE_EVENT = 'FILECHANGE';
var FILE_MSG_EVENT = 'FILEMSG';

class FileBrowser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {files : []};
        
        this.handleNewFile = this.handleNewFile.bind(this);
        this.handleDeleteFile = this.handleDeleteFile.bind(this);

    }

    componentWillMount() {
        FileStore.on(FILE_CHANGE_EVENT, () => {
            this.setState({
                files: FileStore.getFiles()
            })
        });
        this.setState({
            files: FileStore.getFiles()
        });

        FileStore.on(FILE_MSG_EVENT, () => {
            this.alertMSG();
        });

    }

    handleNewFile() {
        alertify.defaultValue("file.java")
            .prompt("File name:",
                function (val, ev) {
                    ev.preventDefault();
                    Actions.createFile(val);
                }, function (ev) {
                    ev.preventDefault();
                }
            );

    }

    handleDeleteFile() {
        var file = FileStore.getSelectedFile();
        if (file) {
            alertify.okBtn("Yes")
                .cancelBtn("No")
                .confirm("Are you sure?", function () {
                    Actions.deleteFile(file.id);
                }, function () {

                });
        } else {
            alertify.error("No Selected File");
        }
    }

    alertMSG(){
        var msgs = FileStore.getMsgs();
        msgs.forEach((msg) => {
            switch (msg.type) {
                case "LOG":
                    alertify.success(msg.text);
                    break;
                case "ERROR":
                    alertify.error(msg.text);
                    break
            }
        });
        FileStore.clearMsgs();
    }

    render(){
        return(
        <div className="fileBrowser">
            <div className="header">
                <div className="title">FILES</div>
                <div className="options">
                    <div className="option material-icons"
                         onClick={this.handleNewFile.bind(this)}>
                        add
                    </div>
                    <div className="option material-icons"
                         onClick={this.handleDeleteFile.bind(this)}>delete</div>
                </div>
            </div>
            <div className="container">

                {this.state.files.map((file, i) => {
                    return (
                        <File key={file.id}
                                     fileName={file.fileName}
                                     isSelected={file.isSelected}
                                     data={file}/>
                    );
                })}

            </div>
        </div>

    );
    }

}

export default FileBrowser