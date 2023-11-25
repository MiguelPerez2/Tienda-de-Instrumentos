
import Button from '@mui/material/Button';
import { useAuthStore, useFrom } from '../../hooks/index';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const loginFromField={
  email:'',
  password:''
}

export const Login=()=>{

  const {startLogin,errorMessage}=useAuthStore();
  const route=useNavigate();

  const formValidations={
    email:[(value)=>value.includes('@'),'Correo Invalido'],
    password:[(value)=>value.length!=0,'Dato requerido'],
  }
  
  const Navegate=(url)=>{
    route(url);
  }
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [wrapper, setWrapper] = useState(document.createElement('div'));

  const {email,password,onInputChange,isFormValid,emailValid, passwordValid}=useFrom(loginFromField,formValidations);
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

  const onSubmit=(event)=>{
    setWrapper(document.createElement('div'));
    event.preventDefault();
    setFormSubmitted(true);
    if ( !isFormValid ) return;
    startLogin({email,password});
    
  }
  const appendAlert = () => {
    wrapper.innerHTML = [
      `<div class="alert alert-danger text-center" role="alert">`,
      `   <span>${errorMessage}</span>`,
      '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
  }
  useEffect(()=>{
    if (errorMessage!==undefined) {
      appendAlert();
      setTimeout(() => {
        wrapper.remove();
      }, 3000);
    }
  },[errorMessage])
  return (
    <div className="col-12 d-flex justify-content-center align-content-center pt-5 mt-5">
      <div className="col-12 col-md-4 shadow-sm p-3 mb-5 bg-body rounded">
        <h1 className='h3 p-2'>_Iniciar Sesión</h1>
       <form onSubmit={onSubmit}>
        <div className="col-12 d-flex justify-content-center pt-4 pb-2">
            <div className="row col-12">
              <div className="text-start">
                <label >Correo Electrónico</label>
              </div>
              <input className={`form-control ${!!emailValid&&formSubmitted?'is-invalid':''}`} type="text" name='email'
                value={email}
                onChange={onInputChange}
              />
              <div className="text-start">
                <label>Contraseña</label>
              </div>  
              <input className={`form-control ${!!passwordValid&&formSubmitted?'is-invalid':''}`} type="password" name='password'
                value={password}
                onChange={onInputChange}
              />
              
            </div>
          </div>
          <span className='spn-click' onClick={()=>{Navegate("/auth/registar")}}>Registrarse</span>
          <div id="liveAlertPlaceholder"></div>
          <div className="col-12 d-flex justify-content-center p-4">
            <Button 
            className='btn-login'
            variant="outlined"
            type='submit'
            >Iniciar sesión</Button>

          </div>
       </form>
      </div>
    </div>
  )
}