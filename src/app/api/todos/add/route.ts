import { NextRequest, NextResponse } from "next/server";
import { getTodos, getNextId } from "../store";
import { AddTodo } from "@/types/todo";
import { getApiTodosMessages } from "@/lib/getApiMessages";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value ?? "es";
  const t = getApiTodosMessages(locale);
  const body: Partial<AddTodo> = await request.json();

  if (!body.title || !body.status) {
    logger.warn("POST /api/todos/add — campos obligatorios ausentes", { title: body.title, status: body.status });
    return NextResponse.json(
      { message: t.missingFields },
      { status: 400 },
    );
  }

  const todos = getTodos();
  const isDuplicate = todos.some(
    (todo) => todo.title.toLowerCase() === body.title!.toLowerCase(),
  );

  if (isDuplicate) {
    logger.warn("POST /api/todos/add — título duplicado", { title: body.title });
    return NextResponse.json(
      { message: t.duplicateTitle(body.title!) },
      { status: 409 },
    );
  }

  const newTodo = {
    id: getNextId(),
    title: body.title,
    description: body.description,
    status: body.status,
  };

  todos.push(newTodo);
  logger.info("POST /api/todos/add — todo creado", { id: newTodo.id, title: newTodo.title });

  return NextResponse.json(
    { result: newTodo, message: t.todoCreated },
    { status: 201 },
  );
}
