'use client'

import { useState } from "react";
import { useTranslations } from "next-intl";

import { toast } from "sonner";

import ModalComponent from "@/components/modals/ModalComponent";
import InputComponent from "@/components/ui/inputs/InputComponent";
import SelectComponent from "@/components/ui/inputs/SelectComponent";

import { HTTPStatus } from "@/constants/httpStatus";

import { Edit2Icon, UserPlus2Icon } from "lucide-react";

import { addTodo, editTodo } from "@/actions/todos/todos-actions";

import { Status } from "@/enums/status";
import { AddTodo, EditTodo, Todo } from "@/types/todo";

import { todoSchema } from "@/schemas/todo.schema";

interface UpsertTodoProps {
    data?: Todo;
}

export default function UpsertTodo({
    data,
}: UpsertTodoProps) {

    const buttons = useTranslations('Buttons');

    const [isOpenModal, setIsOpenModal] = useState(false);

    const initialValues: AddTodo = {
        title: data?.title || '',
        description: data?.description || '',
        status: data?.status || Status.PENDING,
    };

    const handleSubmit = async (values: AddTodo) => {
        let response;
        if (data && 'id' in data && data.id) {
            const editValues: EditTodo = { ...values, id: data.id };
            response = await editTodo(data.id, editValues);
        } else {
            response = await addTodo(values);
        }

        if (response.status === HTTPStatus.CREATED || response.status === HTTPStatus.OK) {
            toast.success(response.message);
            setIsOpenModal(false);
        } else {
            toast.error(response.message);
        }
    }

    return (

        <>

            <button
                type="button"
                title={data ? buttons('updateTodo') : buttons('addTodo')}
                className={data ? 'btn btn__small btn--primary' : 'btn btn--secondary'}
                onClick={() => setIsOpenModal(true)}>
                {data ? <Edit2Icon /> : <UserPlus2Icon />} {data ? '' : buttons('addTodo')}
            </button>

            {isOpenModal && (

                <ModalComponent<AddTodo>
                    title={data ? buttons('updateTodo') : buttons('addTodo')}
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    initialValues={initialValues}
                    validationSchema={todoSchema}
                    onSubmit={handleSubmit}
                    submitText={data ? buttons('updateTodo') : buttons('addTodo')}
                    submittingText={data ? buttons('updatingTodo') : buttons('addingTodo')}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (

                        <>
                            <InputComponent
                                id="title"
                                name="title"
                                type="text"
                                label='title'
                                placeholder='title'
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.title}
                                touched={touched.title}
                                required
                            />

                            <InputComponent
                                id="description"
                                name="description"
                                type="text"
                                label='description'
                                placeholder='description'
                                value={values.description || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.description}
                                touched={touched.description}
                            />

                            <SelectComponent
                                id="status"
                                name="status"
                                label='status'
                                placeholder='selectStatus'
                                value={values.status}
                                onChange={handleChange}
                                options={[
                                    { value: Status.COMPLETED, label: Status.COMPLETED },
                                    { value: Status.PENDING, label: Status.PENDING },
                                ]}
                                error={errors.status}
                                touched={touched.status}
                                required
                            />

                        </>

                    )}

                </ModalComponent>

            )}

        </>

    )

}