/**
 * src/modules/eliminarTarea.js
 * 
 * LÓGICA DE NEGOCIO: ELIMINAR TAREA (Inmutabilidad con Array.prototype.filter)
 * 
 * ¿Por qué usar .filter() en lugar de .splice()?
 * - `Array.prototype.splice()` muta (modifica directamente) el arreglo en su posición de memoria original.
 * - `Array.prototype.filter()` crea y devuelve un NUEVO arreglo con todos los elementos que cumplan
 *   la condición lógica, dejando el arreglo original completamente intacto.
 * En la arquitectura de estado inmutable (y en React), `.filter()` es el estándar para borrado.
 */

/**
 * Elimina una tarea identificada por su ID sin alterar el arreglo original.
 * 
 * @param {Array<Object>} listaTareas - Arreglo actual de tareas.
 * @param {string} id - Identificador único de la tarea que se desea remover.
 * @returns {Array<Object>} Un nuevo arreglo que excluye la tarea cuyo ID coincida con el argumento.
 */
export function eliminarTarea(listaTareas, id) {
  // Conservamos únicamente las tareas cuyo id sea DISTINTO al que queremos eliminar.
  return listaTareas.filter((tarea) => tarea.id !== id);
}