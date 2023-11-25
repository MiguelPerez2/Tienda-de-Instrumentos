import {Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login, RegistarPage } from "../auth/index.js";

export const AuthRouter=()=>{
  const {pathname}=useLocation();
  localStorage.setItem('lastPath',pathname);
  return(
  <div className="container">
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/registar" element={<RegistarPage/>}/>
      <Route path="/*" element={<Navigate to="/auth/login"/>}/>
    </Routes>
  </div>
  )
} 