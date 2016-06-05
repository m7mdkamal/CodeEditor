import React from 'react'
import File from './file'
import FileStore from '../../stores/FileStore'
import alertify from 'alertify.js'
import  * as Actions from '../../actions/actions'

var FILE_CHANGE_EVENT = 'FILECHANGE';

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
        })
        this.setState({
            files: FileStore.getFiles()
        })
    }

    handleNewFile() {
        alertify.defaultValue("file.java")
            .prompt("File name:",
                function (val, ev) {
                    ev.preventDefault();
                    Actions.createFile(val);
                    var errs = FileStore.getErrors();
                    if (errs.length > 0) {
                        errs.forEach((err) => {
                            alertify.error(err);
                        });
                        FileStore.clearErrors();
                    } else {
                        alertify.success("You've created: " + val);
                    }
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
                    var errs = FileStore.getErrors()
                    if (errs.length > 0) {
                        errs.forEach((err) => {
                            alertify.error(err);
                        });
                        FileStore.errors();
                    } else {
                        alertify.success("You've deleted: " + file.fileName);
                        Actions.closeTab(file.id)
                    }

                }, function () {

                });
        } else {
            alertify.error("No Selected File");
        }
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