import React from 'react'
import Tab from './Tab'
class Editor extends React.Component {
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

                    <Tab />


                    <div className="tab">
                        <div className="tab-label">index.html</div>
                        <div className="tab-close material-icons">close</div>
                    </div>
                    <div className="tab">
                        <div className="tab-label">index.html</div>
                        <div className="tab-close material-icons">close</div>
                    </div>
                    <div className="tab tab-open">
                        <div className="tab-label">student.java</div>
                        <div className="tab-close material-icons">close</div>
                    </div>


                </div>
                <div className="textEditor" id="editor1"  styleName={{"width": "100%" ,"height":"calc(100% - 115px)","border-radius": "0"}}>
                    Test goes here
                </div>
            </div>

        )
    }
}

export default Editor