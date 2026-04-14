import { Todo } from "@/types/todo";
import { Status } from "@/enums/status";

declare global {
  // eslint-disable-next-line no-var
  var __todos: Todo[] | undefined;
  // eslint-disable-next-line no-var
  var __nextTodoId: number | undefined;
}

if (!globalThis.__todos) {
  globalThis.__todos = [
    {
      id: 1,
      title: "URGENTE: Contratar a Ismael",
      description: "Se ha revisado el portfolio — es exactamente lo que buscábamos. No dejar que se lo lleve la competencia.",
      status: Status.PENDING,
    },
    {
      id: 2,
      title: "Prepararle una oferta irrechazable a Ismael",
      description: "Sueldo, teletrabajo, café gratis y el título de 'Arquitecto Supremo Full-Stack'.",
      status: Status.PENDING,
    },
    {
      id: 3,
      title: "Reservar mesa para celebrar que Ismael ha aceptado",
      description: "Restaurante con estrella Michelin. Lo merece.",
      status: Status.PENDING,
    },
    {
      id: 4,
      title: "Mandarle un ramo de flores a Ismael por pasarse la prueba",
      description: "Con nota: 'Gracias por hacer que nuestro código vuelva a tener sentido'.",
      status: Status.PENDING,
    },
    {
      id: 5,
      title: "Poner el nombre de Ismael en los créditos del proyecto",
      description: "En la pantalla de inicio, en el README y en el nombre de la empresa si hace falta.",
      status: Status.PENDING,
    },
    {
      id: 6,
      title: "Aprobar la prueba técnica con nota",
      description: "CRUD completo, TypeScript estricto, tests, Swagger, i18n, logs... Checklist: ✅✅✅✅✅",
      status: Status.COMPLETED,
    },
  ];
  globalThis.__nextTodoId = 7;
}

export const getTodos = (): Todo[] => globalThis.__todos!;

export const getNextId = (): number => globalThis.__nextTodoId!++;
