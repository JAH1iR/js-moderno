/**
 * src/main.js
 * 
 * CONTROLADOR PRINCIPAL / ORQUESTADOR DE LA APLICACIÓN (Entry Point)
 * Integración con Estado Reactivo y Carga Asíncrona (Módulos 1 al 5)
 * 
 * Flujo de Inicialización y Ciclo de Vida:
 * 1. Inicialización de referencias del DOM y registro de escuchadores (Event Listeners).
 * 2. Suscripción de la función `render` al Store global mediante `subscribe(render)`.
 * 3. Ejecución de `arrancarApp()`:
 *    - Despliega un estado visual de carga ("Loading State") para informar al usuario.
 *    - Invoca asincrónicamente al servicio (`cargarTareasIniciales()`).
 *    - Al resolver la promesa, despacha `setState({ tareas: tareasCargadas })`.
 *    - La reactividad del store se encarga de re-renderizar la UI con los datos definitivos.
 */

import { getState, setState, subscribe } from "./state/store.js";
import { cargarTareasIniciales } from "./services/tareasService.js";
import { agregarTarea } from "./modules/agregarTarea.js";
import { eliminarTarea } from "./modules/eliminarTarea.js";
import { modificarTarea } from "./modules/modificarTarea.js";
import { filtrarTareas } from "./modules/filtrarTareas.js";
import { renderizarListaTareas } from "./components/listaTareas.js";
import { listenerFormularioTarea } from "./components/formularioTarea.js";

// =============================================================================
// 1. REFERENCIAS AL DOM
// =============================================================================
const listaContenedor = document.getElementById("lista-tareas");
const formulario = document.getElementById("form-tarea");
const inputBusqueda = document.getElementById("input-busqueda");
const selectFiltroEstado = document.getElementById("select-filtro-estado");

// =============================================================================
// 2. FUNCIÓN DE RENDERIZADO (Suscriptora del Store)
// =============================================================================
/**
 * Extrae los datos actuales del store, aplica los filtros activos
 * y delega el dibujado del HTML al componente de presentación.
 */
function render() {
  const { tareas, filtros } = getState();

  // Filtrado dinámico según el término de búsqueda y el estado seleccionado
  const tareasParaMostrar = filtrarTareas(tareas, {
    estado: filtros.estado === "todos" ? null : filtros.estado,
    busqueda: filtros.busqueda
  });

  renderizarListaTareas(tareasParaMostrar, listaContenedor);
}

// =============================================================================
// 3. SUSCRIPCIÓN REACTIVA (Patrón Observer)
// =============================================================================
// Cada vez que se invoque setState(), la función render() se ejecutará automáticamente
subscribe(render);

// =============================================================================
// 4. ESCUCHADOR DE FORMULARIO (Agregar nueva tarea)
// =============================================================================
listenerFormularioTarea(formulario, (nuevaTareaDatos) => {
  setState((estadoPrevio) => ({
    ...estadoPrevio,
    tareas: agregarTarea(estadoPrevio.tareas, nuevaTareaDatos)
  }));
});

// =============================================================================
// 5. ESCUCHADORES DE FILTROS (Búsqueda en tiempo real y cambio de estado)
// =============================================================================
// Evento 'input': búsqueda instantánea con cada tecla pulsada
inputBusqueda.addEventListener("input", (e) => {
  const busqueda = e.target.value;
  setState((estadoPrevio) => ({
    ...estadoPrevio,
    filtros: { ...estadoPrevio.filtros, busqueda }
  }));
});

// Evento 'change': cambio de filtro por estado
selectFiltroEstado.addEventListener("change", (e) => {
  const estadoFiltro = e.target.value;
  setState((estadoPrevio) => ({
    ...estadoPrevio,
    filtros: { ...estadoPrevio.filtros, estado: estadoFiltro }
  }));
});

// =============================================================================
// 6. DELEGACIÓN DE EVENTOS (Event Delegation: Completar / Eliminar)
// =============================================================================
/**
 * Un solo event listener en el contenedor padre gestiona los clics de todos los hijos,
 * aprovechando el burbujeo de eventos (Event Bubbling) y optimizando el uso de memoria.
 */
listaContenedor.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id;

  if (!id) return;

  const { tareas } = getState();

  // Botón Completar / Deshacer
  if (target.classList.contains("btn-completar")) {
    const tareaActual = tareas.find((t) => t.id === id);
    if (!tareaActual) return;

    const nuevoEstado = tareaActual.estado === "hecha" ? "pendiente" : "hecha";
    setState((estadoPrevio) => ({
      ...estadoPrevio,
      tareas: modificarTarea(estadoPrevio.tareas, id, { estado: nuevoEstado })
    }));
  }

  // Botón Eliminar
  if (target.classList.contains("btn-eliminar")) {
    setState((estadoPrevio) => ({
      ...estadoPrevio,
      tareas: eliminarTarea(estadoPrevio.tareas, id)
    }));
  }
});

// =============================================================================
// 7. INICIALIZACIÓN ASINCRÓNICA DE LA APLICACIÓN (Módulo 5)
// =============================================================================
/**
 * Orquesta la secuencia de inicio asíncrono:
 * 1. Muestra un indicador visual de carga ("Loading State") en la UI.
 * 2. Espera la respuesta de la capa de servicio (localStorage o mockApi).
 * 3. Actualiza el Store mediante setState(), disparando automáticamente el render final.
 */
async function arrancarApp() {
  // Retroalimentación visual inmediata mientras dura la petición asíncrona
  listaContenedor.innerHTML = `<p style="padding: 1rem; color: #666;">⏳ Cargando tareas del servidor...</p>`;

  try {
    // Esperamos a que la capa de servicio resuelva las tareas
    const tareasCargadas = await cargarTareasIniciales();

    // Actualizamos el estado con las tareas recuperadas
    setState({ tareas: tareasCargadas });
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
    listaContenedor.innerHTML = `<p style="padding: 1rem; color: #c62828;">❌ Error al cargar las tareas.</p>`;
  }
}

// Arranque de la aplicación
arrancarApp();