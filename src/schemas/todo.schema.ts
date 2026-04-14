import { Status } from "@/enums/status";
import * as Yup from "yup";

/**
 * Schema de validación para tareas (todos).
 * Contiene las reglas para los campos de título, descripción y estado.
  * - title: Requerido, debe ser una cadena de texto.
  * - description: Opcional, debe ser una cadena de texto.
  * - status: Requerido, debe ser uno de los valores definidos en el enum Status (PENDING o COMPLETED).
 */
export const todoSchema = Yup.object({
    title: Yup.string().required('titleRequired'),
    description: Yup.string().optional(),
    status: Yup.string().oneOf([Status.COMPLETED, Status.PENDING], 'invalidStatus').required('statusRequired'),
});
