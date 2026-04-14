"use client";

import { Suspense, use } from "react";

import TodosTable from "@/views/components/TodosTable";
import TodosFilters from "@/views/components/TodosFilters";
import TitleComponent from "@/components/ui/TitleComponent";

import { fetchAllTodos } from "@/actions/todos/todos";

interface TodosViewPageProps {
    todosPromise: ReturnType<typeof fetchAllTodos>;
}

export default function TodosViewPage(props: TodosViewPageProps) {
    return (
        <>
            <TitleComponent namespace="Todos" />
            <TodosFilters />
            <Suspense fallback={<p>Cargando...</p>}>
                <TodosViewContent {...props} />
            </Suspense>
        </>
    );
}

function TodosViewContent({ todosPromise }: TodosViewPageProps) {

    const { data, error, message } = use(todosPromise);

    if (error) return <p>{message ?? error}</p>;
    if (!data) return <p>No hay datos disponibles</p>;

    return <TodosTable data={data} />
}

