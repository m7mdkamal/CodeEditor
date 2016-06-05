import React from 'react'


class Header extends React.Component {


    render(){
        return(
            <header className="header">
                <h3 className="header_logo">AlgoritmiCloud</h3>

                <div className="header_btns">
                    <div className="btn">Push All</div>
                    <div className="btn">Compile</div>
                    <div className="btn">Tests</div>
                </div>
            </header>
        );
    }


}

export default Header