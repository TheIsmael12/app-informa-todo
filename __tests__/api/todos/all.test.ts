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
  { id: 1, title: "Todo A", description: "Desc A", status: Status.PENDING },
  { id: 2, title: "Todo B", description: "Desc B", status: Status.COMPLETED },
  { id: 3, title: "Todo C", status: Status.PENDING },
];

jest.mock("@/app/api/todos/store", () => ({
  getTodos: () => mockStore,
}));

function buildRequest(searchParams: Record<string, string> = {}) {
  const url = new URL("http://localhost/api/todos/all");
  Object.entries(searchParams).forEach(([k, v]) => url.searchParams.set(k, v));
  return new NextRequest(url);
}

describe("GET /api/todos/all", () => {
  let GET: (req: NextRequest) => Response;

  beforeAll(async () => {
    const mod = await import("@/app/api/todos/all/route");
    GET = mod.GET;
  });

  it("devuelve 200 con la lista de todos", async () => {
    const res = await GET(buildRequest());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result.list).toHaveLength(3);
    expect(body.result.total).toBe(3);
  });

  it("aplica paginación correctamente", async () => {
    const res = await GET(buildRequest({ page: "1", limit: "2" }));
    const body = await res.json();
    expect(body.result.list).toHaveLength(2);
    expect(body.result.totalPages).toBe(2);
  });

  it("filtra por búsqueda en título", async () => {
    const res = await GET(buildRequest({ search: "todo a" }));
    const body = await res.json();
    expect(body.result.list).toHaveLength(1);
    expect(body.result.list[0].title).toBe("Todo A");
  });

  it("filtra por búsqueda en descripción", async () => {
    const res = await GET(buildRequest({ search: "desc b" }));
    const body = await res.json();
    expect(body.result.list).toHaveLength(1);
    expect(body.result.list[0].title).toBe("Todo B");
  });

  it("no falla con todo sin descripción al filtrar", async () => {
    const res = await GET(buildRequest({ search: "todo c" }));
    const body = await res.json();
    expect(body.result.list).toHaveLength(1);
  });

  it("devuelve lista vacía si no hay coincidencias", async () => {
    const res = await GET(buildRequest({ search: "zzz_no_match" }));
    const body = await res.json();
    expect(body.result.list).toHaveLength(0);
    expect(body.result.total).toBe(0);
  });
});
