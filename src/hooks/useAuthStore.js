import { useDispatch, useSelector } from "react-redux";
import {AuthApi} from'../api/index'
import { clearErrorMessage, onChecking, onResetItems, onLogin, onLogout } from "../store/index";

export const useAuthStore=()=>{


  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector( state => state.auth );
  
  const startLogin=async({email,password})=>{
    dispatch(onChecking());
    try {
      const { data } = await  AuthApi.post("/login",{email,password});
      localStorage.setItem('uid',data.data[0].id)
      dispatch(onLogin({uid:data.data[0].id,name:data.data[0].nombre,lastname:data.data[0].apellido,email:data.data[0].email}))
      
    } catch (error) {
      dispatch(onLogout("Datos Incorrectos"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }
 
  const checkAuth=async()=>{
    const id=localStorage.getItem('uid');//renueva sesion
    if (!id) return dispatch(onLogout());
    try {
      const {data}=await AuthApi.get(`/renewsesion/${id}`);
      localStorage.setItem('uid',data.data[0].id);
      dispatch(onLogin({uid:data.data[0].id,name:data.data[0].nombre,lastname:data.data[0].apellido,email:data.data[0].email}))
    } catch (error) {
      dispatch(onLogout("error"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }


  const RegistrarUsuario= async({estadoId,companiaId,rolId,nombre,apellido,email,password,maxintentos,intentosfallidos})=>{
    try {
      const data = await  AuthApi.post("/registrar_usuario",
        {estadoId,companiaId,rolId,nombre,apellido,email,password,maxintentos,intentosfallidos});
     return data.data.success;
    } catch (error) {
      return false
    }
  }

  const ActualizarUsuario= async({id,nombre,apellido,email,password})=>{
    try {
      const data = await  AuthApi.put(`/actualizar_usuario/${id}`,{nombre,apellido,email,password});
     return data.data.success;
    } catch (error) {
      return false
    }
  }

  const startLogout=()=>{
    localStorage.removeItem("uid");
    localStorage.setItem('lastPath',"/auth/login");
    dispatch(onLogout());
    dispatch(onResetItems());
  }

  return{
      errorMessage,
      status,
      user,
      startLogin,
      startLogout,
      checkAuth,
      RegistrarUsuario,
      ActualizarUsuario
  }
}