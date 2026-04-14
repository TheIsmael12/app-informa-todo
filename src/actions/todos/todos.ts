import { fetchData } from "@/actions/fetch";
import { FetchResponse } from "@/types/fetchResponse";

import { AddTodo, EditTodo, Todo } from "@/types/todo";
import { PaginatedDataResponse } from "@/types/fetchResponse";

const processSearchParams = (params: SearchParams): string => {
  const q = new URLSearchParams();
  if (params.page !== undefined) q.set("page", String(params.page));
  if (params.limit !== undefined) q.set("limit", String(params.limit));
  if (params.search !== undefined && params.search !== null) {
    const search = Array.isArray(params.search) ? params.search[0] : String(params.search);
    if (search) q.set("search", search);
  }
  return q.toString();
};


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