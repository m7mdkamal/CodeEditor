import React from 'react'
import  * as Actions from '../actions/actions'
import EditorStore from '../stores/EditorStore'


var DEPENDENCY_SUCCESS = 'DEPENDENCYSUCCESS';


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            model:null,
            pom : ""
        };

        this.handlePushAll = this.handlePushAll.bind(this);
        this.handleCompile = this.handleCompile.bind(this);
        this.handleMaven = this.handleMaven.bind(this);

        this.handleModelOpen = this.handleModelOpen.bind(this);
        this.handleModelClose = this.handleModelClose.bind(this);
        this.handleUpdateDependency = this.handleUpdateDependency.bind(this);
    }

    handleModelOpen(){
        this.state.model.style.display = "block";
        Actions.fetchDependency();
    }

    handleModelClose(){
        if(this.state.model != null)
            this.state.model.style.display = "none";
    }

    handlePushAll() {
        console.log("Push All");
        Actions.pushAll();
    }

    handleCompile() {
        console.log("Compile");
        Actions.compile();
    }

    handleMaven() {
        console.log("Maven");
        this.handleModelOpen();
    }

    handleUpdateDependency(){
        console.log("Updating pom.xml");
        Actions.updateDependency(this.state.pom);
    }

    componentDidMount() {

        this.state.model = $("#pomModel")[0];

        var editor = ace.edit("pomEditor");
        editor.setOptions({
            minLines: 7,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        });
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/xml");
        editor.setFontSize(16);
        editor.on("change",function () {
            // this.state.pom = ;
        });

        EditorStore.on(DEPENDENCY_SUCCESS, function () {

            // this.setState({
            //     pom: EditorStore.getPom()
            // });
            editor.getSession().setValue(EditorStore.getPom());
            console.log(editor.getSession().getValue());
            // this.state.pom = EditorStore.getPom();
            console.log(EditorStore.getPom());
            alertify.success("Dependency Updated.");
        })
    }


    render() {
        return (
            <header className="header">
                <h3 className="header_logo">AlgoritmiCloud</h3>

                <div className="header_btns">
                    <div className="btn" onClick={this.handleMaven.bind()}>Maven</div>
                    <div className="btn" onClick={this.handlePushAll.bind()}>Push All</div>
                    <div className="btn" onClick={this.handleCompile.bind()}>Compile</div>
                </div>
                <div id="pomModel" className="modal">

                    <div className="modal-content">
                        <div className="model-header">
                            <h3 style={{'width':'100%','margin':'0'}}>pom.xml</h3>
                            <span className="close material-icons"  onClick={this.handleModelClose.bind()}>close</span>
                        </div>
                        <div className="model-container">
                            <pre id="pomEditor" style={{'height':'100%'}}>{this.state.pom}</pre>
                        </div>
                        <div className="model-footer">
                            <input className="btn" type="submit" onClick={this.handleModelClose.bind()} value="Cancel"/>
                            <input className="btn" type="submit" onClick={this.handleUpdateDependency.bind()} value="Update"/>
                        </div>
                    </div>

                </div>
            </header>
        );
    }


}

export default Header