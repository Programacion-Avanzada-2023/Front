import Carousel from 'react-bootstrap/Carousel';

function Home() {
  return (
    <Carousel data-bs-theme="dark" className="custom-banner">
      <Carousel.Item className="custom-carousel">
        <img
          className="d-block w-100"
          src="https://www.vilpazautomocion.es/images/servicios-taller-mecanico-pontevedra.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <p  className="text-slide">Lleve la historia clinica de su vehiculo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="custom-carousel">
        <img
          className="d-block w-100"
          src="https://irp-cdn.multiscreensite.com/8d5dbcdf/MOBILE/jpg/1827296-taller-alberto-camacho-banner.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="custom-carousel">
        <img
          className="d-block w-100"
          src="https://motor.elpais.com/wp-content/uploads/2022/02/taller-2-1046x616.jpg"
          alt="Third slide"
        />
        <Carousel.Caption className="Text-slide">
          <p className="text-slide">Amplia experiencia a su servicio</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;