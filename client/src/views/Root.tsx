import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import List from 'views/List/List';


function Root() {
  return (
      <BrowserRouter>
              <Route exact path="/" render={() => <Redirect to="/list"/>}/>
              <Route path="/list" component={List}/>
      </BrowserRouter>
  );
}

export default Root;
