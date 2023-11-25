import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import moment from "moment/moment";
import { useAuthStore, useFrom, useResourceStore } from '../../hooks/index.js';

export const Producto=()=>{

  const {status,user}=useAuthStore();
  const {items,Lista_Producto,AddItemsCart,ListarProductos,CategoriaProducto,ListarCategoriaProducto}=useResourceStore();
  const {OnNavegate}=useFrom();
  
  const [filter,setfilter]    = useState([]);
  const [listProducto,setlistProducto]    = useState([]);

  const [agragado,setAgregado]    = useState(false);
  const [encarrito,setenCarrito]  = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleShow = (valor) =>{
    setShowModal(valor)
  }

  useEffect(() => {
    ListarProductos();
    ListarCategoriaProducto();
    setlistProducto(Lista_Producto);
  },[Lista_Producto.length,CategoriaProducto.length]);

  const AddCart=(producto)=>{
    setAgregado(false);
    setenCarrito(false);
   
    if (status=="authenticated") {
      moment.locale('Es');
      const fecha=moment().format();
      const inCart=items.length?items.find(p=>p.id===producto.id):undefined;
      if (inCart===undefined) {
        // estadoId=> 1	Comprado
        // estadoId=> 2	Pendiente
        setAgregado(true);
        handleShow(true);
        AddItemsCart({estadoId:2,usuarioId:user.uid,productoId:producto.id,ordenId:0,cantidad:1,fecha:fecha})
      }else{
        setenCarrito(true);
        handleShow(true);
      }
    }else{
      OnNavegate("/auth/login");
    }
  }
  
  const onFilter=(valor)=>{
    if (filter.includes(valor)) {
      const updated = filter.filter((p) => p !== valor);
      setfilter(updated);
    }else {
      const updatedFilter = [...filter, valor];
      setfilter(updatedFilter);
    }
  }
  
  useEffect(()=>{ 
    if (filter.length!=0) {
      const Filtro = Lista_Producto.filter(p => filter.includes(p.categoria_producto_Id));
      setlistProducto(Filtro);
    }else{
      setlistProducto(Lista_Producto);
    }
  },[filter.length])

  return (
   <>
    <div className="col-12">
      <h1 className="text-description">Filtrar por:</h1>
      <div className="row col-12">
        {
          CategoriaProducto.map((categoria)=>(
            <div className="col-md-2 form-check" key={categoria.id}>
              <input className="form-check-input" type="checkbox" value={categoria.id}
                onClick={()=>{onFilter(categoria.id)}}
              />
              <label className="form-check-label">
                {categoria.nombre_categoria}
              </label>
            </div>
          ))
        }
        </div>
    </div>
     <div className="col-12 row d-md-flex justify-content-md-center backInLeft">
      {
        (listProducto.length!=0)?listProducto.slice(indexOfFirstItem, indexOfLastItem).map((producto)=>(   
          <div className="card col-md-4 shadow-sm p-2 m-2 m-md-4 border-0 "key={producto.id}>
            <div className="col-12">
                <div className="col-12 d-flex justify-content-center">
                  <img className='img-thumbnail border-0 p-2 p-md-4' 
                    width={200}
                  src={require(`../../assets/img/productos/${producto.url_Img}`)} 
                  alt={producto.nombre_producto}/>
                </div>
                <div className="col-12 d-flex justify-content-center text-justify text-description pt-2">
                  <span><b>{producto.nombre_producto}</b></span>
                </div>
                <div className="col-12 d-flex justify-content-center text-justify text-description p-2 p-md-4">
                  <span>{producto.descripcionxs}</span>
                </div>
                <div className="row col-12 p-2 pe-md-4 ps-md-4">
                  <span className="text-small">Antes: <del> ${producto.precio_antes}</del></span>
                  <span className="text-lg-red">Ahora: ${producto.precio_ahora}</span>
                </div>
            </div>
            <div className="col-12 d-flex justify-content-center p-2">
              <button className="btn btn-card"
                onClick={()=>{AddCart(producto)}}
              >Agregar al Carrito</button>
            </div>
          </div>
        )):<span className="d-flex justify-content-center p-5">No hay resultados.</span>
      }
      <Modal centered={true} isOpen={showModal} toggle={()=>{handleShow(false)}}>
        <ModalHeader toggle={()=>{handleShow(false)}}>
        </ModalHeader>
        <ModalBody>
          <p>{encarrito?'En el carrito':agragado?'Agregado':''}</p>
        </ModalBody>
      </Modal>
    </div>
    <div className="row col-12 p-4">
      <div className="col-6">
        <div className="btn-group me-2" role="group" aria-label="First group">
        <button type="button" className="btn btn-outline-secondary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
            Anterior
          </button>
          <button type="button" className="btn btn-outline-secondary" 
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= (Lista_Producto.length)}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
   </>
  )
}