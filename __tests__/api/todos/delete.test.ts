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

function buildRequest(id: string) {
  return new NextRequest(`http://localhost/api/todos/delete/${id}`, {
    method: "DELETE",
  });
}

describe("DELETE /api/todos/delete/[id]", () => {
  let DELETE: (
    req: NextRequest,
    ctx: { params: Promise<{ id: string }> }
  ) => Promise<Response>;

  beforeAll(async () => {
    const mod = await import("@/app/api/todos/delete/[id]/route");
    DELETE = mod.DELETE;
  });

  it("devuelve 404 si el todo no existe", async () => {
    const res = await DELETE(buildRequest("999"), {
      params: Promise.resolve({ id: "999" }),
    });
    expect(res.status).toBe(404);
  });

  it("elimina un todo existente y devuelve 200", async () => {
    const initialLength = mockStore.length;
    const res = await DELETE(buildRequest("1"), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result).toBeNull();
    expect(mockStore.length).toBe(initialLength - 1);
  });
});
