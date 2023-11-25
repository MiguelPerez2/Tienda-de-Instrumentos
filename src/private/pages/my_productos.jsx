import { useEffect, useState } from "react";
import { useResourceStore } from "../../hooks/index";

export const MyProductos =()=>{
  const { ItemsCartCompradoUser, ListCompradoCartUserId } = useResourceStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      ListCompradoCartUserId({id:localStorage.getItem("uid")});
    }
  },[]);// [] => se ejecuta una sola vez al iniciar
  
  return(
    <>
      <div className="col-12">
        <h1>_Mis Productos</h1>
        <br />
        <div className="col-12 table-responsive">
          <table className="table table-borderless text-center align-middle">
            <thead>
              <tr>
                <th>N°</th>
                <th>N_Orden</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Productos</th>
              </tr>
            </thead>
            <tbody>
            { ItemsCartCompradoUser.length!=0?ItemsCartCompradoUser.ordenes
              .slice(indexOfFirstItem, indexOfLastItem).map((orden,index)=>(
                <tr key={orden.id} className='shadow-sm bg-body rounded'>
                  <td className="col-2">
                    <span>{index+1}</span>
                  </td>
                  <td className="col-2">
                    <span>{orden.token_orden}</span>
                  </td>
                  <td className="col-2">
                    <span>${orden.total}</span>
                  </td>
                  <td className="col-2">
                    <span>{orden.fecha}</span>
                  </td>
                  <td className="col-2">
                    <span>{orden.estadoId==1?'Comprado':''}</span>
                  </td>
                  <td className="col-11 d-grid gap-2 mx-auto">
                    <button className="btn btn-outline-info" type="button" data-bs-toggle="collapse" 
                      data-bs-target={`#productos${orden.id}`} aria-expanded="false" 
                      aria-controls="collapseExample">
                      Ver Productos
                    </button>
                    <div className="collapse" id={`productos${orden.id}`}>
                      {
                        ItemsCartCompradoUser.items
                        .filter((item) => item.ordenId === orden.id).map((item) => (
                          <div key={item.id_item} className="row">
                              <span className="text-start">
                                Producto: {item.nombre_producto} 
                              </span> 
                              <div className="text-start">
                                Cantidad: {item.cantidad} 
                              </div>
                              <div className="text-start">
                                Precio: ${item.precio_ahora} 
                              </div>
                              <div className="text-start">
                                Total: ${(item.precio_ahora*item.cantidad).toFixed(2)} 
                              </div> 
                              <hr />
                          </div>
                        ))
                      }
                    </div>
                  </td>
                </tr>
              )):null
            }
            </tbody>
          </table>
          <div className="row col-12 p-4">
            <div className="col-md-6">
              <div className="btn-group me-2" role="group" aria-label="First group">
              <button type="button" className="btn btn-outline-secondary"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}>
                  Anterior
                </button>
                <button type="button" className="btn btn-outline-secondary" 
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={indexOfLastItem >= (ItemsCartCompradoUser.length!=0?ItemsCartCompradoUser.ordenes.length:0)}>
                  Siguiente
                </button>
              </div>
            </div>
            <div className="col-md-6 text-end">Total Items: { ItemsCartCompradoUser.length!=0?ItemsCartCompradoUser.ordenes.length:0 } </div>
          </div>
        </div>
      </div>
    </>
  )
}