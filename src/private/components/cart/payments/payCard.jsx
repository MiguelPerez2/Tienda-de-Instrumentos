import { useState } from 'react';
import Button from '@mui/material/Button';
import { useCalculos, useFrom, useResourceStore } from '../../../../hooks';
import moment from 'moment';

const formularioPayCard={
  n_tarjeta:'555555222222666666',
  cvv:'123',
  f_exp:'10/30',
  titular_tarjeta:'Jon Conor F Gregor'
}

export const PayCard=({datos})=>{
  const { RegistarOrden } = useResourceStore();
  const { generateToken } = useCalculos();
  const { OnNavegate } = useFrom();

  const [hidden,setHidden]=useState(false);
  const [formPayCard,setFormPayCard]=useState(formularioPayCard);
  const hiddenFormCard=()=>{
    return hidden==true;
  }
  const onChange_formularioCard=(x)=>{
    const {name,value}=x.target;
    setFormPayCard((prevSate)=>({
      ...prevSate,[name]:value
    }))
  }
  const clickPayCard=()=>{
    setHidden(!hidden);
    disablePagar();
  }
  const realizar_Comprar=()=>{
    moment.locale('Es');
    const fecha=moment().format();
    const orden={
      estadoId:2,
      usuarioId:localStorage.getItem('uid'),
      companiaId:1,
      nombre:datos.Datos_facturacion.nombres,
      apellido:datos.Datos_facturacion.apellidos,
      email:datos.Datos_facturacion.correo,
      costo_envio:35,
      total:datos.Total,
      token_orden:generateToken(datos.Datos_facturacion.correo),
      direccion_1:datos.Datos_envio.direccion_1,
      direccion_2:datos.Datos_envio.direccion_2,
      fecha:fecha
    }
   const resp=RegistarOrden(orden);
   if(resp){
      OnNavegate("/user/gracias");
   }
  }
  const disablePagar=()=>{
    const x=Object.values(formPayCard).some(valor => valor== '');
    return x;
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        <Button variant="outlined"
        onClick={clickPayCard}
        >Pagar Con Tarjeta</Button>
      </div>
      {
        hiddenFormCard()?(
          <>
            <div className='col-12 p-2 mt-2'>
              <div className="row">
                <div className="col-12 col-md-4">
                  <label>Número de tarjeta:</label>
                  <input className='form-control' type="text" name='n_tarjeta'
                    onChange={onChange_formularioCard}
                    value={formPayCard && formPayCard.n_tarjeta}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label>CVV:</label>
                  <input className='form-control' type="text" name='cvv'
                    onChange={onChange_formularioCard}
                    value={formPayCard && formPayCard.cvv}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label>Fecha de expiración:</label>
                  <input className='form-control' type="text" name='f_exp'
                    onChange={onChange_formularioCard}
                    value={formPayCard && formPayCard.f_exp}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label>Titular de la tarjeta:</label>
                  <input className='form-control' type="text" name='titular_tarjeta'
                    onChange={onChange_formularioCard}
                    value={formPayCard && formPayCard.titular_tarjeta}
                  />
                </div>
              </div>
            </div>
            <div className='col-12 d-flex justify-content-end'>
              <Button variant="contained" color="success"
                disabled={disablePagar()}
                onClick={realizar_Comprar}
              >Pagar</Button>
            </div>
          </>
        ):(<></>)
      }
    </>
  )
}