import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Flights from './Flights';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/flights" component={Flights} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/" component={Flights} />
                </div>
            </Router>
        )
    }
}

export default App;
