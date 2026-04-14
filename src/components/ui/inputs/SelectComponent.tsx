'use client'

import { createPortal } from "react-dom";
import { useRef, useState, useEffect, useCallback } from "react";

import { useTranslations } from "use-intl";

import { SelectComponentProps, OptionCustom } from "@/types/ui";

import {
    ChevronDownIcon,
    ChevronUpIcon,
} from "lucide-react";

export default function SelectComponent({
    id,
    name,
    label,
    value,
    options,
    touched,
    placeholder,
    onChange,
    onSelect,
    selectedValue,
    error,
    className = "",
    noTranslation = false,
    required = false,
    disabled = false,
}: SelectComponentProps) {

    const t = useTranslations("Options");
    const labels = useTranslations("Labels");
    const placeholders = useTranslations("Placeholders");

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownPortalRef = useRef<HTMLDivElement>(null);

    const currentValue = value !== undefined ? value : selectedValue;

    const updateDropdownPosition = useCallback(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 4,
                left: rect.left,
                width: rect.width,
            });
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            updateDropdownPosition();
            window.addEventListener('scroll', updateDropdownPosition, true);
            window.addEventListener('resize', updateDropdownPosition);
            // Foco al primer item al abrir
            setTimeout(() => {
                const firstItem = dropdownPortalRef.current?.querySelector<HTMLElement>('[role="option"]');
                firstItem?.focus();
            }, 0);
        }

        return () => {
            window.removeEventListener('scroll', updateDropdownPosition, true);
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [isOpen, updateDropdownPosition]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isInsideButton = buttonRef.current?.contains(target);
            const isInsideDropdown = dropdownPortalRef.current?.contains(target);

            if (!isInsideButton && !isInsideDropdown) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleDropdownClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (selectedValue: string | number | undefined) => {
        if (selectedValue === undefined) return;

        if (onChange) {
            const syntheticEvent = {
                target: {
                    name: name || id || "",
                    value: selectedValue,
                },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange(syntheticEvent);
        }

        if (onSelect) {
            onSelect(String(selectedValue));
        }

        setIsOpen(false);
    };

    const selectedOption = options.find(
        (opt: OptionCustom) => String(opt.value) === String(currentValue)
    );

    const selectedLabel = selectedOption?.label;

    return (

        <section className={`input__group ${className}`}>
            {label && (
                <label
                    className={`label__title ${error ? "label__error" : ""}`}
                    htmlFor={id}
                >
                    {labels(label)} <span>{required && '*'}</span>
                </label>
            )}

            <input
                type="hidden"
                name={name || id}
                value={currentValue || ""}
                aria-label={label || placeholder || name || id || "select value"}
            />

            <button
                ref={buttonRef}
                id={id}
                type="button"
                onClick={!disabled ? handleDropdownClick : undefined}
                onKeyDown={(e) => {
                    if (e.key === "Tab" && isOpen) {
                        e.preventDefault();
                        const firstItem = dropdownPortalRef.current?.querySelector<HTMLElement>('[role="option"]');
                        firstItem?.focus();
                    } else if (e.key === "Escape" && isOpen) {
                        setIsOpen(false);
                    }
                }}
                disabled={disabled}
                className={`select ${isOpen ? "select__open" : ''} ${className} ${error ? "select__error" : ""} ${disabled ? "select__disabled" : ""}`}
                aria-label={!label && placeholder ? placeholders(placeholder) : undefined}
            >
                {noTranslation
                    ? selectedLabel || placeholder
                    : selectedLabel
                        ? t(selectedLabel)
                        : placeholder ? placeholders(placeholder) : null}
                {options.length > 1 &&
                    (isOpen ? (
                        <ChevronUpIcon className="select__icon" size={16} />
                    ) : (
                        <ChevronDownIcon className="select__icon" size={16} />
                    ))}
            </button>

            {options && options.length > 1 && isOpen && createPortal(
                <section
                    ref={dropdownPortalRef}
                    className="select__dropdown"
                    style={{
                        position: 'fixed',
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        width: `${dropdownPosition.width}px`,
                        zIndex: 9999,
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <ul className="select__dropdown__list" role="listbox">
                        {options
                            .filter(
                                (option: OptionCustom) =>
                                    String(option.value) !== String(currentValue)
                            )
                            .map((option: OptionCustom, index: number) => {
                                const keyValue =
                                    option.value !== undefined
                                        ? String(option.value)
                                        : `option-${index}`;
                                return (
                                    <li
                                        key={keyValue}
                                        className="select__dropdown__list--item"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(option.value);
                                        }}
                                        role="option"
                                        aria-selected={false}
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                handleSelect(option.value);
                                            } else if (e.key === "Escape") {
                                                e.preventDefault();
                                                setIsOpen(false);
                                                buttonRef.current?.focus();
                                            } else if (e.key === "Tab" || e.key === "ArrowDown" || e.key === "ArrowUp") {
                                                e.preventDefault();
                                                const items = dropdownPortalRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
                                                if (!items) return;
                                                const currentIndex = Array.from(items).indexOf(e.currentTarget as HTMLElement);
                                                const goNext = e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey);
                                                if (goNext) {
                                                    if (currentIndex < items.length - 1) {
                                                        items[currentIndex + 1].focus();
                                                    } else {
                                                        setIsOpen(false);
                                                        buttonRef.current?.focus();
                                                    }
                                                } else {
                                                    if (currentIndex > 0) {
                                                        items[currentIndex - 1].focus();
                                                    } else {
                                                        setIsOpen(false);
                                                        buttonRef.current?.focus();
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        {noTranslation
                                            ? option.label
                                            : t(option.label)}
                                    </li>
                                );
                            })}
                    </ul>
                </section>,
                document.body
            )}

            {error && touched && <p className='label__error'>* {error}</p>}

        </section>
    );
};
