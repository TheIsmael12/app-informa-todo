import { useFilters } from "@/hooks/useFilters";

import UpsertTodo from "@/views/components/UpsertTodo";
import SearchComponent from "@/components/ui/inputs/SearchComponent";

export default function TodosFilters() {

    const [filters, setFilters] = useFilters({
        search: "",
    });

    return (

        <section className='main__filters'>

            <SearchComponent
                id="search"
                name="search"
                label="search"
                value={filters.search as string || ""}
                onChange={(e) => setFilters({ search: e.target.value })}
            />

            <UpsertTodo />

        </section>
    )
}