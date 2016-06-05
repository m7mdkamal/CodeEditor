import React from 'react'

class Tab extends React.Component {
    render(){
        return(
            <div className="tab tab-open">
                <div className="tab-label">student.java</div>
                <div className="tab-close material-icons">close</div>
            </div>
        )
    }
}

export default Tab