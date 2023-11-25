import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { PayCard } from '../../index';
import { useAuthStore } from '../../../../hooks/index.js';

const steps = ['Información de facturación', 'Información de envío', 'Método de pago'];
export const StepperCart=({productos,total})=>{

  const { user } = useAuthStore();

  const inf_facturacion={
    nombres:user.name,
    apellidos:user.lastname,
    telefono:'0961056677',
    correo:user.email
  }
  const inf_envio={
    direccion_1:'sur',
    direccion_2:'centro-sur',
    pais:'Ecuador',
    ciudad:'Guayaquil',
  }

  const [activeStep, setActiveStep] = useState(0);
  const [d_Inf_facturacion, setInf_facturacion] = useState(inf_facturacion);
  const [d_Inf_envio, setInf_envio] = useState(inf_envio);
  
  const Datos_De_Compra={
    Lista_P:productos,
    Datos_facturacion:d_Inf_facturacion,
    Datos_envio:d_Inf_envio,
    Total:total
  }

  const onChange_d_facturacion=(x)=>{
    const {name,value}=x.target;
    setInf_facturacion((prevSate)=>({
      ...prevSate,[name]:value
    }))
  }
  
  const onChange_inf_envio=(x)=>{
    const {name,value}=x.target;
    setInf_envio((prevSate)=>({
      ...prevSate,[name]:value
    }))
  }

  const handleNext = () => {
    if(FormularioComplet())
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if(FormularioComplet() || step===activeStep-1)
    setActiveStep(step);
  };

  const showSetp=(value)=>{
    return activeStep===value;
  }
  
  const FormularioComplet=()=>{
    const Datos_facturacion = Object.values(Datos_De_Compra.Datos_facturacion).some(valor => valor== '');
    const Datos_envio = Object.values(Datos_De_Compra.Datos_envio).some(valor => valor== '');
    if (!Datos_facturacion && activeStep===0) {
      return true;
    }else if (!Datos_envio && activeStep===1) {
      return true;
    }else {
      return false;
    }
  }

  return (
    <div className='table-responsive p-4'>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" 
                onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {
          <>
            { 
              showSetp(0)?(
                <div className='col-12 p-2 mt-2'>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <label>Nombres</label>
                      <input className='form-control' type="text" name='nombres'
                        onChange={onChange_d_facturacion}
                        value={d_Inf_facturacion && d_Inf_facturacion.nombres}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label>Apellidos</label>
                      <input className='form-control' type="text" name='apellidos'
                        onChange={onChange_d_facturacion}
                        value={d_Inf_facturacion && d_Inf_facturacion.apellidos}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label>Teléfono</label>
                      <input className='form-control' type="text" name='telefono'
                        onChange={onChange_d_facturacion}
                        value={d_Inf_facturacion && d_Inf_facturacion.telefono}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label>Correo electrónico</label>
                      <input className='form-control' type="text" name='correo'
                        onChange={onChange_d_facturacion}
                        value={d_Inf_facturacion && d_Inf_facturacion.correo}
                      />
                    </div>
                  </div>
                </div>
              ):showSetp(1)?(
                <div className='col-12 p-2 mt-2'>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <label>Dirección 1</label>
                      <input className='form-control' type="text" name='direccion_1'
                        onChange={onChange_inf_envio}
                        value={d_Inf_envio && d_Inf_envio.direccion_1}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label>Dirección 2</label>
                      <input className='form-control' type="text" name='direccion_2'
                        onChange={onChange_inf_envio}
                        value={d_Inf_envio && d_Inf_envio.direccion_2}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label>País</label>
                      <input className='form-control' type="text" name='pais'
                        onChange={onChange_inf_envio}
                        value={d_Inf_envio && d_Inf_envio.pais}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label>Ciudad</label>
                      <input className='form-control' type="text" name='ciudad'
                        onChange={onChange_inf_envio}
                        value={d_Inf_envio && d_Inf_envio.ciudad}
                      />
                    </div>
                  </div>
                </div>
              ):(
                <div className='p-2 mt-4'>
                  <PayCard
                    datos={Datos_De_Compra}
                  />
                </div>
              )
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Volver
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                disabled={activeStep === 2 || !FormularioComplet() }
                onClick={handleNext} sx={{ mr: 1 }}>
                Siguiente
              </Button>
            </Box>
          </>
        }
      </Box>
    </div>

  );
} 