import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';

const App=()=> {
  return (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={RegisterComplete} />
    </Switch>
  );
}

export default App;
