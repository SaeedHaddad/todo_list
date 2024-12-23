import React, { useEffect, useState } from "react";
import Create from "./Create";
import "./App.css";
import axios from "axios";
import {
  BsFillTrashFill,
  BsCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.61.1.235:3001/get")
      .then((result) => {
        console.log(result.data); // Log the response data
        setTodos(result.data); // Update state with data
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://13.61.1.235:3001/update/${id}`)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://13.61.1.235:3001/delete/${id}`)
      .then((result) => {
        console.log("Deleting task with ID:", id);
        location.reload(); // Reload the page to reflect the changes
      })
      .catch((err) => console.log("Error deleting task:", err));
  };

  return (
    <>
      <div className="home">
        <h2>ToDo List</h2>
        <Create />
        {todos.length === 0 ? (
          <div>
            <h2>No Record</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              <div className="task">
                <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                  {todo.done ? (
                    <BsFillCheckCircleFill className="icon" />
                  ) : (
                    <BsCircleFill className="icon" />
                  )}
                  <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <div>
                  <span>
                    <BsFillTrashFill
                      className="icon"
                      onClick={() => handleDelete(todo._id)}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Home;
