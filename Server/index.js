const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");
require("dotenv").config();

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://13.61.1.235:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todolist_db";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

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
    .then((deletedTodo) => {
      console.log("Deleting todo with ID:", id);
      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(deletedTodo);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the todo" });
    });
});

app.post("/add", (req, res) => {
  const { task } = req.body; // Destructure directly from req.body
  if (!task) {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  TodoModel.create({ task })
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error adding task:", err);
      res.status(500).json({ error: "Error adding task" });
    });
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Server is running!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
