import UpsertTodo from "@/views/components/UpsertTodo";
import { Todo } from "@/types/todo";
import { Status } from "@/enums/status";
import DeleteTodo from "@/views/components/DeleteTodo";

interface TodoCardProps {
    data: Todo;
}

export default function TodoCard({
    data
}: TodoCardProps) {

    return (
        <article className={`todo__card ${data.status}`}>

            <div className="todo__card__body">
                <div className="todo__card__header">
                    <h2 className="todo__card__title">{data.title}</h2>
                </div>
                <p className="todo__card__description">
                    {data.description}
                </p>
            </div>

            <div className="todo__card__footer">
                <span className={`todo__card__status ${data.status}`}>
                    {data.status === Status.COMPLETED ? 'Completado' : 'Pendiente'}
                </span>
                <div className="todo__card__footer__actions">
                    <UpsertTodo data={data} />
                    <DeleteTodo id={data.id} />
                </div>
            </div>

        </article>
    );
}