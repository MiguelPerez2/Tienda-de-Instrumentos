
export const Home=()=>{
    return (
    <div className="fondo mb-5">
      <section>
            <div className="imagen-principal"> </div>
      <div >
          <h1 style={{fontSize:'100px' ,fontFamily:'georgia',fontStyle:'italic' ,textAlign:'center', margin:'20px'}}>MusicWorld</h1>
          <h2 style={{textAlign:'center',margin:'20px'}}>La mejor alternativa para obtener ese instrumento musical que tanto deseas, con la seguridad y garantia que necesitas y siempre disponible</h2>
      </div>
      </section>
      <section style={{display: 'flex',justifyItems:'center', alignItems:'center'}}>
        <div className="carta"  >
            <h2 className="letra">Ya sea por gusto o por negocio, guitarras de diferentes tipos que se ajusten a tu gusto. De diferentes tamaños, materiales y el sonido que emiten, gran variedad para escoger</h2>
            <div className="imagen">
              <img 
              src={require(`../../assets/img/home/guitarra1.jpg`)}
              alt="guitarra1"
              style={{ width: '700px', height: 'auto' }}
              />
            </div>
        </div>
        <div className="carta">
            <h2 className="letra">Desde los instrumentos mas basicos hasta unos que reflejan un gusto mas especifico y puntual, pero nunca falta la garantía de calidad de fabicación.</h2>
            <div className="imagen">
              <img
              src={require(`../../assets/img/home/flauta.jpg`)}
              alt="Flauta"
              style={{ width: '650px', height: 'auto' }}
              />
            </div>
        </div>
      </section>
      <section style={{display: 'flex'}}>
        <div className="carta">
            <h2 className="letra">Instrumentos profesionales que pueden brindar un ambiente mas elegante y refinado, los oidos exigentes y mas entrenados notarán la diferencia.</h2>
            <div className="imagen">
              <img src={require(`../../assets/img/home/piano.jpg`)}
              alt="Piano"
              style={{ width: '700px', height: 'auto' }}
              />
            </div>
        </div>
        <div className="carta" >
            <h2 className="letra">Excelentes para crear momentos innolvidables con tus seres queridos. Comprendemos que la familia es lo mas importante.</h2>
            <div className="imagen">
              <img
              src={require(`../../assets/img/home/familia.jpg`)}
              alt="Familia"
              style={{ width: '730px', height: 'auto' }}
              />
            </div>
        </div>
      </section>
      <section style={{display: 'flex', justifyContent:'space-between'}}>
        <div className="carta">
            <h2 className="letra">Lideres en calidad e innovación, perfectos para los mas pequeños del hogar. </h2>
            <div className="imagen">
              <img 
              src={require(`../../assets/img/home/guitarra3.jpg`)}
              alt="Guitarra3"
              style={{ width: '680px', height: 'auto', objectFit: 'contain' }}
              />
            </div>
        </div>
        <div className="carta" >
            <h2 className="letra">Exprésate, inspirate y liberate, la musica es parte de nuestro dia a dia.</h2>
            <div className="imagen">
              <img className="imagen"
              src={require(`../../assets/img/home/bateria3.png`)}
              alt="Bateria"
              style={{ width: '650px', height: 'auto' }}
              />
            </div>
        </div>
      </section>
      <section >
        <div className="contenedor-imagen"> 
            <div className="imagen-fondo"> </div>
            <div className="text-over">
              <h1>Music is life</h1>
              <h2>That's why your heart has beats.</h2>
            </div>
          </div>
      </section>
    </div>
    )
}