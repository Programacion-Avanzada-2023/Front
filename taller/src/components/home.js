import { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { obtenerEstadisticasServicios } from "../api/Servicio.Controller";
import { StarIcon } from "./Icons/StarIcon";
import { ChartPieIcon } from "./Icons/ChartPieIcon";
import { PieChart, Pie, Tooltip } from "recharts";
import Select from "react-select";
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
import { SpringBoot_Api } from "../app.config";
import { useTecnicoContext } from "../context/TecnicoContextProvider";

function Home() {
  const { tecnicos } = useTecnicoContext();

  const [estadisticas, setEstadisticas] = useState([]);

  const [estadisticasFiltradas, setEstadisticasFiltradas] = useState([]);

  const [servicioMasSolicitado, setServicioMasSolicitado] = useState(null);

  /** 1 significa por fecha, 2 por tecnico. 0 es sin filtro. */
  const [filtro, setFiltro] = useState(0);

  /** filtros de fecha */
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  /** filtros de tecnico */
  const [tecnico, setTecnico] = useState(null);
  const tecnicoSelectRef = useRef(null);

  useEffect(() => {
    obtenerEstadisticasServicios().then((estadisticas) => {
      setEstadisticas(estadisticas);
      setEstadisticasFiltradas(estadisticas);

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
  const pieChartStats = estadisticasFiltradas.map((estadistica) => {
    return {
      name: estadistica.nombreServicio,
      value: estadistica.cantidadSolicitudes,
    };
  });

  async function filtrar(fechaInicio, fechaFin, tecnico) {
    switch (filtro) {
      case 0:
        return;
      case 1: {
        if (new Date(fechaFin) < new Date(fechaInicio)) return;

        const { data } = await axios({
          method: "GET",
          url: `${SpringBoot_Api}/servicios/estadisticas`,
          params: {
            fechaInicio,
            fechaFin,
          },
        });

        setEstadisticasFiltradas(data);

        break;
      }
      case 2: {
        const { data } = await axios({
          method: "GET",
          url: `${SpringBoot_Api}/servicios/estadisticas`,
          params: {
            tecnico,
          },
        });

        setEstadisticasFiltradas(data);

        break;
      }
      default:
        return;
    }
  }

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
          <div className="w-max flex flex-col gap-2 m-2 p-2">
            <h1 className="text-xl">Filtrar Estadísticas de Servicio</h1>
            <span className="text-gray-500">
              Se verá reflejado en las tendencias los filtros, ya que nuestro
              servicio estrella es global.
            </span>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="filtro"
                id="filtro1"
                onChange={(e) => {
                  if (e.target.checked) setFiltro(2);
                }}
              />
              <label htmlFor="filtro1">Por Técnico</label>
              <input
                type="radio"
                name="filtro"
                id="filtro2"
                onChange={(e) => {
                  if (e.target.checked) setFiltro(1);
                }}
              />
              <label htmlFor="filtro2">Por Fechas</label>
              <button
                className="bg-blue-500 text-white rounded-xl p-2"
                onClick={() => {
                  setEstadisticasFiltradas(estadisticas);

                  setFiltro(0);
                  setFechaFin(null);
                  setFechaInicio(null);
                  setTecnico(null);
                  tecnicoSelectRef?.current?.clearValue();

                  // Limpiar radio buttons
                  document.getElementById("filtro1").checked = false;
                  document.getElementById("filtro2").checked = false;
                }}
              >
                Limpiar Filtros
              </button>
            </div>
            <div className="border-1 rounded-xl flex gap-2 p-2">
              {filtro === 0 ? (
                <p className="text-lg text-gray-300 text-center">Sin Filtros</p>
              ) : filtro === 1 ? (
                <>
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Fecha de Inicio</span>
                    <input
                      type="date"
                      className="p-2 border rounded-xl"
                      onChange={(e) => {
                        setFechaInicio(e.target.value);

                        if (fechaFin)
                          filtrar(e?.target?.value, fechaFin, tecnico);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Fecha de Fin</span>
                    <input
                      type="date"
                      className="p-2 border rounded-xl"
                      onChange={(e) => {
                        setFechaFin(e.target.value);

                        if (fechaInicio)
                          filtrar(fechaInicio, e?.target?.value, tecnico);
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Técnico</span>
                  <Select
                    isSearchable
                    placeholder="Seleccione un tecnico"
                    ref={tecnicoSelectRef}
                    options={tecnicos.map((tecnico) => ({
                      value: tecnico.id,
                      label: `${tecnico.person.name} ${tecnico.person.surName}`,
                    }))}
                    onChange={(e) => {
                      const id = e?.value ?? null;

                      setTecnico(parseInt(id));
                      filtrar(fechaInicio, fechaFin, tecnico);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
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
