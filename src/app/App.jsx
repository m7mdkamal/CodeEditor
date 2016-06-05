import React from 'react'

import Header from './Header.jsx'
import Container from './Container.jsx'

class App extends React.Component {


    render() {

        return (
            <div className="app">
                <Header />
                <Container />
            </div>
         );
    }


}

export default App