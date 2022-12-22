import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { SignUpFormPage } from "./components/SignUpFormPage";
import LoginForm from './components/LoginForm'
import * as sessionActions from "./store/session";
import { Navigation } from "./components/Navigation";
import { Sites } from "./components/Sites"
import { SiteDetails } from "./components/Sites/SiteDetails";
import { EditSite } from "./components/Sites/EditSiteForm"
import { ReviewForm } from "./components/Reviews/ReviewsForm";
import { EditReviewForm } from './components/Reviews/EditReviewForm'
import { Homepage } from './components/Homepage/index'
import { Trips } from './components/Trips'
import { About } from './components/Account'
import ProtectedRoute from './components/LoginForm/ProtectedRoute.js'

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
        <Route exact path="/">
          <Sites />  
        </Route>
        <Route exact path="/signup">
          <SignUpFormPage />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <ProtectedRoute exact path="/:id/profile/about">
          <About/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/:id/profile/trips">
          <Trips />
        </ProtectedRoute>
        {/* <Route exact path="/sites">
          <Sites />  
        </Route> */}
        <Route exact path='/sites/:id'>
          <SiteDetails />  
        </Route>
        <ProtectedRoute exact path='/sites/:id/review'>
          <ReviewForm />
        </ProtectedRoute>
        <ProtectedRoute exact path='/review/:id/edit'>
          <EditReviewForm />
        </ProtectedRoute>
      </Switch>
      )}
    </>
  );
}

export default App;
