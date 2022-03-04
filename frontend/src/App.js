import React, { useEffect, useState } from "react";
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as sessionActions from './store/session'
import { SignUpFormPage } from "./components/SignUpFormPage";
import { Navigation } from './components/Navigation'

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
      </Switch>
      )}
    </>
  );
}

export default App;
