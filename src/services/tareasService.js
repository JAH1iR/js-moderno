/**
 * src/services/tareasService.js
 * 
 * CAPA DE SERVICIO / REPOSITORIO (Service Layer & Estrategia Cache-First - Módulo 5)
 * 
 * Responsabilidad:
 * Actuar como intermediario entre la lógica de estado (Store) y los diferentes
 * orígenes de datos (Almacenamiento local vs. Servidor remoto).
 * 
 * Patrón Cache-First (Offline-First):
 * 1. Primero consulta el almacenamiento local (`localStorage`) para carga instantánea.
 * 2. Si no encuentra tareas guardadas, realiza una llamada asíncrona al backend (`mockApi`).
 * 3. Al recibir los datos del servidor, los almacena en `localStorage` para futuras cargas.
 * 4. Desacopla al Store de los detalles técnicos de cómo y de dónde se obtienen los datos.
 */

import { obtenerTareasStorage, guardarTareasStorage } from "../api/storage.js";
import { obtenerTareasServidor } from "../api/mockApi.js";

/**
 * Orquesta la carga inicial de tareas utilizando async/await.
 * 
 * @async
 * @returns {Promise<Array<Object>>} Lista final de tareas resuelta desde caché local o servidor.
 */
export async function cargarTareasIniciales() {
  // Paso 1: Intentar leer desde el almacenamiento local persistente
  const tareasGuardadas = obtenerTareasStorage();

  // Si existen tareas previas en storage, las devolvemos directamente sin peticiones de red innecesarias
  if (tareasGuardadas && tareasGuardadas.length > 0) {
    return tareasGuardadas;
  }

  // Paso 2: Si es la primera visita o el storage está vacío, consultamos al servidor
  // 'await' pausa la ejecución de esta función hasta que la promesa de obtenerTareasServidor() se resuelva
  const tareasServidor = await obtenerTareasServidor();
  
  // Paso 3: Guardamos la respuesta del servidor en el almacenamiento local para la próxima vez
  guardarTareasStorage(tareasServidor);

  return tareasServidor;
}

/**
 * Persiste la colección de tareas en el medio de almacenamiento correspondiente.
 * 
 * @param {Array<Object>} tareas - Colección de tareas a guardar.
 */
export function guardarTareas(tareas) {
  guardarTareasStorage(tareas);
}