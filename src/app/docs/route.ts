export const dynamic = "force-dynamic";

const spec = {
  openapi: "3.0.3",
  info: {
    title: "Todo Informa DB CRUD API",
    version: "1.0.0",
    description:
      "API REST para gestión de tareas (CRUD). Construida con Next.js 16 App Router y TypeScript.",
  },
  servers: [{ url: "/api", description: "Servidor local" }],
  tags: [{ name: "Todos", description: "Operaciones sobre tareas" }],
  paths: {
    "/todos/all": {
      get: {
        tags: ["Todos"],
        summary: "Listar todas las tareas",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Lista paginada de tareas",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    result: {
                      type: "object",
                      properties: {
                        list: { type: "array", items: { $ref: "#/components/schemas/Todo" } },
                        page: { type: "integer" },
                        limit: { type: "integer" },
                        total: { type: "integer" },
                        totalPages: { type: "integer" },
                      },
                    },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/todos/add": {
      post: {
        tags: ["Todos"],
        summary: "Crear una tarea",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TodoInput" },
              example: { title: "Mi primera tarea", description: "Descripción opcional", status: "pending" },
            },
          },
        },
        responses: {
          "201": { description: "Tarea creada" },
          "400": { description: "Faltan campos obligatorios (title, status)" },
          "409": { description: "Ya existe una tarea con ese título" },
        },
      },
    },
    "/todos/edit/{id}": {
      put: {
        tags: ["Todos"],
        summary: "Actualizar una tarea",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TodoInput" },
              example: { status: "completed" },
            },
          },
        },
        responses: {
          "200": { description: "Tarea actualizada" },
          "404": { description: "Tarea no encontrada" },
          "409": { description: "Título duplicado" },
        },
      },
    },
    "/todos/delete/{id}": {
      delete: {
        tags: ["Todos"],
        summary: "Eliminar una tarea",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "Tarea eliminada" },
          "404": { description: "Tarea no encontrada" },
        },
      },
    },
  },
  components: {
    schemas: {
      Todo: {
        type: "object",
        required: ["id", "title", "status"],
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "URGENTE: Contratar a Ismael" },
          description: { type: "string", nullable: true, example: "No dejar que se lo lleve la competencia" },
          status: { type: "string", enum: ["pending", "completed"], example: "pending" },
        },
      },
      TodoInput: {
        type: "object",
        properties: {
          title: { type: "string", example: "Nueva tarea" },
          description: { type: "string", example: "Descripción opcional" },
          status: { type: "string", enum: ["pending", "completed"], example: "pending" },
        },
      },
    },
  },
};

export function GET() {
  const specJson = JSON.stringify(spec);

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>API Docs — Todo Informa DB CRUD</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: sans-serif; }
    .topbar { display: none !important; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function () {
      SwaggerUIBundle({
        spec: ${specJson},
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
        layout: 'BaseLayout',
        deepLinking: true,
        defaultModelsExpandDepth: 2,
        defaultModelExpandDepth: 2,
      });
    };
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

