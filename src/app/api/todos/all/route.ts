import { NextRequest, NextResponse } from "next/server";
import { getTodos } from "../store";
import { getApiTodosMessages } from "@/lib/getApiMessages";
import { logger } from "@/lib/logger";

export function GET(request: NextRequest) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value ?? "es";
  const t = getApiTodosMessages(locale);
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.max(1, Number(searchParams.get("limit") ?? 10));
  const search = searchParams.get("search")?.toLowerCase() ?? "";

  const todos = getTodos();

  const filtered = search
    ? todos.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          (t.description?.toLowerCase() ?? "").includes(search),
      )
    : todos;

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const list = filtered.slice((page - 1) * limit, page * limit);

  logger.info("GET /api/todos/all", { page, limit, search, total });

  return NextResponse.json({
    result: { list, page, limit, total, totalPages },
    message: t.fetchOk,
  });
}
