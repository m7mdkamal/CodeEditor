import React from 'react'
import  * as Actions from '../../actions/actions'
import FileStore from '../../stores/FileStore'


class File extends React.Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(id) {
        // console.log(id);
        Actions.selectFile(id);
        Actions.openTab(FileStore.getSelectedFile());
        //todo: send change the state of file to selected
        //todo: check if this file opened or not then get source code form server
    }

    render() {
        // console.log(this.props);
        return (
            <div 
                className={"file " + (this.props.isSelected==true?"file-selected":"")}
                onClick={this.handleSelect.bind(this,this.props.data.id)} >
                <div className="icon material-icons">
                    insert_drive_file
                </div>
                <div className="name">
                    {this.props.fileName}
                </div>
            </div>

        );

    }


}

export default File