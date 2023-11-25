import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, Producto } from "../public/index.js";
export const PublicRouter=()=>{
  const {pathname}=useLocation();
  localStorage.setItem('lastPath',pathname);
  return(
  <>
    <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/productos" element={<Producto/>}/>
        <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  </>
  )
} 