export const Footer=()=>{
  return (
    <footer className="bg-dark text-white p-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-4 mb-md-0 text-center text-md-start">
            <img
              src={require('../../assets/img/MusicWorld_Logo.png')}
              alt="MusicWorld"
              width="150"
              height="150"
              className="d-inline-block align-text-top shadow-sm rounded-circle"
            />
          </div>
          <div className="col-12 col-md-4 mt-4 mt-md-0">
            <h5>Contáctanos</h5>
            <p>
              Dirección: Av. Amazonas N43-54 y Río Coca
              <br />
              Email: musicworld@hotmail.com
              <br />
              Teléfono: +1 234 567 890
            </p>
          </div>
          <div className="col-12 col-md-4 mt-4 mt-md-0">
            <h5>Redes Sociales</h5>
            <p>
              <a href="#" className="text-white me-2">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="text-white me-2">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-12">
            <p className="text-center">
              &copy; {new Date().getFullYear()} MusicWorld. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}