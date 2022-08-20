import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const PrivateRoutes = () => {
     
      return(
        sessionStorage.getItem("token")? <Outlet/> : <Navigate to="/login"/>

      )  
  
};

