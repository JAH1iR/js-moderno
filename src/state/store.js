/**
 * src/state/store.js
 * 
 * ARQUITECTURA DE ESTADO CENTRALIZADO (Patrón Observador / Pub-Sub)
 * Con integración de Persistencia Automática (Módulo 4 y 5)
 * 
 * Responsabilidad:
 * 1. Ser la "Única Fuente de Verdad" (Single Source of Truth) para toda la aplicación.
 * 2. Mantener el estado encapsulado para evitar modificaciones directas accidentales.
 * 3. Notificar automáticamente a la interfaz (render) ante cada actualización.
 * 4. Coordinar la persistencia automática de las tareas en el almacenamiento local.
 */

import { guardarTareas } from "../services/tareasService.js";

// =============================================================================
// 1. ESTADO PRIVADO (Encapsulado a nivel de módulo)
// =============================================================================
// Inicializamos 'tareas' como un arreglo vacío [] mientras la capa asíncrona
// (servicios / mockApi / storage) carga los datos reales en el arranque (main.js).
let estado = {
  tareas: [],
  filtros: { estado: "todos", busqueda: "" }
};

// Colección de observadores (callbacks de renderizado)
let suscriptores = [];

// =============================================================================
// 2. MÉTODOS PÚBLICOS DEL STORE
// =============================================================================

/**
 * Retorna una copia superficial (shallow copy) del estado actual.
 * Proporciona acceso de solo lectura garantizando inmutabilidad externa.
 * 
 * @returns {Object} Copia del objeto de estado global.
 */
export function getState() {
  return { ...estado };
}

/**
 * Actualiza el estado global de forma inmutable, persiste los cambios y notifica a los suscriptores.
 * 
 * Admite dos formas de actualización (idéntico al hook useState / useReducer de React):
 * 1. Mediante función actualizadora: `setState(prev => ({ ...prev, nuevoDato }))`
 * 2. Mediante objeto parcial: `setState({ tareas: nuevasTareas })`
 * 
 * @param {Function|Object} nuevoEstadoParcial - Objeto parcial o función que calcula el siguiente estado.
 */
export function setState(nuevoEstadoParcial) {
  // A. Si se recibe una función, se ejecuta entregándole el estado actual (Functional Update)
  if (typeof nuevoEstadoParcial === "function") {
    estado = nuevoEstadoParcial(estado);
  } else {
    // B. Si se recibe un objeto parcial, se combina inmutablemente usando el spread operator
    estado = { ...estado, ...nuevoEstadoParcial };
  }

  // 💾 PERSISTENCIA AUTOMÁTICA (Módulo 4):
  // Cada vez que el estado cambia, sincronizamos el arreglo de tareas en localStorage
  if (Array.isArray(estado.tareas)) {
    guardarTareas(estado.tareas);
  }

  // 🔔 NOTIFICACIÓN A SUSCRIPTORES (Patrón Observer):
  // Ejecuta cada listener registrado (ej. función render) para sincronizar la vista automáticamente.
  suscriptores.forEach((listener) => listener(estado));
}

/**
 * Registra una función listener para ser invocada automáticamente cada vez que cambie el estado.
 * 
 * @param {Function} listener - Callback a ejecutar tras una actualización.
 * @returns {Function} Función de limpieza ("unsubscribe") para desvincular el listener si fuese necesario.
 */
export function subscribe(listener) {
  suscriptores.push(listener);
  
  // Retorna función de desuscripción para prevenir fugas de memoria (Memory Leaks)
  return () => {
    suscriptores = suscriptores.filter((s) => s !== listener);
  };
}