import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";

// hook personalizado para formularios
// ...formState => desestruc
export const useFrom=(initialForm={},formValidations={})=>{

  const [formState,setFormState]=useState(initialForm); 
  const [formValidation,setFormValidation]=useState(formValidations); 

  const route=useNavigate();

  const OnNavegate=(url)=>{
    route(url);
  }

  useEffect(()=>{ //cada que hay un cambio en el formState
    createValidate();
  },[formState])


  const onInputChange=({target})=>{
    const {name,value}=target;
    setFormState({
      ...formState,
      [name]:value
    });
  }
  
  //useMemo=> memoriza el valor
  const isFormValid=useMemo(()=>{ //validar formulario completo
    for (const formValue of Object.keys(formValidation)) {
      if(formValidation[formValue]!==null) return false;
    }
    return true;
  },[formValidation]) // solo se vuelve a ejecutar cuando hay cambios en el formValidation
  
  const createValidate=()=>{ //validar campos del formulario
    const formCheckedValues={} //analizar todas las propiedades del formulario
    for (const formField of Object.keys(formValidations)) {
      //fn=> funcion de validacion
      const [fn,errorMessage ]=formValidations[formField];
      //null=>no hay mensaje de error
      formCheckedValues[`${formField}Valid`]=fn(formState[formField])?null:errorMessage;
      setFormValidation(formCheckedValues); //se obtiene el objecto
    }
  }

  const onResetForm=()=>{
    setFormState(initialForm)
  }

  return { ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
    OnNavegate
  }
}