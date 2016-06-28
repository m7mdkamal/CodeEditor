import React from 'react'
import  * as Actions from '../actions/actions'


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handlePushAll = this.handlePushAll.bind(this);
        this.handleCompile = this.handleCompile.bind(this);
        this.handlePushAll = this.handlePushAll.bind(this);
    }

    handlePushAll(){
        console.log("Push All");
        Actions.pushAll();
    }

    handleCompile(){
        console.log("Compile");
        Actions.compile();
    }

    render(){
        return(
            <header className="header">
                <h3 className="header_logo">AlgoritmiCloud</h3>

                <div className="header_btns">
                    <div className="btn">Maven </div>
                    <div className="btn" onClick={this.handlePushAll.bind()}>Push All</div>
                    <div className="btn" onClick={this.handleCompile.bind()}>Compile</div>
                </div>
            </header>
        );
    }


}

export default Header