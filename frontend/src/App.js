import React, { useEffect, useState } from "react";
import { LoginFormPage } from "./components/LoginFormPage";
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as sessionActions from './store/session'
import { SignUpFormPage } from "./components/SignUpFormPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  },[dispatch])

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignUpFormPage />
      </Route>
    </Switch>
  );
}

export default App;
