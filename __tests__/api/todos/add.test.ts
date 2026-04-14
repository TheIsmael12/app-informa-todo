import { NextRequest } from "next/server";
import { Status } from "@/enums/status";

/* ── Mocks ─────────────────────────────────────────── */
jest.mock("@/lib/getApiMessages", () => ({
  getApiTodosMessages: () => ({
    missingFields: "Missing required fields",
    todoCreated: "Todo created",
    duplicateTitle: (title: string) => `Duplicate title: ${title}`,
    fetchOk: "OK",
    todoNotFound: (id: string) => `Not found: ${id}`,
    todoDeleted: "Deleted",
    todoUpdated: "Updated",
  }),
}));

jest.mock("@/lib/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const mockTodos = [
  { id: 1, title: "Existing Todo", description: "Desc", status: Status.PENDING },
];

jest.mock("@/app/api/todos/store", () => ({
  getTodos: () => mockTodos,
  getNextId: () => 99,
}));

/* ── Tests ─────────────────────────────────────────── */
function buildRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/todos/add", () => {
  let POST: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    const mod = await import("@/app/api/todos/add/route");
    POST = mod.POST;
  });

  it("devuelve 400 cuando falta el título", async () => {
    const res = await POST(buildRequest({ status: Status.PENDING }));
    expect(res.status).toBe(400);
  });

  it("devuelve 400 cuando falta el estado", async () => {
    const res = await POST(buildRequest({ title: "Nuevo Todo" }));
    expect(res.status).toBe(400);
  });

  it("devuelve 409 si el título ya existe", async () => {
    const res = await POST(
      buildRequest({ title: "Existing Todo", status: Status.PENDING })
    );
    expect(res.status).toBe(409);
  });

  it("crea un todo sin descripción y devuelve 201", async () => {
    const res = await POST(
      buildRequest({ title: "Brand New Todo", status: Status.PENDING })
    );
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.result).toMatchObject({ id: 99, title: "Brand New Todo" });
  });

  it("crea un todo con descripción y devuelve 201", async () => {
    const res = await POST(
      buildRequest({
        title: "Another New Todo",
        description: "Una descripción",
        status: Status.COMPLETED,
      })
    );
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.result.description).toBe("Una descripción");
  });
});
