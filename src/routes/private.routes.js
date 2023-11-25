import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MyProductos, MyProfile } from "../private/index";
import { Cart } from "../private/components/";
import {Gracias} from "../shared/index";

export const PrivateRoute=()=>{
  const {pathname}=useLocation();
  localStorage.setItem('lastPath',pathname);
  // const lastPath=pathname
  return (
    <div className="container">
      <Routes>
        <Route path="/my_profile" element={<MyProfile/>}/>
        <Route path="/my_productos" element={<MyProductos/>}/>
        <Route path="/payment" element={<Cart/>}/>
        <Route path="/gracias" element={<Gracias/>}/>
        <Route path="/*" element={ <Navigate to="/user/my_profile"/> } />
      </Routes>
    </div>
  )
}
