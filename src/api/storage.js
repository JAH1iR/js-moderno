/**
 * src/api/storage.js
 * 
 * CAPA DE ACCESO A DATOS: PERSISTENCIA LOCAL (Web Storage API - Módulo 4)
 * 
 * Propósito:
 * Gestionar la lectura y escritura de tareas en el `localStorage` del navegador.
 * 
 * Conceptos Clave:
 * 1. ¿Qué es localStorage?
 *    Es una API nativa del navegador que permite almacenar pares clave-valor de forma
 *    persistente (los datos NO se pierden al recargar o cerrar la pestaña).
 * 2. Serialización y Deserialización:
 *    `localStorage` solo admite cadenas de texto (strings). Por tanto:
 *    - Para guardar: `JSON.stringify(objeto)` convierte estructuras de JS a texto JSON.
 *    - Para leer: `JSON.parse(texto)` reconstruye el objeto/arreglo original de JS.
 * 3. Manejo de Errores con try...catch:
 *    Operaciones con almacenamiento pueden fallar por cuotas de espacio excedidas
 *    o configuraciones de navegación privada restrictivas.
 */

// Clave única con versionado para evitar colisiones con otras apps en el mismo dominio
const CLAVE_STORAGE = "task_manager_tareas_v1";

/**
 * Lee y deserializa la lista de tareas guardadas en localStorage.
 * 
 * @returns {Array<Object>|null} Arreglo de tareas recuperado o `null` si no existe o hay error.
 */
export function obtenerTareasStorage() {
  try {
    const datos = localStorage.getItem(CLAVE_STORAGE);
    // Si existen datos, los convertimos de texto JSON a objeto/arreglo JS; si no, retornamos null
    return datos ? JSON.parse(datos) : null;
  } catch (error) {
    console.error("Error al leer de localStorage:", error);
    return null;
  }
}

/**
 * Serializa y guarda la lista de tareas en localStorage.
 * 
 * @param {Array<Object>} tareas - Arreglo de tareas a persistir.
 */
export function guardarTareasStorage(tareas) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
}