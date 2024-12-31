const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskModel = require("./model");
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://surendar:1234@cluster0.rdcv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/create", async (req, res) => {
  const { task } = req.body;

  try {
    const response = await taskModel.create({
      task: task,
    });

    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  try {
    const response = await taskModel.find();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.get("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await taskModel.findById(id);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const response = await taskModel.findByIdAndUpdate(
      id,
      { task: task },
      { new: true }
    );
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await taskModel.findByIdAndDelete(id);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000, () => console.log("server started"));
