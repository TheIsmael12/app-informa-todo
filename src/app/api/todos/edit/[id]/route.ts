import { NextRequest, NextResponse } from "next/server";
import { getTodos } from "../../store";
import { AddTodo } from "@/types/todo";
import { getApiTodosMessages } from "@/lib/getApiMessages";
import { logger } from "@/lib/logger";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value ?? "es";
  const t = getApiTodosMessages(locale);
  const { id } = await params;
  const body: Partial<AddTodo> = await request.json();

  const todos = getTodos();
  const index = todos.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    logger.warn(`PUT /api/todos/edit/${id} — no encontrado`);
    return NextResponse.json(
      { message: t.todoNotFound(id) },
      { status: 404 },
    );
  }

  if (body.title) {
    const isDuplicate = todos.some(
      (todo) =>
        todo.id !== Number(id) &&
        todo.title.toLowerCase() === body.title!.toLowerCase(),
    );

    if (isDuplicate) {
      logger.warn(`PUT /api/todos/edit/${id} — título duplicado`, { title: body.title });
      return NextResponse.json(
        { message: t.duplicateTitle(body.title) },
        { status: 409 },
      );
    }
  }

  todos[index] = { ...todos[index], ...body, id: todos[index].id };
  logger.info(`PUT /api/todos/edit/${id} — actualizado`, { title: todos[index].title });

  return NextResponse.json({
    result: todos[index],
    message: t.todoUpdated,
  });
}
