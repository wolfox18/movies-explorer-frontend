import React from 'react';
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ loggedIn, children, path  }) => {
  return (

      loggedIn ? children : <Navigate to="/" />

)}

export const OnlyForUnregistredUsersRoute = ({loggedIn, children, path}) => {
  return(
    loggedIn ? <Navigate to="/movies" /> : children
  )
}