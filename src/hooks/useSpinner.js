import { useState } from "react";

export const UseSpiner=()=>{

    const [isActive,setActive]=useState(false);
    
    const onActiveSpinner=(valor)=>{
        setActive(valor);
    }
   
    return{
        isActive,
        onActiveSpinner
    }
  }