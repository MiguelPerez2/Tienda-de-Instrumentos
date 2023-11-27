// import '@fortawesome/fontawesome-free/css/all.css';
import '../../assets/css/register.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import iconMusic from '../../assets/img/register/icon_music-.png';
import { useAuthStore } from '../../hooks';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


export const RegistarPage=()=>{
  const {RegistrarUsuario}=useAuthStore();


  const route = useNavigate();

  const Navegate=(url) => {
    route(url);
  }

  const [name, setName] = useState('Jon conor');
  const [lastname, setLastName] = useState('Garcia Fernandez');
  const [email, setEmail] = useState('Jon@gmail.com');
  const [pass, setPass] = useState('Jonconor@1234');

  // Estados para manejer error
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userexiste, setuserexiste] = useState(false);

  const validarName = () => {
    const nameValue = name.trim();
    const soloLetras =/^[a-zA-Z\s]+$/;
    if (!nameValue) {
      setErrorNombre('*Campo Obligatorio');
      return false;
    } else if (!soloLetras.test(nameValue)) {
      setErrorNombre('Este campo solo debe contener letras');
      return false;
    } else {
      setErrorNombre('');
      return true;
    }
  };
  
  const validarLastname = () => {
    const lastnameValue = lastname.trim();
    const soloLetras = /^[a-zA-Z\s]+$/;
    if (!lastnameValue) {
      setErrorApellido('*Campo Obligatorio');
      return false;
    } else if (!soloLetras.test(lastnameValue)) {
      setErrorApellido('Este campo solo debe contener letras')
      return false;
    } else {
      setErrorApellido('');
      return true;
    }
  };
  
  const validarEmail = () => {
    const emailValue = email.trim();
    if (!emailValue) {
      setErrorEmail('*Campo Obligatorio');
      return false;
    } else if (!emailValue.includes('@')) {
      setErrorEmail('Correo electrónico inválido. Debe contener "@');
      return false;
    } else {
      setErrorEmail('');
      return true;
    }
  };
  
  const validarPass = () => {
    const passValue = pass.trim();
    const Mayus = /[A-Z]/;
    const Minus = /[a-z]/;
    const caracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (!passValue) {
      setErrorPass('*Campo Obligatorio');
      return false;
    } else if (passValue.length < 8) {
      setErrorPass('La contraseña debe tener al menos 8 caracteres');
      return false;
    } else if (!Mayus.test(passValue)) {
      setErrorPass('La contraseña debe tener al menos una letra mayúscula');
      return false;
    } else if (!Minus.test(passValue)) {
      setErrorPass('La contraseña debe tener al menos una letra minúscula');
      return false;
    } else if (!caracterEspecial.test(passValue)) {
      setErrorPass('La contraseña debe tener al menos un carácter especial');
      return false;
    } else {
      setErrorPass('');
      return true;
    }
  };


  const handleShow = (valor) =>{
    setShowModal(valor)
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const esNameValido = validarName();
    const esLastnameValido = validarLastname();
    const esEmailValido = validarEmail();
    const esPassValido = validarPass();

    if (esNameValido && esLastnameValido && esEmailValido && esPassValido) {
      // rol 1=admin;
      // rol 2=cliente;
      const usuario={
        estadoId:1,
        companiaId:1,
        rolId:2,
        nombre:name,
        apellido:lastname,
        email:email,
        password:pass,
        maxintentos:4,
        intentosfallidos:0
      }
      const data=RegistrarUsuario(usuario);
      data.then((success)=>{
        if (success) {
          setuserexiste(false);
          handleShow(true);
          setTimeout(() => {
            handleShow(false);
            Navegate("/auth/login")
          }, 2000);
        }else{
          setuserexiste(true);
          handleShow(true);
        }
      })
    }
    
  }

  return (
    <>
    <div className="row">
      <div className="col-12 col-md-6 d-flex justify-content-center">
        <div className="col-12">
        <form className='formRegister' onSubmit={handleSubmit}>
          <h1 className='tittle'>Crear Cuenta</h1>
          {/* Redes Sociales */}
          <div className="social-container">
            <a href="#" className="social"><i className="bi bi-facebook"></i></a>
            <a href="#" className="social"><i className="bi bi-google"></i></a>
            <a href="#" className="social"><i className="bi bi-linkedin"></i></a>
          </div>
          <span className='opcion'>o utilice su correo electrónico para registrarse</span>

          <input className={`txt ${errorNombre ? 'error-input' : ''}`} type="text" placeholder="Nombre"  
            value={name} onChange={(e) => setName(e.target.value)} />
            <div style={{textAlign: 'left', marginLeft: '10px'}} className='error-message'>{errorNombre}</div>

          <input className={`txt ${errorApellido ? 'error-input' : ''}`} type="text" placeholder="Apellido" 
            value={lastname} onChange={(e) => setLastName(e.target.value)} />
            <div style={{textAlign: 'left', marginLeft: '10px'}} className='error-message'>{errorApellido}</div>

          <input className={`txt ${errorEmail ? 'error-input' : ''}`} type="email" placeholder="Email" 
            value={email} onChange={(e) => setEmail(e.target.value)} />
            <div style={{textAlign: 'left', marginLeft: '10px'}} className='error-message'>{errorEmail}</div>

          <input className={`txt ${errorPass ? 'error-input' : ''}`} type="password" placeholder="Password" 
            value={pass} onChange={(e) => setPass(e.target.value)} />
            <div style={{textAlign: 'left', marginLeft: '10px'}} className='error-message'>{errorPass}</div>

          <br />
          <button className='btnRegister' type='submit'>Registrarse</button>
        </form>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div>
          <img src={iconMusic} alt="Music" className='img'/>
        </div>
      </div>
      </div>
      <Modal centered={true} isOpen={showModal} toggle={()=>{handleShow(false)}}>
        <ModalHeader toggle={()=>{handleShow(false)}}>
        </ModalHeader>
        <ModalBody>
          <p>{!userexiste?'Registrado':'El correo ingresado ya está registrado'}</p>
        </ModalBody>
      </Modal>

    </>

      
  )
}