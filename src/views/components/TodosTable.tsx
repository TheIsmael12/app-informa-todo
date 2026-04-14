import usePagination from "@/hooks/usePagination";

import TodoCard from "@/components/cards/TodoCard";
import ListComponent from "@/components/tables/ListComponent";

import { TodoPaginatedResponse } from "@/types/todo";

interface TodosTableProps {
    data: TodoPaginatedResponse
}

export default function TodosTable({
    data
}: TodosTableProps) {

    const { pagination, onPaginationChange } = usePagination({
        page: data.page,
        totalPages: data.totalPages,
        total: data.total,
        limit: data.limit
    });

    return (

        <ListComponent
            className="list"
            data={data.list}
            renderCard={(todo) => <TodoCard data={todo} />}
            pagination={{
                page: pagination.page,
                limit: pagination.limit,
                totalPages: data.totalPages,
                total: data.total,
            }}
            onPaginationChange={onPaginationChange}
        />

    )

}