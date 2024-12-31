const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;