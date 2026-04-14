'use client'

import { useRef } from "react";
import { createPortal } from "react-dom";

import { useTranslations } from "next-intl";

import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { Formik, Form, FormikValues,  } from "formik";

import { ModalProps } from "@/types/modal";

import { PlusIcon, XIcon } from "lucide-react";

export default function ModalComponent<T extends FormikValues = FormikValues>({
    title,
    isOpen,
    closeOnOutsideClick = true,
    isLoading,
    onClose,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    isLoadingText,
    initialValues,
    validationSchema,
    onSubmit,
    submitText,
    submittingText,
    children,
}: ModalProps<T>) {

    const buttons = useTranslations('Buttons');

    const modalRef = useRef<HTMLDialogElement | null>(null);

    // Focus trap para mantener el foco dentro del modal
    useFocusTrap<HTMLDialogElement>({
        isActive: isOpen,
        onEscape: onClose,
        ref: modalRef,
    });

    useOutsideClick(modalRef, {
        onOutsideClick: () => onClose(),
        isActive: isOpen && closeOnOutsideClick,
        lockScroll: true
    });

    if (!isOpen) return null;

    const isFormModal = initialValues && onSubmit;
    const isRenderFunction = typeof children === 'function';

    const renderContent = () => {

        if (!children) {
            return (
                <h3 className="modal__content__title">
                    {title}
                </h3>
            );
        }

        if (isFormModal) {

            return (

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (

                        <Form className="modal__form">
                            <div className="modal__form__content">
                                {isRenderFunction
                                    ? children({
                                        values: values as T,
                                        errors: errors as Record<string, string | undefined>,
                                        touched: touched as Record<string, boolean | undefined>,
                                        handleChange,
                                        handleBlur,
                                        setFieldValue,
                                        isSubmitting
                                    })
                                    : children
                                }
                            </div>

                            <div className="modal__form__footer">
                                <button
                                    type="submit"
                                    className="btn btn--primary"
                                    disabled={isSubmitting || isLoading}
                                >
                                    {isSubmitting || isLoading
                                        ? (submittingText || buttons('loading')) : (
                                            <>
                                                <PlusIcon />
                                                {submitText || buttons('confirm')}
                                            </>
                                        )}
                                </button>
                            </div>
                        </Form>
                    )
                    }
                </Formik >
            )
        }

        return <section className="modal__content">{children as React.ReactNode}</section>;
    };

    const modalContent = (

        <>
            <div className="modal__overlay" />

            <dialog
                open
                ref={modalRef}
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title">

                <div className="modal__header">
                    {children && (
                        <h3 id="modal-title" className="modal__header__title">
                            {title}
                        </h3>
                    )}

                    <button
                        className="modal__header__close"
                        aria-label={buttons('cancel')}
                        onClick={onClose}
                    >
                        <XIcon />
                    </button>
                </div>

                {renderContent()}

                {!isFormModal && (
                    <section className="modal__footer">
                        {onConfirm && (
                            <button
                                className="modal__footer__button modal__footer__confirm"
                                aria-label={confirmText ? confirmText : buttons('confirm')}
                                onClick={onConfirm}
                                disabled={isLoading}
                            >
                                {
                                    isLoading
                                        ? (isLoadingText ? isLoadingText : buttons('loading'))
                                        : (confirmText ? confirmText : buttons('confirm'))
                                }
                            </button>
                        )}

                        {onCancel && (
                            <button
                                className="modal__footer__button modal__footer__cancel"
                                aria-label={cancelText ? cancelText : buttons('cancel')}
                                onClick={onCancel}
                            >
                                {cancelText ? cancelText : buttons('cancel')}
                            </button>
                        )}
                    </section>
                )}

            </dialog>
        </>
    );

    return createPortal(modalContent, document.body);

}