"use server";

import { revalidatePath } from "next/cache";

import { fetchAddTodo, fetchDeleteTodo, fetchEditTodo } from "@/actions/todos/todos";

import { AddTodo, EditTodo, Todo } from "@/types/todo";

/**
 * Agrega un nuevo todo
 * @param data - Datos del nuevo todo a crear
 * @returns Respuesta del servidor con el todo creado
 */
export const addTodo = async (data: AddTodo) => {
  const response = await fetchAddTodo(data);
  revalidatePath("/");
  return response;
};

/**
 * Edita un todo existente en la intranet
 * @param todoId - ID del todo a editar
 * @param data - Datos del todo a editar
 * @returns
 */
export const editTodo = async (todoId: Todo["id"], data: EditTodo) => {
  const response = await fetchEditTodo({ ...data, id: todoId });
  revalidatePath("/");
  return response;
};

/**
 * Elimina un todo existente en la intranet
 * @param todoId - ID del todo a eliminar
 * @returns
 */

export const deleteTodo = async (todoId: Todo["id"]) => {
  const response = await fetchDeleteTodo(todoId);
  revalidatePath("/");
  return response;
};
