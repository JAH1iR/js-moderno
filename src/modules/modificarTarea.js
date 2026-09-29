/**
 * src/modules/modificarTarea.js
 * 
 * LÓGICA DE NEGOCIO: MODIFICAR TAREA (Inmutabilidad con Array.prototype.map y Object Spread)
 * 
 * ¿Por qué usar .map() y el spread operator {...}?
 * - Si hiciéramos `tarea.estado = "hecha"`, estaríamos mutando directamente el objeto en memoria.
 *   Esto provocaría que sistemas reactivos (o nuestro store) no detecten qué cambió o generen
 *   comportamientos inconsistentes (bugs difíciles de rastrear).
 * - Con `.map()` recorremos la lista y creamos un NUEVO arreglo.
 * - Con `{ ...tarea, ...cambios }` creamos un NUEVO objeto para la tarea editada, sobrescribiendo
 *   únicamente las propiedades recibidas en `cambios` y preservando las demás intactas.
 * - Los elementos no afectados se devuelven tal cual (structural sharing o compartición estructural).
 */

/**
 * Modifica los datos de una tarea específica sin mutar el arreglo ni el objeto original.
 * 
 * @param {Array<Object>} listaTareas - Arreglo actual de tareas.
 * @param {string} id - Identificador de la tarea a actualizar.
 * @param {Object} cambios - Objeto con las propiedades a sobrescribir (ej: { estado: "hecha" }).
 * @returns {Array<Object>} Un nuevo arreglo con la tarea actualizada en su posición correspondiente.
 */
export function modificarTarea(listaTareas, id, cambios) {
  return listaTareas.map((tarea) => {
    // Si encontramos la tarea objetivo por su ID:
    if (tarea.id === id) {
      // Retornamos una COPIA con los cambios aplicados
      return { ...tarea, ...cambios };
    }
    // Si no coincide, retornamos el elemento sin modificar
    return tarea;
  });
}