# Taller Mecánico (Módulo Frontend)
Desarrollo frontend del ABM del Taller Mecánico utilizando la tecnologia React

Encargados del desarrollo:
-Nicolas Mairone
-Santiago Pedraza
-Lucas Palacios
=======
## Líderes de Proyecto
- MAIRONE, Nicolás Nahuel
- PEDRAZA, Santiago

## Despliegue
Este tutorial de configuración de despliegue inicial asume que el usuario ya posee una instalación válida de [**NodeJS**](https://nodejs.org/en/download/) (versión recomendada v18.2.0).

1. Clonar el proyecto utilizando `git`.
```bash
$ git clone https://github.com/Programacion-Avanzada-2023/Front.git
$ cd Front
```

2. Posicionarse en la carpeta `taller`
```bash
$ cd taller
$ pwd
/home/user/Front/taller
```

3. Instalar las dependencias del proyecto con el package manager `npm`
```bash
$ npm install
```

4. Ejecutar el proyecto en el entorno local. El proyecto se ejecutará en el puerto `3000`.
```bash
$ npm run start
```

5. (Opcional) Si ejecuta el [backend Springboot](https://github.com/Programacion-Avanzada-2023/taller-mecanico) en otro puerto que no sea el por defecto (`8080`), asegúrese de cambiar el valor de hostname en el archivo `app.config.js` localizado en la carpeta `Front/taller`
```js
export const SpringBoot_Api = "http://localhost:8080";
```

## Troubleshooting
### `missing dependency "react"`
Asegurarse de ejecutar el comando `npm install` y estar posicionado en la carpeta `taller` desde el root del proyecto.
