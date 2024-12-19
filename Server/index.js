const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["http://13.61.1.235:5173"], // Replace with your frontend's public IP or domain
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todolist_db";

mongoose
  .connect("mongodb://127.0.0.1:27017/todolist_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/get", (req, res) => {
  console.log("GET /get endpoint hit"); // Log request
  TodoModel.find()
    .then((result) => {
      console.log("Data retrieved:", result); // Log result
      res.json(result);
    })
    .catch((err) => {
      console.error("Error fetching data:", err); // Log error
      res.status(500).json(err);
    });
});

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;

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
  TodoModel.findByIdAndDelete(id)
    .then((deletedTodo) => res.json(deletedTodo))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the todo" });
    });
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Server is running!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
