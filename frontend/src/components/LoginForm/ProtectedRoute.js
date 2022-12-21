import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

const ProtectedRoute = props => {

  const user = useSelector(state => state.session.user);
  // localStorage.setItem('location', location.href)

  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/login'/>}
    </Route>
  )
};


export default ProtectedRoute;