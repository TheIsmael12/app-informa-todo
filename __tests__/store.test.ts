import { getTodos, getNextId } from "@/app/api/todos/store";

describe("Store — getTodos", () => {
  it("devuelve un array", () => {
    const todos = getTodos();
    expect(Array.isArray(todos)).toBe(true);
  });

  it("contiene datos iniciales (seeds)", () => {
    const todos = getTodos();
    expect(todos.length).toBeGreaterThan(0);
  });

  it("siempre devuelve la misma referencia", () => {
    expect(getTodos()).toBe(getTodos());
  });

  it("cada todo tiene las propiedades obligatorias", () => {
    const todos = getTodos();
    todos.forEach((todo) => {
      expect(todo).toHaveProperty("id");
      expect(todo).toHaveProperty("title");
      expect(todo).toHaveProperty("status");
    });
  });
});

describe("Store — getNextId", () => {
  it("devuelve IDs incrementales", () => {
    const id1 = getNextId();
    const id2 = getNextId();
    expect(id2).toBe(id1 + 1);
  });

  it("devuelve un número", () => {
    expect(typeof getNextId()).toBe("number");
  });
});
