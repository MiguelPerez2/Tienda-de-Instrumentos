import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useAuthStore, useFrom } from '../../hooks';
import { useState } from 'react';

export const MyProfile =()=>{

  const {user,ActualizarUsuario}=useAuthStore();

  const UserFromField={
    nombre:user.name,
    apellido:user.lastname,
    email:user.email,
    password:""
  }

  const formValidations={
    nombre:[(value)=>value.length!=0,'Dato requerido'],
    apellido:[(value)=>value.length!=0,'Dato requerido'],
    email:[(value)=>value.includes('@'),'Correo Invalido'],
    password:[(value)=>value.length!=0,'Dato requerido']
  }
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {nombre,apellido,email,password,onInputChange
        ,isFormValid,emailValid, passwordValid
        ,nombreValid,apellidoValid
      }=useFrom(UserFromField,formValidations);

  const handleShow = (valor) =>{
    setShowModal(valor)
  }

  const onSubmit=(event)=>{
    event.preventDefault();
    setFormSubmitted(true);
    if ( !isFormValid ) return;
    ActualizarUsuario({id:user.uid,nombre,apellido,email,password});
    handleShow(true);
    setTimeout(()=>{
      handleShow(false);
    },5000)
  }


  return(
    <div className="col-12 d-flex justify-content-center backInLeft">
      <div className="col-12 col-md-6 mb-5">
        <div className="card border-0 shadow-sm">
          <span className='h5 p-4'>_Mi perfil</span>
          <div className="card-body p-4">
          <form className='col-12' onSubmit={onSubmit}>
            <div className="row">
              <div className="text-start">
                <label >Nombres</label>
              </div>
              <input className={`form-control ${!!nombreValid&&formSubmitted?'is-invalid':''}`} type="text" name='nombre'
                value={nombre}
                onChange={onInputChange}
              />
              <span className='text-lg-red'>{nombreValid}</span>
              <div className="text-start">
                <label>Apellidos</label>
              </div>  
              <input className={`form-control ${!!apellidoValid&&formSubmitted?'is-invalid':''}`} type="text" name='apellido'
                value={apellido}
                onChange={onInputChange}
              />
              <span className='text-lg-red'>{apellidoValid}</span>
              <div className="text-start">
                <label >Correo Electrónico</label>
              </div>
              <input className={`form-control ${!!emailValid&&formSubmitted?'is-invalid':''}`} type="text" name='email'
                value={email}
                onChange={onInputChange}
                disabled={true}
              />
              <span className='text-lg-red'>{emailValid}</span>
              <div className="text-start">
                <label>Contraseña</label>
              </div> 
              <input className={`form-control ${!!passwordValid&&formSubmitted?'is-invalid':''}`} type="password" name='password'
                value={password}
                onChange={onInputChange}
              />
              {!!passwordValid&&formSubmitted?<span className='text-lg-red'>{passwordValid}</span>:null }
            </div>
            <div className="col-12 d-flex justify-content-center p-4">
              <Button 
              className='btn-login'
              variant="outlined"
              type='submit'
              >Guardar</Button>
            </div>
          </form>
          </div>
          <Modal centered={true} isOpen={showModal} toggle={()=>{handleShow(false)}}>
            <ModalHeader toggle={()=>{handleShow(false)}}>
            </ModalHeader>
            <ModalBody>
              <p>Datos Guardados</p>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  )
}