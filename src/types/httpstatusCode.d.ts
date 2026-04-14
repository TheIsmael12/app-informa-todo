/**
 * Mapa de códigos de estado HTTP usados en la aplicación.
 * @property OK - 200 Petición correcta
 * @property CREATED - 201 Recurso creado
 * @property ACCEPTED - 202 Petición aceptada
 * @property NO_CONTENT - 204 Sin contenido
 * @property BAD_REQUEST - 400 Petición incorrecta
 * @property UNAUTHORIZED - 401 No autenticado
 * @property FORBIDDEN - 403 Sin permisos
 * @property NOT_FOUND - 404 Recurso no encontrado
 * @property NOT_ACCEPTABLE - 406 Formato no aceptable
 * @property PRECONDITION_FAILED - 412 Precondición fallida
 * @property CONTENT_TOO_LARGE - 413 Contenido demasiado grande
 * @property TOO_MANY_REQUEST - 429 Demasiadas peticiones
 * @property IM_TEAPOT - 418 Soy una tetera
 * @property INTERNAL_SERVER_ERROR - 500 Error interno del servidor
 * @property CONFLICT - 409 Conflicto
 * @property SERVER_ERROR - 500 Error de servidor (alias)
 * @property SERVICE_UNAVAILABLE - 503 Servicio no disponible
 */
export interface HttpStatusCode {
  OK: number;
  CREATED: number;
  ACCEPTED: number;
  NO_CONTENT: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  NOT_ACCEPTABLE: number;
  PRECONDITION_FAILED: number;
  CONTENT_TOO_LARGE: number;
  TOO_MANY_REQUEST: number;
  IM_TEAPOT: number;
  INTERNAL_SERVER_ERROR: number;
  CONFLICT: number;
  SERVER_ERROR: number;
  SERVICE_UNAVAILABLE: number;
}
