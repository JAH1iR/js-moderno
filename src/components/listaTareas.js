/**
 * src/components/listaTareas.js
 * 
 * COMPONENTE DE INTERFAZ: RENDERIZADOR DE LISTA DE TAREAS
 * 
 * Paradigma Declarativo (Precursor al Virtual DOM de React):
 * En lugar de buscar y modificar elementos individuales en el HTML manualmente
 * ("imperativo"), este componente recibe una lista de datos (`tareas`) y proyecta
 * completamente la interfaz visual correspondiente ("declarativo").
 */

/**
 * Renderiza la colección de tareas dentro del elemento contenedor del DOM.
 * 
 * @param {Array<Object>} tareas - Colección de tareas a renderizar.
 * @param {HTMLElement} contenedor - Elemento <ul> o contenedor donde se inyectará el HTML.
 */
export function renderizarListaTareas(tareas, contenedor) {
  // 1. Limpieza del contenedor para evitar duplicados al re-renderizar
  contenedor.innerHTML = "";

  // 2. Manejo de Estado Vacío (Empty State):
  // Brinda retroalimentación visual al usuario cuando no hay tareas que coincidan con los filtros.
  if (tareas.length === 0) {
    contenedor.innerHTML = `<li class="tarea-item">No hay tareas para mostrar.</li>`;
    return;
  }

  // 3. Generación dinámica de nodos en el DOM
  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    
    // Asignación de clases dinámicas según el estado de la tarea
    li.className = `tarea-item ${tarea.estado === "hecha" ? "completada" : ""}`;
    
    // Atributo data-* (dataset.id):
    // Permite asociar el identificador de los datos directamente al nodo HTML,
    // facilitando la técnica de Delegación de Eventos en el contenedor padre.
    li.dataset.id = tarea.id;

    // Inyección de estructura interna mediante Template Literals (ES6)
    li.innerHTML = `
      <div>
        <span><strong>${tarea.titulo}</strong></span>
        <span class="badge ${tarea.prioridad}">${tarea.prioridad}</span>
      </div>
      <div>
        <button class="btn-completar" data-id="${tarea.id}">
          ${tarea.estado === "hecha" ? "Deshacer" : "Completar"}
        </button>
        <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
      </div>
    `;

    // 4. Inserción del elemento en el árbol del DOM
    contenedor.appendChild(li);
  });
}