import React from 'react'
import Tab from './Tab'
import TabStore from '../../stores/TabStore'
import EditorStore from '../../stores/EditorStore'
import  * as actions from '../../actions/actions'
import alertify from 'alertify.js'

// require('brace/mode/java');
// require('brace/theme/monokai');
// require('brace')
// import ace from 'brace'
var TAB_CHANGE_EVENT = 'TABCHANGE';
var EDITOR_CHANGE_EVENT = 'EDITORCHANGE';
var DEPENDENCY_SUCCESS = 'DEPENDENCYSUCCESS';

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tabs: [], code: "", editorHidden: true};
        // this.handleNewFile = this.handleNewFile.bind(this);
        // this.handleDeleteFile = this.handleDeleteFile.bind(this);
        //todo: Handle scrolling
        // $(".tabs").scrollLeft();
        // $(".tabs").animate({scrollLeft: ($(".tabs").scrollLeft() + 100)});
        this.onEditorChange = this.onEditorChange.bind(this)
    }

    componentWillMount() {
        TabStore.on(TAB_CHANGE_EVENT, () => {
            this.setState({
                tabs: TabStore.getTabs()
            });
            // Actions.fetchSourceCode(TabStore.getCurrentFileKey())
        });
        this.setState({
            tabs: TabStore.getTabs()
        });
        EditorStore.on(EDITOR_CHANGE_EVENT, function () {
            // editor.session.setValue(this.state.code)
        });

        EditorStore.on(DEPENDENCY_SUCCESS, function () {
            alertify.success("Dependency Updated.");
        })
    }

    componentDidMount() {
        window.ace = ace;
        ace.require("ace/ext/language_tools");
        var editor = ace.edit('editor1');
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: false
        });
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/java");
        editor.setFontSize(14);
        EditorStore.on(EDITOR_CHANGE_EVENT, this.onEditorChange);
        window.editor = editor;

    }

    onEditorChange(){
        // console.error("EDITOR CHANGED")
        editor.removeAllListeners("change");
        if (EditorStore.getCurrentCode() != null) {
            editor.session.setValue(EditorStore.getCurrentCode());
            this.setState({
                editorHidden: false
            });
        }else{
            this.setState({
                editorHidden: true
            });
        }
        editor.on("change",function () {
            actions.codeChanged(editor.getSession().getValue())
        });
    }

    render() {
        return (
            <div className={"editor "+(this.state.editorHidden?"editor-blank":"")}>
                <div className={this.state.editorHidden?"editor-no-file-selected":"editor-file-selected"}>Select File</div>
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
                <pre id="editor1" className="text-editor">

                </pre>
            </div>

        )
    }
}

export default Editor