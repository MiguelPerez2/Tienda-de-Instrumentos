
export const useCalculos=()=>{

  const total=(data)=>{
    return data.map(p =>(p.precio_ahora*p.cantidad)).reduce((prev, curr) => prev + curr, 0);
  }
  const generateToken=(email)=>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'+email;
    const randomValues = new Uint32Array(15);
    window.crypto.getRandomValues(randomValues);
    let transactionId = '';
    for (let i = 0; i < randomValues.length; i++) {
      const randomIndex = randomValues[i] % chars.length;
      transactionId += chars.charAt(randomIndex);
    }
    return transactionId;
  }

  return{
    total,
    generateToken
  }
}