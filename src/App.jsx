import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="mt-10 flex items-center justify-center gap-4">
        <input
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-96 rounded-lg px-4 py-2 border border-gray-500 focus:border-blue-700 focus:ring focus:ring-blue-500"
          type="text"
          placeholder="Name of todo.."
          value={newTodo}
        />

        <button
          onClick={() => {
            if (newTodo) {
              setTodos((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  name: newTodo,
                  date: new Date(),
                  status: "pending",
                },
              ]);
              toast.success(`Successfully Added New Todo ${newTodo}!`);
              setNewTodo("");
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 px-10 text-white py-2 rounded-xl"
        >
          Add Todo
        </button>
      </div>

      {/* List */}
      <div className="flex items-center justify-center flex-col gap-4 mt-20 w-full">
        {todos.map((todo, i) => (
          <div
            key={i}
            className="flex w-[900px] max-md:w-full cursor-pointer font-medium items-center justify-center gap-8 px-10 py-4 shadow-lg rounded-lg  duration-200 hover:shadow-blue-500"
          >
            <p>Name: {todo?.name}</p>
            <p>Created At: {new Date(todo?.date).toLocaleTimeString()}</p>
            <p
              className={`font-semibold ${
                todo.status == "pending" && "text-yellow-600"
              } ${todo.status == "completed" && "text-green-600"}`}
            >
              Status: {todo.status}
            </p>
            <button
              onClick={() => {
                if (todo.status === "pending") {
                  const filteredIndex = todos.findIndex(
                    (t) => t.name == todo.name && t.id == todo.id
                  );

                  if (filteredIndex == -1) {
                    return;
                  }

                  const allTodos = todos;
                  allTodos[filteredIndex] = {
                    ...allTodos[filteredIndex],
                    status: "completed",
                  };
                  setTodos(allTodos);
                  toast.success(`Successfully Updated Todo ${todo.name}!`);
                }
              }}
              className={`px-5 py-1.5 rounded ${
                todo.status == "completed"
                  ? "text-white bg-green-500 hover:bg-green-600"
                  : "text-black bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              {todo.status == "pending" ? "Mark As Done" : "Done"}
            </button>
            <button
              onClick={() => {
                const filteredTodo = todos.filter(
                  (t) => t.name !== todo.name && t.id !== todo.id
                );
                setTodos(filteredTodo);
                toast.success(`Successfully Deleted Todo ${todo.name}!`);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-1.5 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
