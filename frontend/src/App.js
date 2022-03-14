import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {SignUpFormPage} from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import {Navigation} from "./components/Navigation";
import { Sites } from "./components/Sites"
import { SiteDetails } from "./components/Sites/SiteDetails";
import { EditSite } from "./components/Sites/EditSiteForm"
import { ReviewForm } from "./components/Reviews/ReviewsForm";
import { EditReviewForm } from './components/Reviews/EditReviewForm'

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
        <Route exact path="/signup">
          <SignUpFormPage />
        </Route>
        <Route exact path="/sites">
          <Sites />  
        </Route>
        <Route exact path='/sites/:id'>
          <SiteDetails />  
        </Route>
        <Route exact path='/sites/:id/review'>
          <ReviewForm />
        </Route>
        <Route exact path='/review/:id/edit'>
          <EditReviewForm />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
