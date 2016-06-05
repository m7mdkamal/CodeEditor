import React from 'react'
import Tab from './Tab'
import TabStore from '../../stores/TabStore'

var TAB_CHANGE_EVENT = 'TABCHANGE';

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tabs : []};

        // this.handleNewFile = this.handleNewFile.bind(this);
        // this.handleDeleteFile = this.handleDeleteFile.bind(this);
    }

    componentWillMount() {
        TabStore.on(TAB_CHANGE_EVENT, () => {
            this.setState({
                tabs: TabStore.getTabs()
            })
        })
        this.setState({
            tabs: TabStore.getTabs()
        })
    }

    render(){
        return(
            <div className="editor">
                <div className="tabs">
                    <div className="scrolls scroll_left material-icons">
                        chevron_left
                    </div>
                    <div className="scrolls scroll_right material-icons">
                        chevron_right
                    </div>

                    {this.state.tabs.map((tab, i) => {
                        return (
                            <Tab key={tab.id}
                                  fileName={tab.fileName}
                                  isSelected={tab.isSelected}
                                  data={tab}/>
                        );
                    })}

                    


                </div>
                <div className="textEditor" id="editor1"  styleName={{"width": "100%" ,"height":"calc(100% - 115px)","border-radius": "0"}}>
                    Test goes here
                </div>
            </div>

        )
    }
}

export default Editor