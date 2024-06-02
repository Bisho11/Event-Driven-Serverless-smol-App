import {NextUIProvider} from "@nextui-org/react";
import axios from 'axios';
import './App.css';
import { useEffect, useState } from "react";
import Topbar from "./Topbar/Topbar";
import Addtask from "./Todomenu/Addtask";
import Todo from "./Todos/Todo";
function App() {

  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://7fdk7ts1ih.execute-api.us-east-1.amazonaws.com/v1/todos');
      const sortedTodos = response.data.sort((a, b) => {
        if (a.Status === b.Status) {
          return new Date(a.Timestamp) - new Date(b.Timestamp);
        }
        return a.Status === 'In Progress' ? -1 : 1;
      });
      setTodos(sortedTodos);
    } catch (error) {
      console.error('There was an error fetching the todos!', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <NextUIProvider>
      <Topbar/>
      <div className="flex flex-col items-center">
      <Addtask fetchTodos={fetchTodos} />
      {todos.map((todo) => (
        <Todo id={todo.id} Task={todo.Task} Status={todo.Status} fetchTodos={fetchTodos}/>
      )
    )}
      </div>
    </NextUIProvider>
  );
}

export default App;
