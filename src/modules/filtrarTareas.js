/**
 * src/modules/filtrarTareas.js
 * 
 * LÓGICA DE NEGOCIO: FILTRADO MULTICRITERIO (Filtro Combinatorio Inmutable)
 * 
 * Propósito:
 * Evaluar una lista de tareas contra múltiples criterios de filtrado simultáneos:
 * 1. Estado (ej. 'pendiente', 'hecha').
 * 2. Prioridad (ej. 'baja', 'media', 'alta').
 * 3. Búsqueda textual (coincidencia en título o descripción, insensible a mayúsculas/minúsculas).
 * 
 * Principio:
 * Si un criterio no se especifica (es falsy o undefined), no debe restringir el resultado
 * (evalúa a `true`). Una tarea solo se incluye en el resultado si cumple TODOS los criterios
 * activos (operación AND lógica).
 */

/**
 * Filtra tareas según criterios opcionales de estado, prioridad y texto de búsqueda.
 * 
 * @param {Array<Object>} listaTareas - Arreglo de tareas a evaluar.
 * @param {Object} [criterios={}] - Objeto contenedor de filtros opcionales.
 * @param {string|null} [criterios.estado] - Estado específico o null/undefined si no aplica.
 * @param {string|null} [criterios.prioridad] - Prioridad específica o null/undefined.
 * @param {string} [criterios.busqueda] - Término de texto a buscar en título o descripción.
 * @returns {Array<Object>} Un nuevo arreglo con las tareas que cumplen todos los criterios aplicados.
 */
export function filtrarTareas(listaTareas, criterios = {}) {
  const { estado, prioridad, busqueda } = criterios;

  return listaTareas.filter((tarea) => {
    // 1. Evaluación de Estado:
    // Si viene un valor de estado, debe coincidir exactamente. Si no viene, pasa la condición (true).
    const cumpleEstado = estado ? tarea.estado === estado : true;

    // 2. Evaluación de Prioridad:
    // Si viene una prioridad definida, debe coincidir. Si no, pasa la condición.
    const cumplePrioridad = prioridad ? tarea.prioridad === prioridad : true;

    // 3. Evaluación de Búsqueda de Texto:
    // Normalizamos el texto ingresado a minúsculas y eliminamos espacios en blanco externos.
    const textoBusqueda = busqueda ? busqueda.toLowerCase().trim() : "";
    const cumpleBusqueda = textoBusqueda
      ? tarea.titulo.toLowerCase().includes(textoBusqueda) ||
        (tarea.descripcion && tarea.descripcion.toLowerCase().includes(textoBusqueda))
      : true;

    // Solo incluimos la tarea si satisface simultáneamente los 3 filtros evaluados
    return cumpleEstado && cumplePrioridad && cumpleBusqueda;
  });
}