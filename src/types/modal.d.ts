import * as Yup from "yup";
import { FormikHelpers } from "formik";

/**
 * Props de render que Formik expone al children del modal.
 * @property values - Valores actuales del formulario
 * @property errors - Errores de validación por campo
 * @property touched - Campos que han recibido foco y perdido
 * @property handleChange - Handler de cambio para inputs, selects y textareas
 * @property handleBlur - Handler de pérdida de foco para inputs, selects y textareas
 * @property setFieldValue - Setter programático del valor de un campo
 * @property isSubmitting - Indica si el formulario está en proceso de envío
 */
export interface FormikRenderProps<T = FormikValues> {
    values: T;
    errors: Record<string, string | undefined>;
    touched: Record<string, boolean | undefined>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    setFieldValue: (field: string, value: unknown) => void;
    isSubmitting: boolean;
}

/**
 * Props para el componente Modal genérico con soporte opcional de Formik.
 * @property title - Título del modal
 * @property isOpen - Controla la visibilidad del modal
 * @property closeOnOutsideClick - Cierra el modal al hacer click fuera (opcional)
 * @property isLoading - Muestra estado de carga en el botón de confirmación (opcional)
 * @property onClose - Callback al cerrar el modal
 * @property onConfirm - Callback al confirmar sin formulario (opcional)
 * @property onCancel - Callback al cancelar (opcional)
 * @property confirmText - Texto del botón de confirmación (opcional)
 * @property cancelText - Texto del botón de cancelación (opcional)
 * @property isLoadingText - Texto mostrado durante la carga (opcional)
 * @property initialValues - Valores iniciales del formulario Formik (opcional)
 * @property validationSchema - Schema Yup de validación del formulario (opcional)
 * @property onSubmit - Handler de envío del formulario Formik (opcional)
 * @property submitText - Texto del botón de envío del formulario (opcional)
 * @property submittingText - Texto del botón mientras se envía el formulario (opcional)
 * @property children - Contenido del modal, puede ser nodo React o función que recibe FormikRenderProps
 */
export interface ModalProps<T = FormikValues> {
    title: string;
    isOpen: boolean;
    closeOnOutsideClick?: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    isLoadingText?: string;
    initialValues?: T;
    validationSchema?: Yup.AnySchema;
    onSubmit?: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
    submitText?: string;
    submittingText?: string;
    children?: React.ReactNode | ((props: FormikRenderProps<T>) => React.ReactNode);
}