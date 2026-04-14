import { NextRequest, NextResponse } from "next/server";
import { getTodos } from "../../store";
import { getApiTodosMessages } from "@/lib/getApiMessages";
import { logger } from "@/lib/logger";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value ?? "es";
  const t = getApiTodosMessages(locale);
  const { id } = await params;

  const todos = getTodos();
  const index = todos.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    logger.warn(`DELETE /api/todos/delete/${id} — no encontrado`);
    return NextResponse.json(
      { message: t.todoNotFound(id) },
      { status: 404 },
    );
  }

  todos.splice(index, 1);
  logger.info(`DELETE /api/todos/delete/${id} — eliminado`);

  return NextResponse.json({
    result: null,
    message: t.todoDeleted,
  });
}
