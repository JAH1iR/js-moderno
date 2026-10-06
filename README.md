# Task Manager - JS Moderno

Aplicación de gestión de tareas construida con JavaScript vanilla, ES Modules y un flujo de estado reactivo inspirado en patrones modernos de frontend.

## Descripción

Este proyecto simula un gestor de tareas con:

- creación de nuevas tareas
- marcado como completada o pendiente
- eliminación de tareas
- búsqueda por texto
- filtrado por estado
- persistencia en `localStorage`
- carga inicial desde una API mock y caché local

La lógica está organizada por responsabilidades: estado, servicios, módulos y componentes, siguiendo una estructura modular y mantenible.

## Tecnologías

- JavaScript ES Modules
- HTML5
- CSS3
- `localStorage`
- Patrón de estado reactivo con suscripción y renderizado

## Características principales

- UI interactiva y dinámica sin frameworks
- Inmutabilidad al actualizar el estado
- Separación por capas: `state`, `services`, `modules`, `components`, `api`
- Carga asíncrona inicial de tareas
- Persistencia de datos del usuario en el navegador

## Estructura del proyecto

```text
js-moderno/
├── index.html
├── package.json
├── README.md
├── src/
│   ├── main.js
│   ├── api/
│   │   ├── mockApi.js
│   │   └── storage.js
│   ├── components/
│   │   ├── formularioTarea.js
│   │   └── listaTareas.js
│   ├── data/
│   │   └── tareas.js
│   ├── modules/
│   │   ├── agregarTarea.js
│   │   ├── eliminarTarea.js
│   │   ├── filtrarTareas.js
│   │   └── modificarTarea.js
│   ├── services/
│   │   └── tareasService.js
│   ├── state/
│   │   └── store.js
│   └── styles/
│       └── main.css
```

## Requisitos

- Navegador moderno
- VS Code (recomendado)
- Extensión Live Server o un servidor estático local

## Cómo ejecutar

### Opción 1: Live Server

1. Abre la carpeta del proyecto en VS Code.
2. Haz clic derecho en `index.html`.
3. Selecciona `Open with Live Server`.

### Opción 2: Servidor estático local

Desde la raíz del proyecto, puedes ejecutar algo como:

```bash
python -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000
```

## Scripts disponibles

En `package.json` se incluye el script:

```bash
npm start
```

Este muestra la instrucción de abrir el proyecto con Live Server.

## Flujos de la aplicación

- La aplicación inicia en `src/main.js`.
- Se suscribe al store para renderizar cada cambio.
- Al arrancar, carga tareas desde almacenamiento local o desde el mock de servidor.
- El usuario puede agregar, completar o eliminar tareas.
- Los filtros actualizan la vista en tiempo real.

## Nota

Este es un proyecto educativo y de práctica para comprender JavaScript moderno, modularización y gestión de estado sin librerías externas.

## Licencia

MIT
