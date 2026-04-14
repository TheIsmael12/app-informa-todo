'use client'

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { toast } from "sonner";

import ModalComponent from "@/components/modals/ModalComponent";

import { HTTPStatus } from "@/constants/httpStatus";
import { deleteTodo } from "@/actions/todos/todos-actions";

import { Todo } from "@/types/todo";

import { TrashIcon } from "lucide-react";

interface DeleteTodoProps {
    id: Todo['id'];
}

export default function DeleteTodo({
    id
}: DeleteTodoProps) {

    const labels = useTranslations('Labels');
    const buttons = useTranslations('Buttons');

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [isDeleting, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const response = await deleteTodo(id);
            if (response.status === HTTPStatus.OK) {
                toast.success(response.message);
                setIsOpenModal(false);
            } else {
                toast.error(response.message);
            }
        });
    }

    return (

        <>

            <button
                type="button"
                title={buttons("deleteTodo")}
                className="btn btn__small btn--error"
                onClick={() => setIsOpenModal(true)}>
                <TrashIcon />
            </button>

            {isOpenModal && (
                <ModalComponent
                    isOpen={isOpenModal}
                    title={labels("deleteTodoConfirmation")}
                    onClose={() => setIsOpenModal(false)}
                    onConfirm={handleDelete}
                    onCancel={() => setIsOpenModal(false)}
                    confirmText={isDeleting ? buttons("deletingTodo") : buttons("deleteTodo")}
                    cancelText={buttons("cancel")}
                />
            )}

        </>

    )

}