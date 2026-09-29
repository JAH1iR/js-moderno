/**
 * src/modules/agregarTarea.js
 * 
 * LÓGICA DE NEGOCIO: AGREGAR TAREA (Función Pura e Inmutable)
 * 
 * ¿Por qué una función pura?
 * Una función pura es aquella que, dados los mismos argumentos, siempre retorna el mismo
 * resultado sin producir efectos secundarios (side-effects) ni alterar los parámetros recibidos.
 * 
 * Principio clave en JavaScript Moderno y React:
 * ¡NUNCA mutar arreglos u objetos existentes!
 * En lugar de usar `listaTareas.push(...)` (que modificaría el arreglo original en memoria),
 * creamos un nuevo arreglo utilizando el operador spread `[...listaTareas, nuevaTarea]`.
 * Esto permite que herramientas y frameworks modernos detecten cambios por comparación
 * de referencias (`prevArray !== nextArray`).
 */

/**
 * Agrega una nueva tarea a la lista de tareas de forma inmutable.
 * 
 * @param {Array<Object>} listaTareas - Arreglo actual de tareas (no se modifica).
 * @param {Object} nuevaTareaDatos - Objeto con los datos ingresados por el usuario { titulo, prioridad, ... }.
 * @returns {Array<Object>} Un nuevo arreglo que contiene todas las tareas previas más la nueva.
 */
export function agregarTarea(listaTareas, nuevaTareaDatos) {
  // 1. Construcción del nuevo objeto de tarea con valores por defecto y metadatos calculados.
  const nuevaTarea = {
    // crypto.randomUUID() es un método estándar y nativo de JavaScript moderno (Web Cryptography API).
    // Genera identificadores universales seguros (UUID v4) tipo "36b8f84d-df4e-4d49-a663-ab6636f1e526"
    // sin requerir librerías externas como 'uuid'.
    id: crypto.randomUUID(),
    proyectoId: nuevaTareaDatos.proyectoId || "p1",
    titulo: nuevaTareaDatos.titulo,
    descripcion: nuevaTareaDatos.descripcion || "",
    estado: nuevaTareaDatos.estado || "pendiente",   // Estados válidos: 'pendiente' | 'en_progreso' | 'hecha'
    prioridad: nuevaTareaDatos.prioridad || "media",  // Prioridades: 'baja' | 'media' | 'alta'
    creadoEn: new Date().toISOString()               // Fecha en formato estándar ISO 8601 (UTC)
  };

  // 2. RETORNO INMUTABLE (Operador Spread):
  // Desempaquetamos todos los elementos de 'listaTareas' dentro de un nuevo arreglo []
  // y colocamos 'nuevaTarea' al final.
  // Resultado: El arreglo original queda intacto y se devuelve una nueva referencia.
  return [...listaTareas, nuevaTarea];
}
