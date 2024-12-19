import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Create() {
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (!task) {
      console.error("Task cannot be empty");
      return;
    }
    axios
      .post("http://13.61.1.235:3001/add", { task })
      .then((result) => {
        setTodos([...todos, result.data]); // Add the new task to the state
        setTask(""); // Clear the input field
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
