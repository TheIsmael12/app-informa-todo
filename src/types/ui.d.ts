/**
 * Props para el componente de input genérico.
 * Soporta todos los tipos de <input> de HTML.
 * @property id - Identificador único del input, vincula el label con el control
 * @property name - Nombre del campo, usado en formularios y accesibilidad
 * @property label - Clave i18n del label. Si `noTranslate` es true, se usa como texto directo
 * @property accept - Tipos MIME aceptados (solo para type="file")
 * @property required - Marca el campo como obligatorio
 * @property type - Tipo de input HTML (text, email, password, search, file, etc.)
 * @property placeholder - Clave i18n del placeholder. Si `noTranslate` es true, se usa como texto directo
 * @property error - Mensaje de error de validación
 * @property touched - Indica si el campo ha sido tocado (blur) para mostrar errores
 * @property value - Valor controlado del input
 * @property onChange - Handler de cambio de valor
 * @property onBlur - Handler de pérdida de foco
 * @property onKeyDown - Handler de pulsación de tecla
 * @property readonly - Hace el input de solo lectura
 * @property min - Valor mínimo (para type="number" o type="date")
 * @property max - Valor máximo (para type="number" o type="date")
 * @property maxLength - Número máximo de caracteres permitidos
 * @property minLength - Número mínimo de caracteres requeridos
 * @property disabled - Deshabilita el input
 * @property className - Clase CSS adicional para el wrapper interno
 * @property noTranslate - Si es true, label y placeholder se usan como texto literal sin pasar por i18n
 * @property autoComplete - Valor del atributo autocomplete del navegador
 */
export interface InputComponentProps {
    id: string;
    name: string;
    label?: string;
    accept?: string;
    required?: boolean;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    error?: string;
    touched?: boolean;
    value: string | number | readonly string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readonly?: boolean;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    disabled?: boolean;
    className?: string;
    noTranslate?: boolean;
    autoComplete?: string;
}

/**
 * Props para el componente de búsqueda con debounce.
 * Extiende InputComponent con un retardo configurable antes de disparar onChange.
 * @property id - Identificador único del input
 * @property name - Nombre del campo
 * @property label - Clave i18n del label (opcional)
 * @property value - Valor controlado externo
 * @property debounceTime - Tiempo de debounce en ms antes de disparar onChange (por defecto 500ms)
 * @property onChange - Handler que recibe el evento de cambio tras el debounce
 */
export interface SearchComponentProps {
    readonly id: string;
    readonly name: string;
    readonly label?: string;
    readonly value: string;
    readonly debounceTime?: number;
    onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Opción individual para SelectComponent.
 * @property value - Valor interno de la opción
 * @property label - Texto visible de la opción
 */
export interface OptionCustom {
    readonly value?: string | number;
    readonly label: string;
}

/**
 * Props para el componente de select nativo.
 * @property id - Identificador único del select
 * @property name - Nombre del campo
 * @property label - Clave i18n del label
 * @property value - Valor actualmente seleccionado
 * @property options - Lista de opciones disponibles
 * @property touched - Indica si el campo ha sido tocado (blur) para mostrar errores
 * @property placeholder - Clave i18n del placeholder
 * @property onChange - Handler del evento change nativo del select
 * @property error - Mensaje de error de validación
 * @property needLabel - Si es false, oculta la etiqueta label aunque `label` esté definido
 * @property noTranslation - Si es true, label y placeholder se usan como texto literal sin pasar por i18n
 * @property className - Clase CSS adicional para el wrapper
 * @property ariaLabel - Texto alternativo de accesibilidad
 * @property onSelect - Handler alternativo que recibe el valor como string en vez del evento
 * @property selectedValue - Valor seleccionado alternativo (para uso sin estado controlado)
 * @property required - Marca el campo como obligatorio
 * @property disabled - Deshabilita el select
 */
export interface SelectComponentProps {
    readonly id?: string;
    readonly name?: string;
    readonly label?: string;
    readonly value: string | number | undefined;
    readonly options: OptionCustom[];
    readonly touched?: boolean;
    readonly placeholder?: string;
    onChange?: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    needLabel?: boolean;
    noTranslation?: boolean;
    className?: string;
    ariaLabel?: string;
    onSelect?: (_value: string) => void;
    selectedValue?: string | number;
    required?: boolean;
    disabled?: boolean;
}

/**
 * Props para el componente de textarea con soporte i18n y validación.
 * @property id - Identificador único del textarea, vincula el label con el control
 * @property name - Nombre del campo, usado en formularios
 * @property label - Clave i18n del label
 * @property placeholder - Clave i18n del placeholder
 * @property value - Valor controlado del textarea
 * @property onChange - Handler de cambio de valor
 * @property onBlur - Handler de pérdida de foco
 * @property error - Mensaje de error de validación
 * @property touched - Indica si el campo ha sido tocado (blur) para mostrar errores
 * @property required - Marca el campo como obligatorio
 * @property disabled - Deshabilita el textarea
 * @property rows - Número de filas visibles
 * @property cols - Número de columnas visibles
 * @property maxLength - Número máximo de caracteres permitidos
 */
export interface TextAreaComponentProps {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    error?: string;
    touched?: boolean;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    cols?: number;
    maxLength?: number;
}
