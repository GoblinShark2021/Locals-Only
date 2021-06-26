import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import GoogleMap from './components/GoogleMap';
import Login from './components/Login';

const App = () => {
    return (
    <Router>
        <section>
            <Nav/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/map' component={GoogleMap}/>
                <Route path='/login' exact component={Login}/>
            </Switch>
        </section>
    </Router>
)}

export default App;