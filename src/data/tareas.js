/**
 * src/data/tareas.js
 * 
 * MODELO DE DATOS INICIAL (Mock Data / Seed Data)
 * 
 * Propósito:
 * Proporcionar un conjunto inicial de tareas para inicializar la aplicación
 * sin necesidad de una base de datos externa o backend en esta etapa del curso.
 * 
 * Estructura de una Tarea:
 * - id          {string} : Identificador único de la tarea (UUID o incremental).
 * - proyectoId  {string} : ID del proyecto o categoría al que pertenece.
 * - titulo      {string} : Nombre o descripción corta de la tarea.
 * - descripcion {string} : Detalle ampliado de la tarea.
 * - estado      {string} : 'pendiente' | 'en_progreso' | 'hecha'.
 * - prioridad   {string} : 'baja' | 'media' | 'alta'.
 * - creadoEn    {string} : Marca de tiempo en formato ISO 8601 (UTC).
 */

export const tareasIniciales = [
  {
    id: "1",
    proyectoId: "p1",
    titulo: "Configurar proyecto",
    descripcion: "Crear la estructura inicial y revisar la base del curso.",
    estado: "pendiente",
    prioridad: "alta",
    creadoEn: "2026-09-22T09:00:00.000Z",
  },
  {
    id: "2",
    proyectoId: "p1",
    titulo: "Repasar inmutabilidad",
    descripcion: "Practicar map, filter y spread para no mutar el arreglo original.",
    estado: "en_progreso",
    prioridad: "media",
    creadoEn: "2026-09-22T10:00:00.000Z",
  },
  {
    id: "3",
    proyectoId: "p1",
    titulo: "Curso de Angular",
    descripcion: "Introducción a Angular y conceptos fundamentales.",
    estado: "en_progreso",
    prioridad: "media",
    creadoEn: "2026-09-22T10:00:00.000Z",
  },
];
