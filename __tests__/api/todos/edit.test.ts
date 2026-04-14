import { NextRequest } from "next/server";
import { Status } from "@/enums/status";

jest.mock("@/lib/getApiMessages", () => ({
  getApiTodosMessages: () => ({
    missingFields: "Missing required fields",
    todoCreated: "Created",
    duplicateTitle: (title: string) => `Duplicate: ${title}`,
    fetchOk: "OK",
    todoNotFound: (id: string) => `Not found: ${id}`,
    todoDeleted: "Deleted",
    todoUpdated: "Updated",
  }),
}));

jest.mock("@/lib/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const mockStore = [
  { id: 1, title: "Todo A", status: Status.PENDING },
  { id: 2, title: "Todo B", status: Status.COMPLETED },
];

jest.mock("@/app/api/todos/store", () => ({
  getTodos: () => mockStore,
}));

function buildRequest(id: string, body: Record<string, unknown>) {
  return new NextRequest(`http://localhost/api/todos/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("PUT /api/todos/edit/[id]", () => {
  let PUT: (
    req: NextRequest,
    ctx: { params: Promise<{ id: string }> }
  ) => Promise<Response>;

  beforeAll(async () => {
    const mod = await import("@/app/api/todos/edit/[id]/route");
    PUT = mod.PUT;
  });

  it("devuelve 404 si el todo no existe", async () => {
    const res = await PUT(buildRequest("999", { status: Status.COMPLETED }), {
      params: Promise.resolve({ id: "999" }),
    });
    expect(res.status).toBe(404);
  });

  it("actualiza el estado de un todo y devuelve 200", async () => {
    const res = await PUT(
      buildRequest("1", { title: "Todo A", status: Status.COMPLETED }),
      { params: Promise.resolve({ id: "1" }) }
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result.status).toBe(Status.COMPLETED);
    expect(body.result.id).toBe(1);
  });

  it("devuelve 409 si el nuevo título ya existe en otro todo", async () => {
    const res = await PUT(
      buildRequest("1", { title: "Todo B", status: Status.PENDING }),
      { params: Promise.resolve({ id: "1" }) }
    );
    expect(res.status).toBe(409);
  });

  it("permite actualizar descripción sin cambiar el título", async () => {
    const res = await PUT(
      buildRequest("2", { description: "Nueva descripción" }),
      { params: Promise.resolve({ id: "2" }) }
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result.description).toBe("Nueva descripción");
  });
});
