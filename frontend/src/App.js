import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { SignUpFormPage } from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import { Navigation } from "./components/Navigation";
import { Sites } from "./components/Sites"
import { SiteDetails } from "./components/Sites/SiteDetails";
import { EditSite } from "./components/Sites/EditSiteForm"
import { ReviewForm } from "./components/Reviews/ReviewsForm";
import { EditReviewForm } from './components/Reviews/EditReviewForm'
import { Homepage } from './components/Homepage/index'
import { ProfilePage } from './components/ProfilePage'
import ProtectedRoute from './components/LoginFormModal/ProtectedRoute.js'

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
          <Homepage />
        </Route>
        <Route exact path="/signup">
          <SignUpFormPage />
        </Route>
        <ProtectedRoute exact path="/:id/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route exact path="/sites">
          <Sites />  
        </Route>
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
