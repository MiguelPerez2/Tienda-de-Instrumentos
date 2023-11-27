
export const Home=()=>{
    return (
    <div className="fondo mb-5">
      <section>
        <div className="imagen-principal"> </div>
        <div >
            <h1 className="h5 display-3" style={{fontFamily:'georgia',fontStyle:'italic' ,textAlign:'center', margin:'20px'}}>MusicWorld</h1>
            <p style={{textAlign:'center',margin:'20px'}}>La mejor alternativa para obtener ese instrumento musical que tanto deseas, con la seguridad y garantia que necesitas y siempre disponible</p>
        </div>
      </section>
      <div className="d-flex justify-content-center">
        <div className="col-12 row d-flex justify-content-center">
          <div className="card mb-2 col-md-5 m-md-2 p-2 border-0 color-carta ">
            <div className="card-body">
              <p className="card-text text-justify">Ya sea por gusto o por negocio, guitarras de diferentes tipos que se ajusten a tu gusto. De diferentes tamaños, materiales y el sonido que emiten, gran variedad para escoger.</p>
            </div>
            <img 
              className="rounded "
              src={require(`../../assets/img/home/guitarra1.jpg`)}
              alt="guitarra1"
              />
          </div>
          <div className="card mb-2 col-md-5 m-md-2 p-2 border-0 color-carta ">
            <div className="card-body">
              <p className="card-text text-justify">Desde los instrumentos mas basicos hasta unos que reflejan un gusto mas especifico y puntual, pero nunca falta la garantía de calidad de fabicación.</p>
            </div>
            <img 
              className="rounded "
              src={require(`../../assets/img/home/flauta.jpg`)}
              alt="flauta"
              />
          </div>
          <div className="card mb-2 col-md-5 m-md-2 p-2 border-0 color-carta ">
            <div className="card-body">
              <p className="card-text text-justify">Instrumentos profesionales que pueden brindar un ambiente mas elegante y refinado, los oidos exigentes y mas entrenados notarán la diferencia.</p>
            </div>
            <img 
              className="rounded "
              src={require(`../../assets/img/home/piano.jpg`)}
              alt="piano"
              />
          </div>
          <div className="card mb-2 col-md-5 m-md-2 p-2 border-0 color-carta ">
            <div className="card-body">
              <p className="card-text text-justify">Excelentes para crear momentos innolvidables con tus seres queridos. Comprendemos que la familia es lo mas importante.</p>
            </div>
            <img 
              className="rounded "
              src={require(`../../assets/img/home/familia.jpg`)}
              alt="Familia"
              />
          </div>
          <div className="card mb-2 col-md-5 m-md-2 p-2 border-0 color-carta ">
            <div className="card-body">
              <p className="card-text text-justify">Lideres en calidad e innovación, perfectos para los mas pequeños del hogar.</p>
            </div>
            <img 
              className="rounded "
              src={require(`../../assets/img/home/guitarra3.jpg`)}
              alt="guitarra3"
              />
          </div>
          <div className="card mb-2 col-md-5 m-md-2 p-2 border-0 color-carta ">
            <div className="card-body">
              <p className="card-text text-justify">Exprésate, inspirate y liberate, la musica es parte de nuestro dia a dia.</p>
            </div>
            <img 
              className="rounded "
              src={require(`../../assets/img/home/bateria3.png`)}
              alt="bateria3"
              />
          </div>
        </div>
      </div>
      <section className="col-12 d-flex justify-content-center" >
          <div className="col-12 contenedor-imagen"> 
            <div className="imagen-fondo"> </div>
            <div className="text-over">
              <h1>Music is life</h1>
              <p>That's why your heart has beats.</p>
            </div>
          </div>
        </section>
    </div>
    )
}