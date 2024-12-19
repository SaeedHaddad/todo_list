import React, { useEffect, useState } from "react";
import Create from "./Create";
import "./App.css";
import axios from "axios";
import {
  BsFillTrashFill,
  BsCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

// Replace with your EC2 instance's public IP or domain
const backendURL = "http://13.61.1.235:3001"; // Update this with your actual backend URL

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendURL}/get`)
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`${backendURL}/update/${id}`)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${backendURL}/delete/${id}`)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
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
