import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task) {
      console.error("Task cannot be empty");
      return;
    }
    axios
      .post("http://localhost:3001/add", { task })
      .then((result) => {
        location.reload();
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
