import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { obtenerEstadisticasServicios } from "../api/Servicio.Controller";
import { StarIcon } from "./Icons/StarIcon";
import { ChartPieIcon } from "./Icons/ChartPieIcon";
import { PieChart, Pie, Tooltip } from "recharts";
import moment from "moment";
import "moment/locale/es";

function Home() {
  const [estadisticas, setEstadisticas] = useState([]);

  const [servicioMasSolicitado, setServicioMasSolicitado] = useState(null);

  useEffect(() => {
    obtenerEstadisticasServicios().then((estadisticas) => {
      setEstadisticas(estadisticas);

      buscarServicioMasSolicitado(estadisticas);
    });
  }, []);

  /**
   * @param {Array<import("../api/Servicio.Controller").EstadisticaServicio>} estadisticas
   */
  function buscarServicioMasSolicitado(estadisticas) {
    let servicioMasSolicitado = null;

    estadisticas.forEach((estadistica) => {
      if (
        !servicioMasSolicitado ||
        estadistica.cantidadSolicitudes >
          servicioMasSolicitado.cantidadSolicitudes
      ) {
        servicioMasSolicitado = estadistica;
      }
    });

    setServicioMasSolicitado(servicioMasSolicitado);
  }

  /** Estadisticas para la gráfica de tarta. */
  const pieChartStats = estadisticas.map((estadistica) => {
    return {
      name: estadistica.nombreServicio,
      value: estadistica.cantidadSolicitudes,
    };
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <Carousel data-bs-theme="dark" className="custom-banner">
          {/*Primer imagen*/}
          <Carousel.Item className="custom-carousel">
            <img
              className="d-block w-100"
              src="https://www.vilpazautomocion.es/images/servicios-taller-mecanico-pontevedra.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <p className="text-slide">
                Lleve la historia clinica de su vehiculo
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          {/*Segunda imagen*/}
          <Carousel.Item className="custom-carousel">
            <img
              className="d-block w-100"
              src="https://irp-cdn.multiscreensite.com/8d5dbcdf/MOBILE/jpg/1827296-taller-alberto-camacho-banner.jpg"
              alt="Second slide"
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>

          {/*Tercer imagen*/}
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
      </div>
      {estadisticas?.length ? (
        <div className="m-4 p-4 bg-white rounded-xl">
          <div className="grid grid-cols-2 gap-3">
            <div className="border-2 rounded-xl p-2">
              <div className="flex gap-2 items-center">
                <StarIcon />
                <p className="text-lg font-semibold">
                  Nuestro Servicio Estrella
                </p>
              </div>

              <p className="text-lg">
                Promovemos la calidad de nuestros servicios y satisfacción en
                felicidad de nuestra clientela.
              </p>
              <div className="pl-4">
                <div className="border-b-2">
                  <p className="text-4xl font-semibold uppercase">
                    {servicioMasSolicitado?.nombreServicio}
                  </p>
                </div>
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex flex-col items-center">
                    <p className="text-3xl font-semibold">
                      {servicioMasSolicitado?.cantidadSolicitudes}
                    </p>
                    <p className="text-lg">
                      veces solicitado por nuestros clientes
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-3xl font-semibold">
                      {servicioMasSolicitado?.cantidadTecnicos}
                    </p>
                    <p className="text-lg">
                      de nuestros técnicos proveen este servicio.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-3xl font-semibold">
                      {moment(
                        servicioMasSolicitado?.fechaUltimaSolicitud
                      ).fromNow()}
                    </p>
                    <p className="text-lg">
                      de la última vez que lo realizamos, y{" "}
                      <span className="font-semibold">
                        {moment(
                          servicioMasSolicitado?.fechaPrimeraSolicitud
                        ).fromNow()}
                      </span>{" "}
                      que lo ofrecemos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-2 rounded-xl p-2">
              <div className="flex gap-2 items-center">
                <ChartPieIcon />
                <p className="text-lg font-semibold">Tendencias</p>
              </div>

              <p className="text-lg">
                Las preferencias de nuestros clientes reflejan nuestro esfuerzo.
              </p>
              <PieChart width={window.innerWidth / 2} height={200}>
                <Pie
                  data={pieChartStats}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
