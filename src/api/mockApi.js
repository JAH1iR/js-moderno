/**
 * src/api/mockApi.js
 * 
 * CAPA DE SIMULACIÓN DE SERVIDOR (Mock API & Asincronía - Módulo 5)
 * 
 * Propósito:
 * Simular un backend o API REST remota que tarda tiempo en responder mediante
 * el uso de Promesas nativas de JavaScript (`Promise`) y temporizadores (`setTimeout`).
 * 
 * Conceptos Clave:
 * 1. ¿Por qué simular asincronía?
 *    En el mundo real, las peticiones HTTP (`fetch`, `axios`) viajan por la red y demoran
 *    desde decenas de milisegundos hasta segundos. JavaScript maneja esto de forma
 *    no bloqueante a través de su Event Loop (Bucle de Eventos).
 * 2. Promesas (Promise):
 *    Un objeto que representa la terminación o el fracaso eventual de una operación asíncrona.
 *    Estados: Pending (pendiente) -> Fulfilled (resuelta) / Rejected (rechazada).
 */

import { tareasIniciales } from "../data/tareas.js";

// Tiempo de demora simulado del servidor (1000ms = 1 segundo de latencia de red)
const RETARDO_SERVIDOR_MS = 1000;

/**
 * Simula una petición HTTP GET a un servidor remoto para obtener las tareas.
 * 
 * @returns {Promise<Array<Object>>} Promesa que se resuelve con la copia de tareas tras 1 segundo.
 */
export function obtenerTareasServidor() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula que el servidor respondió exitosamente con los datos (HTTP 200 OK)
      // Se utiliza el operador spread para no compartir la referencia directa del archivo de datos
      resolve([...tareasIniciales]);
    }, RETARDO_SERVIDOR_MS);
  });
}

/**
 * Simula una petición HTTP POST para guardar una nueva tarea en la base de datos remota.
 * 
 * @param {Object} nuevaTarea - Tarea a persistir en el servidor.
 * @returns {Promise<Object>} Promesa que resuelve la tarea confirmada por el servidor.
 */
export function guardarTareaServidor(nuevaTarea) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula una respuesta del backend agregando metadatos de confirmación
      resolve({ ...nuevaTarea, guardadoEnServidor: true });
    }, RETARDO_SERVIDOR_MS);
  });
}