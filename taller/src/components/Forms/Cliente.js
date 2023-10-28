export default function Cliente() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Clientes</h1>
        <div className="w-full grid grid-cols-3 gap-x-2">
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Nombre <span className="text-red-400 text-sm">*</span>
            </span>
            <input
              type="text"
              className="w-full rounded-md p-2"
              placeholder="Nombre"
            />
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Apellido <span className="text-red-400 text-sm">*</span>
            </span>
            <input
              type="text"
              className="w-full rounded-md p-2"
              placeholder="Apellido"
            />
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              D.N.I. <span className="text-red-400 text-sm">*</span>
            </span>
            <input
              type="number"
              className="w-full rounded-md p-2"
              placeholder="D.N.I."
            />
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Telefono Celular <span className="text-red-400 text-sm">*</span>
            </span>
            <input
              type="text"
              className="w-full rounded-md p-2"
              placeholder="+54 ..."
            />
          </div>
          <div className="col-span-2 flex gap-x-2">
            <div className="w-full py-1">
              <span className="text-sm text-slate-600 p-0">Direccion</span>
              <input
                type="text"
                className="w-full rounded-md p-2"
                placeholder="Nombre de Calle"
              />
            </div>
            <div className="w-full py-1">
              <span className="text-sm text-slate-600 p-0">Altura</span>
              <input
                type="number"
                className="w-full rounded-md p-2"
                placeholder="Altura de Calle"
              />
            </div>
          </div>
          <div className="py-1 col-span-3 justify-self-center w-[50%]">
            <span className="text-sm text-slate-600 p-0">E-Mail</span>
            <input
              type="text"
              className="w-full rounded-md p-2"
              placeholder="alguien@test.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
