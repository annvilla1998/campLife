import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {SignUpFormPage} from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import {Navigation} from "./components/Navigation";
import { Sites } from "./components/Sites"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  },[dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
      <Switch>
        <Route path="/signup">
          <SignUpFormPage />
        </Route>
        <Route path="/sites">
          <Sites />  
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
