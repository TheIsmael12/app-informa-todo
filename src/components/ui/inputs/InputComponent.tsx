import { useTranslations } from "next-intl";

import { XIcon } from "lucide-react";
import { InputComponentProps } from "@/types/ui";

export default function InputComponent({
    id,
    name,
    label,
    accept,
    required,
    type,
    placeholder,
    error,
    touched,
    value,
    onChange,
    onBlur,
    onKeyDown,
    readonly,
    min,
    max,
    maxLength,
    minLength,
    disabled,
    className,
    noTranslate,
    autoComplete = 'off',
}: InputComponentProps) {

    const labels = useTranslations('Labels')
    const placeholders = useTranslations('Placeholders')
    const validations = useTranslations('Validations')

    const isSearch = type === "search";

    return (

        <article className={`input__group ${isSearch ? 'input__search' : ''}`}>

            {label &&
                <label
                    htmlFor={id}
                    className={`label__title ${error && touched ? 'label__error' : ''}`}>
                    {noTranslate ? label : labels(label)} <span>{required && '*'}</span>
                </label>
            }

            <section className={className ? `${className}` : 'input__full'}>

                <input
                    id={id}
                    name={name}
                    type="text"
                    value={value}
                    placeholder={placeholder ? (noTranslate ? placeholder : placeholders(placeholder)) : undefined}
                    onChange={onChange}
                    readOnly={readonly}
                    min={min}
                    max={max}
                    maxLength={maxLength ? maxLength : undefined}
                    minLength={minLength ? minLength : undefined}
                    required={required}
                    accept={accept}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    className={`input ${error && touched ? 'input__error' : ''}` + (isSearch ? ' input__search' : '')}
                    disabled={disabled}
                    autoComplete={autoComplete}
                />

                {isSearch && value && (
                    <button
                        className="input__search__clear"
                        type="button"
                        onClick={() => onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}>
                        <XIcon />
                    </button>
                )}

            </section>

            {error && touched && <p className='label__error'>* {validations(error as Parameters<typeof validations>[0])}</p>}

        </article>

    )

}