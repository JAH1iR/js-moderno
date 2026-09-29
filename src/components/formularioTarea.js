/**
 * src/components/formularioTarea.js
 * 
 * COMPONENTE DE INTERFAZ: FORMULARIO DE NUEVA TAREA
 * 
 * Principio de Responsabilidad Única (SRP):
 * Este módulo se enfoca exclusivamente en la interacción con el formulario:
 * 1. Escucha el evento de envío ('submit').
 * 2. Previene la recarga automática del navegador ('e.preventDefault()').
 * 3. Valida y extrae los datos ingresados por el usuario.
 * 4. Delega la acción mediante un callback ('alAgregar'), sin acoplarse directamente al Store.
 */

/**
 * Vincula el escuchador de eventos al formulario de tareas y ejecuta un callback al enviar.
 * 
 * @param {HTMLFormElement} formularioEl - Elemento <form> del DOM.
 * @param {Function} alAgregar - Función callback que recibe el payload { titulo, prioridad }.
 */
export function listenerFormularioTarea(formularioEl, alAgregar) {
  formularioEl.addEventListener("submit", (e) => {
    // 1. Prevenir la acción predeterminada del navegador (recarga sincrónica de página).
    // Fundamental en SPAs (Single Page Applications) y librerías modernas como React.
    e.preventDefault();

    // 2. Extracción de referencias a los campos del formulario
    const inputTitulo = formularioEl.querySelector("#input-titulo");
    const selectPrioridad = formularioEl.querySelector("#select-prioridad");

    // Limpieza de espacios en blanco al inicio y final
    const titulo = inputTitulo.value.trim();
    const prioridad = selectPrioridad.value;

    // Validación básica: evitar ingresar tareas vacías
    if (!titulo) return;

    // 3. Inversión de Control / Desacoplamiento:
    // El formulario no sabe cómo se guarda la tarea ni qué store existe;
    // simplemente entrega los datos a quien lo invocó mediante el callback.
    alAgregar({ titulo, prioridad });

    // 4. Experiencia de Usuario (UX):
    // Limpia los campos del formulario y devuelve el cursor al input principal.
    formularioEl.reset();
    inputTitulo.focus();
  });
}