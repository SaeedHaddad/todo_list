const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todolist_db");

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;

  // Toggle the `done` status
  TodoModel.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      todo.done = !todo.done;
      return todo.save();
    })
    .then((updatedTodo) => res.json(updatedTodo))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the todo" });
    });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((updatedTodo) => res.json(updatedTodo))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the todo" });
    });
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running!");
});
