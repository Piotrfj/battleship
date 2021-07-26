import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import List from 'views/List/List';
import Server from "./Server/Server";

function Root() {
  return (
      <BrowserRouter>
              <Route exact path="/" render={() => <Redirect to="/list"/>}/>
              <Route path="/list" component={List} exact={true}/>
              <Route path="/list/:id" component={Server}/>
      </BrowserRouter>
  );
}

export default Root;
