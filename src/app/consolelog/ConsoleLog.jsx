import React from 'react'

class ConsoleLog extends React.Component{

    render(){

        return(
            <div className="console-log console-log_op4en">
                <div className="header">
                    <div className="title">CONSOLE LOG</div>
                    <div className="options">
                        <div className="option material-icons">
                            clear
                        </div>
                        <div className="option material-icons">
                            arrow_downward
                        </div>

                    </div>
                </div>
                <div className="container">
		<pre>FilenotFound_Demo.java:8: error: unreported exception FileNotFoundException; must be caught or declared to be thrown
	      FileReader fr = new FileReader(file);
	                      ^
	1 error</pre>
	<pre>FilenotFound_Demo.java:8: error: unreported exception FileNotFoundException; must be caught or declared to be thrown
	      FileReader fr = new FileReader(file);
	                      ^
	1 error</pre>
	<pre>FilenotFound_Demo.java:8: error: unreported exception FileNotFoundException; must be caught or declared to be thrown
	      FileReader fr = new FileReader(file);
	                      ^
	1 error</pre>
	<pre>FilenotFound_Demo.java:8: error: unreported exception FileNotFoundException; must be caught or declared to be thrown
	      FileReader fr = new FileReader(file);
	                      ^
	1 error</pre>
	<pre>FilenotFound_Demo.java:8: error: unreported exception FileNotFoundException; must be caught or declared to be thrown
	      FileReader fr = new FileReader(file);
	                      ^
	1 error</pre>
                </div>
            </div>

        )
    }


}

export default ConsoleLog