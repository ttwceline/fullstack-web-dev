const mongoose = require('mongoose');

// Define the schema
const TaskSchema = new mongoose.Schema({
  // The content of the task (required)
  text: { 
    type: String, 
    required: [true, 'Task text is required'],
    trim: true 
  },
  
  // The status of the task (default is incomplete)
  completed: { 
    type: Boolean, 
    default: false 
  },
  
  // Timestamp for when the task was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
module.exports = mongoose.model('Task', TaskSchema);