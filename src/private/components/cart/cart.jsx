import {React} from 'react';
import PropTypes  from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { StepperCart } from '../index';
import { useCalculos,useResourceStore } from '../../../hooks/index';
import moment from 'moment';

export const Cart=()=> {

  const costoEnvio=35;
  const { items,EliminarItemsCartUserId,UpdateItemsCart} = useResourceStore();
  const { total } = useCalculos();
 

  const Increment = (item) => {
    moment.locale('Es');
    const fecha=moment().format();
    UpdateItemsCart({id:item.id_item,estadoId:item.estadoId,ordenId:0,cantidad:(item.cantidad+1),fecha:fecha})
  }
  const Decrease = (item) => {
    if (item.cantidad>1){
      moment.locale('Es');
      const fecha=moment().format();
      UpdateItemsCart({id:item.id_item,estadoId:item.estadoId,ordenId:0,cantidad:(item.cantidad-1),fecha:fecha})
    }
  }
  
  return (
    (items.length!=undefined?items.length:0)?
    <>
      <div className="p-4 card">
      <h5 className='card-title'>_Mi carrito</h5>
      <div className="table-responsive">
        <table className="table table-borderless text-center align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
          {  
          items.length!=undefined?items.map((Producto)=>(
            <tr key={Producto.id} className='shadow-sm bg-body rounded'>
              <td className='col-2'>
                <div className="col-12 shadow-sm">
                  <div className='text-start mb-2'>
                    <span>{Producto.nombre_producto}</span>
                    <br />
                    <span>En stock: {Producto.stock}</span>
                  </div>
                  <img className='img-thumbnail img-prod border-0' 
                  src={require(`../../../assets/img/productos/${Producto.url_Img}`)} alt={Producto.nombre_producto}/>
                </div>
              </td>
              <td> 
                <div>
                  <button className='btn btn-outline-secondary border-0'
                    onClick={()=>{Increment(Producto)}}
                  >
                    +
                  </button>
                  <div className='p-2'>{Producto.cantidad}</div>
                  <button className='btn btn-outline-secondary border-0'
                    onClick={()=>{Decrease(Producto)}}
                  >
                    -
                  </button>
                </div>
              </td>
              <td>$ {Producto.precio_ahora}</td>
              <td>$ {(Producto.precio_ahora * Producto.cantidad).toFixed(2)}</td>
              <td>
              <IconButton aria-label="delete" 
                onClick={()=>{EliminarItemsCartUserId({id:Producto.id_item},Producto)}}
                color="error">
                <DeleteIcon />
              </IconButton>
              </td>
            </tr>
          )):null}
          </tbody>
        </table>
      </div>
      <div className='row row-cols-12 text-start text-md-end bg-light p-4 shadow-sm bg-body rounded'>
          <span className='p-2'><b>Costo de Envío:</b> ${ costoEnvio.toFixed(2)}</span>
          <span className='p-2'><b>Subtotal:</b> $ {total(items).toFixed(2)}</span>
          <span className='p-2'><b>Total:</b> $ {(total(items)+costoEnvio).toFixed(2)}</span>
        </div>
      </div>
      <StepperCart
        total={(total(items)+costoEnvio).toFixed(2)}
        productos={items}
      />
    </>:<div> Su carrito está vacío.</div>
  );
}

Cart.propTypes={
  id:PropTypes.number
}