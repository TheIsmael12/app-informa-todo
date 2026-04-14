# Todo CRUD — Informa DB Prueba técnica

Aplicación CRUD de tareas construida con **Next.js 16 App Router**, **TypeScript** y **React 19**. Incluye API REST, cliente web, internacionalización (ES/EN/FR/CA), tests unitarios, documentación Swagger y logging estructurado.

---

## Índice

1. [Requisitos](#requisitos)
2. [Instalación y arranque](#instalación-y-arranque)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [API REST](#api-rest)
5. [Modelo de datos](#modelo-de-datos)
6. [Persistencia](#persistencia)
7. [Validación](#validación)
8. [Internacionalización](#internacionalización)
9. [Accesibilidad](#accesibilidad)
10. [Lighthouse](#lighthouse)
11. [Tests unitarios](#tests-unitarios)
12. [Documentación Swagger](#documentación-swagger)
13. [Logging](#logging)
14. [Decisiones técnicas y herramientas utilizadas](#decisiones-técnicas-y-herramientas-utilizadas)

---

## Requisitos

- **Node.js** ≥ 22
- **npm** ≥ 10

---

## Instalación y arranque

```bash
# Instalar dependencias
npm install

# Arrancar en modo desarrollo (hot-reload)
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Otros comandos

| Comando                 | Descripción                                   |
|-------------------------|-----------------------------------------------|
| `npm run dev`           | Servidor de desarrollo con hot-reload         |
| `npm run build`         | Construye la aplicación para producción       |
| `npm run start`         | Arranca el servidor de producción (tras build)|
| `npm test`              | Ejecuta todos los tests unitarios             |
| `npm run test:watch`    | Tests en modo watch (re-ejecuta al guardar)   |
| `npm run test:coverage` | Tests con informe de cobertura               |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── docs/route.ts        → GET /api/docs (especificación OpenAPI 3.0 JSON)
│   │   └── todos/
│   │       ├── store.ts             → persistencia en memoria (globalThis)
│   │       ├── add/route.ts         → POST   /api/todos/add
│   │       ├── all/route.ts         → GET    /api/todos/all
│   │       ├── edit/[id]/route.ts   → PUT    /api/todos/edit/:id
│   │       └── delete/[id]/route.ts → DELETE /api/todos/delete/:id
│   ├── docs/route.ts            → GET /docs (Swagger UI interactivo)
│   └── [locale]/                → páginas con soporte i18n
├── actions/                     → Server Actions (mutaciones + revalidación caché)
├── components/                  → componentes UI reutilizables
├── enums/status.ts              → enum Status { PENDING, COMPLETED }
├── hooks/                       → custom hooks (useFilters, usePagination, …)
├── i18n/                        → configuración next-intl + archivos de traducción
├── lib/
│   ├── logger.ts                → logger estructurado (JSON en prod, legible en dev)
│   └── getApiMessages.ts        → mensajes de API localizados por locale
├── schemas/todo.schema.ts       → validación Yup (title y status obligatorios)
├── styles/                      → estilos SCSS con arquitectura ITCSS
├── types/                       → interfaces TypeScript (Todo, AddTodo, EditTodo…)
└── views/                       → vistas y componentes de negocio
__tests__/
├── store.test.ts
└── api/todos/
    ├── add.test.ts
    ├── all.test.ts
    ├── delete.test.ts
    └── edit.test.ts
```

---

## API REST

**Base URL:** `http://localhost:3000/api`

### `GET /todos/all`

Lista todas las tareas con paginación y búsqueda opcional.

**Query params:**

| Param    | Tipo    | Por defecto | Descripción                         |
|----------|---------|-------------|-------------------------------------|
| `page`   | integer | `1`         | Número de página                    |
| `limit`  | integer | `10`        | Resultados por página               |
| `search` | string  | —           | Filtra por título o descripción     |

**Ejemplo de respuesta 200:**
```json
{
  "result": {
    "list": [
      { "id": 1, "title": "Contratar a Ismael", "description": "...", "status": "pending" }
    ],
    "page": 1, "limit": 10, "total": 4, "totalPages": 1
  },
  "message": "OK"
}
```

---

### `POST /todos/add`

Crea una nueva tarea.

**Body JSON:**
```json
{
  "title": "Mi tarea",          
  "description": "Opcional",    
  "status": "pending"           
}
```

| Status | Descripción                                     |
|--------|-------------------------------------------------|
| `201`  | Tarea creada correctamente                      |
| `400`  | Faltan campos obligatorios (`title` o `status`) |
| `409`  | Ya existe una tarea con ese título              |

---

### `PUT /todos/edit/:id`

Actualiza una tarea existente. Todos los campos del body son opcionales.

| Status | Descripción                           |
|--------|---------------------------------------|
| `200`  | Tarea actualizada correctamente       |
| `404`  | Tarea no encontrada                   |
| `409`  | Título duplicado (existe en otro todo)|

---

### `DELETE /todos/delete/:id`

Elimina una tarea por su ID.

| Status | Descripción         |
|--------|---------------------|
| `200`  | Tarea eliminada     |
| `404`  | Tarea no encontrada |

---

## Modelo de datos

```typescript
interface Todo {
  id: number;           // Autoincremental, asignado por el servidor
  title: string;        // Obligatorio, único
  description?: string; // Opcional
  status: "pending" | "completed"; // Obligatorio
}
```

---

## Persistencia

La aplicación usa **persistencia en memoria** mediante `globalThis`. Se inicializa con 4 tareas de ejemplo al arrancar el servidor y persiste los cambios mientras el proceso esté activo. No requiere ninguna base de datos externa.

```typescript
// src/app/api/todos/store.ts
if (!globalThis.__todos) {
  globalThis.__todos = [
    { id: 1, title: "Contratar a Ismael", status: "pending" },
    // …
  ];
  globalThis.__nextTodoId = 5;
}
```

> En producción real se sustituiría por PostgreSQL, SQLite u otra base de datos persistente.

> **Nota:** Las tareas de ejemplo que aparecen al iniciar la aplicación son completamente de broma y tienen un carácter humorístico. No deben tomarse como referencia de contenido real.

---

## Validación

Existe en **dos capas independientes**:

1. **API (server-side):** verifica que `title` y `status` estén presentes. Devuelve `400 Bad Request` si faltan.
2. **Formularios (client-side):** esquema Yup en `src/schemas/todo.schema.ts` integrado con Formik para feedback en tiempo real.

---

## Internacionalización

La aplicación soporta **4 idiomas**: Español (ES), Inglés (EN), Francés (FR) y Catalán (CA), implementado con `next-intl 4`.

Los idiomas han sido elegidos tomando como referencia el portal **[informa.es](https://www.informa.es)**, que ofrece su web en exactamente estos cuatro idiomas. Es la plataforma a la que pertenece esta prueba técnica, por lo que es la referencia más directa para definir el soporte lingüístico de la aplicación.

- Los mensajes de error de la API están localizados (cookie `NEXT_LOCALE`).
- URLs con prefijo de locale: `/es`, `/en`, `/fr`, `/ca`.
- Selector de idioma en la barra de navegación.

---

## Accesibilidad

La aplicación cumple al **100% con los requisitos de accesibilidad WCAG 2.1 nivel AA**, validado mediante **[ARC Toolkit](https://www.tpgi.com/arc-platform/arc-toolkit/)** (revisión manual asistida por herramienta) y Lighthouse:

- Contraste de color suficiente en todos los modos (claro, oscuro y sistema).
- Todos los elementos interactivos tienen `aria-label` o texto visible significativo.
- Navegación completa por teclado con gestión correcta del foco (incluye trampa de foco en modales).
- Soporte completo para lectores de pantalla: roles ARIA (`role="dialog"`, `role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-live`, …).
- Enlace de salto al contenido principal (`skip to content`) accesible por teclado.
- Imágenes decorativas marcadas con `aria-hidden="true"`.
- Feedback de operaciones anunciado con regiones `aria-live`.
- Etiquetas `<label>` asociadas a todos los campos de formulario.

---

## Lighthouse

La aplicación obtiene una puntuación de **100 en todas las categorías** del auditor Lighthouse en modo escritorio:

| Categoría        | Puntuación |
|------------------|------------|
| Performance      | 100        |
| Accessibility    | 100        |
| Best Practices   | 100        |
| SEO              | 100        |

![Lighthouse 100/100 en todas las categorías]
<img width="1915" height="908" alt="100" src="https://github.com/user-attachments/assets/49b1e0be-b224-4fea-89f6-d0a62c36e354" />

---

## Tests unitarios

Se usa **Jest** con el preset oficial de Next.js (`next/jest`):

```bash
npm test               # Ejecuta todos los tests
npm run test:coverage  # Genera informe de cobertura HTML
```

### Suites de tests — **23 tests en 5 suites**

| Fichero                              | Tests | Qué prueba                                                           |
|--------------------------------------|-------|----------------------------------------------------------------------|
| `__tests__/store.test.ts`            | 6     | getTodos (array, seeds, misma referencia) + getNextId                |
| `__tests__/api/todos/add.test.ts`    | 5     | 400 sin title, 400 sin status, 409 duplicado, 201 con/sin descripción|
| `__tests__/api/todos/all.test.ts`    | 6     | Listado, paginación, filtro por título/descripción, descripción nula |
| `__tests__/api/todos/delete.test.ts` | 2     | 404 no encontrado, 200 eliminación correcta                          |
| `__tests__/api/todos/edit.test.ts`   | 4     | 404, actualización, 409 duplicado, actualizar solo descripción       |

Los route handlers se testean con `NextRequest` reales mockeando únicamente el store y el logger.

---

## Documentación Swagger

Accesible en `http://localhost:3000/docs` una vez arrancada la aplicación.

La spec está embebida directamente en la página (sin fetch adicional). Usa Swagger UI 5 desde unpkg CDN.

---

## Logging

Todas las rutas API usan `src/lib/logger.ts`:

```
# Desarrollo
[2026-04-14T10:30:00.000Z] [INFO] GET /api/todos/all {"page":1,"total":4}
[2026-04-14T10:30:01.000Z] [WARN] POST /api/todos/add — título duplicado {"title":"Hacer ejercicio"}

# Producción (JSON estructurado)
{"level":"info","message":"GET /api/todos/all","timestamp":"...","context":{"page":1}}
```

---

## Decisiones técnicas y herramientas utilizadas

### **Next.js 16 App Router**
Integración nativa de API Routes, Server Actions con `revalidatePath`, streaming con React Suspense e i18n con `next-intl`. Permite cliente y servidor en el mismo proyecto sin infraestructura adicional.

### **TypeScript (strict)**
Requerido por la prueba. Configuración estricta en todos los archivos. Los tipos genéricos `FetchResponse<T>` y `PaginatedDataResponse<T>` garantizan type-safety end-to-end.

### **Formik + Yup**
Formik gestiona el estado de formularios de forma declarativa. Yup define schemas de validación reutilizables. Combinación estándar del ecosistema React para formularios complejos.

### **next-intl 4**
Internacionalización completa con detección de locale por URL. Soporta ES, EN, FR y CA con ficheros JSON independientes por dominio (labels, buttons, validations, api…). Los idiomas se han elegido tomando como referencia [informa.es](https://www.informa.es), que opera en estos cuatro idiomas.

### **Jest + next/jest**
Preset oficial que configura SWC y aliases de paths automáticamente. Los tests de route handlers usan `NextRequest` real con mocks del store, asegurando cobertura realista y aislada.

### **Sass (SCSS) + ITCSS**
Estilos en capas por especificidad: Settings → Tools → Generic → Components. Evita colisiones y mantiene el CSS escalable sin frameworks CSS.

### **Sonner**
Notificaciones toast minimalistas para feedback de operaciones CRUD. Más ligero que react-hot-toast.

### **lucide-react**
Iconos SVG como componentes React tree-shakeable y accesibles.

### **next-themes**
Tema claro/oscuro con SSR sin parpadeo (FOUC). Integrado con variables CSS del sistema de diseño.

### **Swagger UI (CDN)**
La especificación está embebida directamente como objeto JavaScript en la página `/docs`. Usa Swagger UI 5 desde unpkg CDN. La spec no requiere ninguna petición adicional al servidor, lo que hace la página de documentación completamente fiable.

### **GitHub Copilot (IA)**
Utilizado como asistente de desarrollo para acelerar la escritura de código repetitivo (tests, spec Swagger, README), explorar patrones del App Router y revisar posibles errores. Todo el código fue revisado, adaptado y validado manualmente.
