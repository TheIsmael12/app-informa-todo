import { useTranslations } from "next-intl";
import { TextAreaComponentProps } from "@/types/ui";

export default function TextAreaComponent({
    id,
    name,
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    required,
    disabled,
    rows,
    cols,
    maxLength,
}: TextAreaComponentProps) {

    const labels = useTranslations("Labels");
    const placeholders = useTranslations("Placeholders");

    return (

        <article className="input__group ">

            {label &&
                <label
                    htmlFor={id}
                    className={`label__title ${error && touched ? 'label__error' : ''}`}>
                    {labels(label)} <span>{required && '*'}</span>
                </label>
            }

            <textarea
                id={id}
                name={name}
                value={value}
                placeholder={placeholder ? placeholders(placeholder) : undefined}
                onChange={onChange}
                required={required}
                onBlur={onBlur}
                rows={rows}
                cols={cols}
                maxLength={maxLength}
                className={`input input__textarea ${error && touched ? 'input__error' : ''}`}
                disabled={disabled}
                autoComplete='off'
                aria-label={!label && placeholder ? placeholders(placeholder) : undefined}
            />

            {error && touched && <p className='label__error'>* {error}</p>}

        </article>
    )

}