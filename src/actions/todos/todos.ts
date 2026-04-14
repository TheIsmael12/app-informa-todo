import { fetchData } from "@/actions/fetch";

import { processSearchParams } from "@/lib/processSerchParams";

import { FetchResponse } from "@/types/fetchResponse";
import { AddTodo, EditTodo, Todo } from "@/types/todo";
import { PaginatedDataResponse } from "@/types/fetchResponse";

/**
 * Listado de todos los todos
 * @param searchParams
 * @returns
 */
export const fetchAllTodos = async (
  searchParams: SearchParams,
): Promise<FetchResponse<PaginatedDataResponse<Todo>>> => {
  const queryString = processSearchParams(searchParams);
  return await fetchData(`todos/all?${queryString}`, "GET");
};

/**
 * Añadir un nuevo todo
 * @param data
 * @returns
 */

export const fetchAddTodo = async (
    data: AddTodo
): Promise<FetchResponse<Todo>> => {
  return await fetchData("todos/add", "POST", data);
};

/**
 * Editar un todo existente
 * @param data
 * @returns
 */
export const fetchEditTodo = async (
    data: EditTodo
): Promise<FetchResponse<Todo>> => {
  return await fetchData(`todos/edit/${data.id}`, "PUT", data);
};

/**
 * Eliminar un todo existente
 * @param todoId
 * @returns
 */

export const fetchDeleteTodo = async (
    todoId: Todo["id"]
): Promise<FetchResponse<null>> => {
  return await fetchData(`todos/delete/${todoId}`, "DELETE");
}