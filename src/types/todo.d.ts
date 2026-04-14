import { Status } from "@/enums/status";
import { PaginatedDataResponse } from "@/types/fetchResponse";

/**
 * Entidad Todo completa tal como la devuelve la API.
 * @property id - Identificador único del todo
 * @property title - Título del todo
 * @property description - Descripción detallada del todo
 * @property status - Estado actual del todo
 */
export interface Todo {
    id: number;
    title: string;
    description?: string;
    status: Status;
}

/**
 * Datos necesarios para crear un nuevo todo.
 * @property title - Título del todo
 * @property description - Descripción detallada del todo
 * @property status - Estado inicial del todo
 */
export interface AddTodo {
    title: string;
    description?: string;
    status: Status;
}

/**
 * Datos necesarios para editar un todo existente. Extiende AddTodo.
 * @property id - Identificador del todo a editar
 */
export interface EditTodo extends AddTodo {
    id: number;
}

/**
 * Alias estándar para la respuesta paginada de todos.
 */
export type TodoPaginatedResponse = PaginatedDataResponse<Todo>;
