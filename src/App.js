import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Table from './components/DashBoard/Table'
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router history={createBrowserHistory()}>
      <div>
        <Route exact path="/" component={Table} />
        <Route path="/addTask" component={TaskForm} />
      </div>
    </Router>
    </div>
  );
}

export default App;
