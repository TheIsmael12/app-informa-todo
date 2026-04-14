import TodosViewPage from "@/views/TodosViewPage";
import { fetchAllTodos } from "@/actions/todos/todos";

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home(props: HomeProps) {

  const searchParams = await props.searchParams;
  const todosPromise = fetchAllTodos(searchParams);
  
  return <TodosViewPage todosPromise={todosPromise} />

}