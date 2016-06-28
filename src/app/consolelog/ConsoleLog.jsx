import React from 'react'
import * as Actions from '../../actions/actions'
import logsStore from '../../stores/LogsStore'

var LOG_CHANGE_EVENT = 'LOGCHANGEEVENT';

class ConsoleLog extends React.Component{

	constructor(props) {
		super(props);
		this.state = {logs :[],open: false };

		this.handleClear = this.handleClear.bind(this);
		this.handleMinimize = this.handleMinimize.bind(this);
		

	}

	handleClear(){
		Actions.clearLogs();
	}

	handleMinimize(){
		$(".console-log").toggleClass("console-log_open");
		this.setState({
			open: !this.state.open
		})
	}

	componentWillMount() {
		logsStore.on(LOG_CHANGE_EVENT, () => {
			console.log("EVENTLISTENER")
			this.setState({
				logs: logsStore.getLogs()
			})
		});
		this.setState({
			logs: logsStore.getLogs()
		});

		// FileStore.on(FILE_MSG_EVENT, () => {
		// 	this.alertMSG();
		// });

	}
	
    render(){
        return(
            <div className="console-log">
                <div className="header">
                    <div className="title">CONSOLE LOG</div>
                    <div className="options">
                        <div className="option material-icons" onClick={this.handleClear.bind()}>
							clear_all
                        </div>
                        <div className="option material-icons" onClick={this.handleMinimize.bind()}>
							{(this.state.open==true)?"arrow_downward":"arrow_upward"}
                        </div>

                    </div>
                </div>
                <div className="container">
					{this.state.logs.map((log, i) => {
						return (
							<pre key={Math.random()}> {log} </pre>
						);
					})}

                </div>
            </div>

        )
    }


}

export default ConsoleLog