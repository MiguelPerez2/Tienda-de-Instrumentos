import { BrowserRouter as Router ,Routes,Route, Navigate} from "react-router-dom";
import { useEffect, useState } from "react";

import { Footer, Navbar } from "../shared/index";
import { PublicRouter } from "./public.routes";
import { PrivateRoute } from "./private.routes.js";

import { AuthRouter } from "./auth.routes.js";
import { useAuthStore, useResourceStore } from "../hooks/index.js";

export const AppRouter=()=>{
  const { status,checkAuth } = useAuthStore();
  const { statusI,ListItemsCartUserId,items } = useResourceStore();
  
  useEffect(()=>{
    checkAuth();
    if (localStorage.getItem("uid")) {
      ListItemsCartUserId({id:localStorage.getItem("uid")});
    }
  },[status])
  
  useEffect(()=>{
    if (localStorage.getItem("uid")) {
      ListItemsCartUserId({id:localStorage.getItem("uid")});
      // console.log(items,statusI);
    }
  },[statusI])

  return(
  <>
    <Router>
        <Navbar></Navbar>
          <div className="container-fluid">
            <Routes>
              {
                (status === 'checking')?(
                  <>
                    <Route path="/*" element={<Navigate to={localStorage.getItem("lastPath")}/>}/>
                    <Route path='/*' element={<PublicRouter/>}/> 
                    <Route path="/auth/*" element={<AuthRouter/>}/>
                  </>
                ):(status==='not-authenticated')?(
                  <>
                    <Route path='/*' element={<PublicRouter/>}/> 
                    <Route path="/auth/*" element={<AuthRouter/>}/>
                    <Route path="/*" element={<Navigate to={localStorage.getItem("lastPath")}/>}/>
                  </>
                ):(
                  <>
                    <Route path='/*' element={<PublicRouter/>}/>
                    <Route path="/user/*" element={<PrivateRoute/>}/>
                    <Route path="/*" element={<Navigate to={localStorage.getItem("lastPath")}/>}/>
                  </>
                )
              }
              
            </Routes>
          </div>
        <Footer></Footer>
    </Router>
  </>
  )
} 