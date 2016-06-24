import React from 'react'
import  * as Actions from '../../actions/actions'


class Tab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {tabs : []};

        this.handleSelectTab = this.handleSelectTab.bind(this);
        this.handleCloseTab = this.handleCloseTab.bind(this);
    }

    handleSelectTab(id){
        Actions.selectTab(id)
    }

    handleCloseTab(id){
        Actions.closeTab(id)
    }

    render(){
        return(
            <div className={"tab "+(this.props.isSelected?"tab-open":"")}>
                <div className="tab-label"
                     onClick={this.handleSelectTab.bind(this,this.props.data.id)}>{this.props.fileName}</div>
                <div className="tab-close material-icons" key={this.props.data.id}
                     onClick={this.handleCloseTab.bind(this,this.props.data.id)}>close</div>
            </div>
        )
    }
}

export default Tab