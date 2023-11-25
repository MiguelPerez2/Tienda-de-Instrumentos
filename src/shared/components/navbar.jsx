import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from "react-router-dom";

import { useAuthStore,useCalculos,useFrom,useResourceStore } from '../../hooks/index';


export const Navbar=()=>{

  const location = useLocation();

  const { status,user,startLogout } = useAuthStore();
  const { items, EliminarItemsCartUserId } = useResourceStore();

  const { total } = useCalculos();
  const {OnNavegate}=useFrom();

  return (
    <>
      <nav className="shadow-sm p-4 mb-5 bg-body rounded me-2 ms-2 me-md-5 ms-md-5">
        <div className="d-none d-sm-block">
          <div className="col-12 d-flex justify-content-between">
            <div>
            <a style={{ cursor: 'pointer' }} className="navbar-brand d-flex align-items-center"
                   onClick={()=>{OnNavegate('/')}}
              >
              <img src={require('../../assets/img/MusicWorld_Logo.png')} alt="MusicWorld" width="50" height="50" 
                className="d-inline-block align-text-top"/>
                MusicWorld
            </a>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button className="me-2 btn-nav"
                onClick={()=>{OnNavegate('/productos')}}>
                  Productos
              </button>
              {
                (status!="authenticated")?(
                  <button className="me-2 btn-nav"
                  onClick={()=>{OnNavegate('auth/login')}}
                  ><i className="bi bi-shield-lock btn-nav"></i>
                  </button>
                ):
                (
                  <>
                    <button className="me-2 btn-nav" data-bs-toggle="dropdown"
                      >
                        { user.name +' '}
                        <i className="bi bi bi-person-circle btn-nav"></i>
                    </button>
                    <div className="dropdown-menu row row-cols-12">
                      <li><button className="dropdown-item text-center" onClick={()=>{OnNavegate('user/my_profile')}}>Mi Perfil</button></li>
                      <li><button className="dropdown-item text-center" onClick={()=>{OnNavegate('user/my_productos')}}>Mis Productos</button></li>
                      <li><button className="dropdown-item text-center" onClick={()=>{startLogout()}}>Cerrar sesión</button></li>
                    </div>
                  </>
                )
              }
              {(location.pathname!=="/user/payment")?
                <button type="button" className="btn btn-nav position-relative"
                data-bs-toggle="offcanvas" data-bs-target="#cartOff" 
                aria-controls="offcanvasScrolling"
                >
                <i className="bi bi-cart4 btn-nav"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge 
                  rounded-pill bg-light text-dark">
                {items.length?items.length:0}
                </span>
              </button>:null
              }
            </div>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-between d-block d-sm-none">
          <div>
            <a style={{ cursor: 'pointer' }} className="navbar-brand d-flex align-items-center"
              onClick={()=>{OnNavegate('/')}}
              >
              <img src={require('../../assets/img/MusicWorld_Logo.png')} alt="MusicWorld" width="40" height="40" 
                className="d-inline-block align-text-top"/>
                MusicWorld
            </a>
          </div>
          <div className="col-6 d-flex justify-content-end pe-3">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" 
            data-bs-target="#Navbar" aria-controls="Navbar" 
            aria-label="Toggle navigation">
            <i className="bi bi-list"></i>
            </button>
          </div>
          <div className="offcanvas offcanvas-end border border-0" tabIndex="-1" id="Navbar"
            aria-labelledby="NavbarLabel">
            <div className="d-flex justify-content-between p-2" style={{ backgroundColor: 'rgb(157 47 15)' }}>
              <span className="ps-2" data-bs-dismiss="offcanvas">
                <i className="bi bi-chevron-double-left"style={{fontsize: '25px', color: '#f1f1f1'}}></i>
              </span>
            </div>
            <div className="d-flex justify-content-center p-2">
              <img src={require('../../assets/img/MusicWorld_Logo.png')} alt="ElecBillNow" 
                width="100" height="100" className="d-inline-block align-text-top"/>
            </div>
            <div className="offcanvas-body">
                <div className="row rows-col-12">
                  <button className="mt-2 btn-nav"  data-bs-dismiss="offcanvas"
                  onClick={()=>{OnNavegate('/productos')}}>Productos</button>
                  {
                    (status!="authenticated")?
                      <button className="me-2 btn-nav"
                      onClick={()=>{OnNavegate('auth/login')}}
                      ><i className="bi bi-shield-lock btn-nav"></i>
                      </button>
                    :
                    <>
                      <button className="me-2 btn-nav" data-bs-toggle="collapse" href="#user"
                        >
                        { user.name +' '}
                        <i className="bi bi bi-person-circle btn-nav"></i>
                      </button>
                      <div className="collapse pt-3" id="user">
                        <div className="card card-body border-1">
                          <div className="row row-cols-12">
                            <button className="dropdown-item text-center" data-bs-dismiss="offcanvas" onClick={()=>{OnNavegate('user/my_profile')}}>Mi Perfil</button>
                            <button className="dropdown-item text-center" data-bs-dismiss="offcanvas" onClick={()=>{OnNavegate('user/my_productos')}}>Mis Productos</button>
                            <button className="dropdown-item text-center" data-bs-dismiss="offcanvas" onClick={()=>{startLogout()}}>Cerrar sesión</button>
                          </div>
                        </div>
                      </div>

                      {
                        (location.pathname!=="/user/payment")?
                          <button type="button" className="btn btn-nav position-relative pt-4"
                          data-bs-toggle="offcanvas" data-bs-target="#cartOff" 
                          aria-controls="offcanvasScrolling"
                          >
                          <i className="bi bi-cart4 btn-nav"></i>
                          <span style={{top:15}} className="position-absolute  translate-middle badge
                            rounded-pill bg-light text-dark">
                          {items.length?items.length:0}
                          </span>
                        </button>:null
                      }
                    </>
                    
                  }
                </div>
            </div>
          </div>
        </div>
      </nav>  


      
      <div className="offcanvas offcanvas-end border border-white" data-bs-scroll="true" 
          data-bs-backdrop="false" tabIndex="-1" id="cartOff" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">_Mi carrito</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
         {items.length?items.map((Producto)=>(
          <div className="col-12 d-flex justify-content-between" key={Producto.id}>
            <div className="row col-6">
              <div className="col-12">
                <img className='img-thumbnail img-prod border-0' height={100} width={100}
                src={require(`../../assets/img/productos/${Producto.url_Img}`)} alt={Producto.nombre_producto}/>
              </div>
              <span>
                {Producto.nombre_producto}
              </span>
              <span>${Producto.precio_ahora}</span>
            </div>
            <div className="col-6 d-flex align-items-center">
              <IconButton aria-label="delete" 
                onClick={()=>{EliminarItemsCartUserId({id:Producto.id_item},Producto)}}
                color="error">
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
         )):null}
          <br />
            {
              (items.length)?
              <>
                <div className="row rows-col-12">
                  <span>SubTotal: ${total(items).toFixed(2)}</span>
                </div>
                <br />
                <div className="col-12 d-flex justify-content-center">
                  <button className="btn btn-card" data-bs-dismiss="offcanvas"
                    onClick={()=>{OnNavegate("/user/payment")}}
                    >Ir al Carrito
                  </button>
                </div>
              </>
              :<div> Su carrito está vacío.</div>
            }
        </div>
      </div> 
    </> 
  )
}