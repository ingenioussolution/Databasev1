import React from 'react'
import { Route } from 'react-router-dom'

const PrivateRoute = ({ component, ...rest }) => {

 
  console.log("component",rest);
  return (
    <Route
      {...rest}
      render={({ match }) => 
      (React.createElement(component, { match: match }))
    }
    />
  )
}

export default PrivateRoute
