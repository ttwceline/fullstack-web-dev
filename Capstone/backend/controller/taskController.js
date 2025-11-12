import Task from "../models/taskModel.js";

//CREATE A NEW TASK
export const createTask = async (req, res) => {
    try {
        let { title, description, priority, dueDate } = req.body;
        const owner = req.user._id;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        // Normalize priority
        if (priority) priority = priority.toLowerCase();

        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
            owner
        });

        const saved = await newTask.save();
        res.status(201).json({ success: true, message: "Task created successfully", task: saved });

    } catch (error) {
        console.error("Task creation error:", error);
        res.status(400).json({
            success: false,
            message: "Error creating task",
            error: error.message || error
        });
    }
};

//GET ALL TASK FOR LOGGED IN USER
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id }).sort({ createdAt: -1 });
        res.json({success: true, tasks});
    } catch (error) {
        res.status(500).json({success: false, message: "Error fetching tasks", error });
    }
}

//GET SINGLE TASK BY ID belonging to LOGGED IN USER
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).json({success: false, message: "Task not found" });
        }
        res.json({success: true, task });
    } catch (error) {
        res.status(500).json({success: false, message: "Error fetching task", error });
    }
}

//UPDATE A TASK BY ID belonging to LOGGED IN USER
export const updateTask = async (req, res) => {
    try {
        const data = {...req.body};
        if(data.completed !== undefined){
            data.completed = data.completed === 'Yes' || data.completed === true;
        }
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            data,
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({success: false, message: "Task not found" });
        }
        res.json({success: true, message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({success: false, message: "Error updating task", error });
    }
}

//DELETE A TASK BY ID belonging to LOGGED IN USER
export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!deletedTask) {
            return res.status(404).json({success: false, message: "Task not found or not yours!" });
        }
        res.json({success: true, message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        res.status(500).json({success: false, message: "Error deleting task", error });
    }
}
