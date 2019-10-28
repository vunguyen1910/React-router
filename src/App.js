import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage"
import CandidatesPage from "./pages/CandidatesPage"
import CompanyPage from "./pages/CompanyPage"
import Navibar from "./components/Navibar"
import CandidatePage from "./pages/CandidatePage"

function App() {
  return (
    <div>
      <Navibar/>
      <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/candidates" exact component={CandidatesPage} />
      <Route path="/companypage" exact component={CompanyPage} />
      <Route path="/candidates/:id" exact component={CandidatePage}/>
      </Switch>
    </div>
  );
}

export default App;
