import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Route } from 'react-router';
import { Switch, BrowserRouter } from 'react-router-dom';
import Call from "./call.js";
import Home from "./home.js"
class App extends Component {
    render(){
        return(
          <div className="container">
            <Route path="/" exact component={Home} />{/*主畫面*/}
            <Route name="call" path="/:calls" component={Call} />{/*通話比較頁面*/}
          </div>
        );
    }
}
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);