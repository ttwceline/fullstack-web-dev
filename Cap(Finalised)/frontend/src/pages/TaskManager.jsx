// pages/TaskManager.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom" 

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const navigate = useNavigate();

  // --- API FUNCTIONS ---

  const getTasks = async () => {
    const jwt = localStorage.getItem("jwt")
    try{
      const response = await fetch("http://localhost:3000/task", { 
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
      if(!response.ok) {
         // Clear JWT and redirect on unauthorized/bad response
         localStorage.removeItem("jwt"); 
         navigate("/"); 
         return;
      }
      const result = await response.json()
      setTasks(result)
    }catch(error){
      console.error("Error making API call:", error) 
      navigate("/"); 
    }
  }

  const addTasks = async () => {
    const jwt = localStorage.getItem("jwt")
    try{
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          'Content-Type': `application/json`,
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          title: taskName,
          deadline: taskDeadline
        })
      })
      
      if (response.ok) {
          // Success: REFRESH THE TASK LIST
          await getTasks(); 
      } else {
          console.error("Failed to add task on server.");
      }
    }catch(error){
      console.error("Error making Add Task call:", error)
    }
  }

  const updateTask = async (taskToUpdate) => {
    const jwt = localStorage.getItem("jwt")
    try{
      const response = await fetch(`http://localhost:3000/task/${taskToUpdate._id}`, { 
        method: "PUT",
        headers: {
          'Content-Type': `application/json`,
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          completed: taskToUpdate.completed
        })
      })
      
      if (response.ok) {
          // Success: REFRESH THE TASK LIST
          await getTasks(); 
      } else {
          console.error("Failed to update task on server.");
      }
    }catch(error){
      console.error("Error making Update Task call:", error)
    }
  }

  const deleteTask = async (task) => {
    const jwt = localStorage.getItem("jwt")
    try{
      const delUrl = `http://localhost:3000/task/${task._id}` 
      const response = await fetch(delUrl, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
      
      if(response.ok){
        // Success: REFRESH THE TASK LIST
        await getTasks(); 
      } else {
         console.error("Failed to delete task on server.");
      }
    }catch(error){
      console.error("Error making Delete Task call:", error)
    }
  }

  // --- LIFECYCLE & HANDLERS ---
  
  useEffect(() => {
    getTasks()
  }, []);
  
  // NOTE: Removed local storage saving logic as we rely on the API now.
  // useEffect(() => { localStorage.setItem("tasks", JSON.stringify(tasks)); }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (taskName.trim() && taskDeadline) {
      addTasks(); 
      setTaskName("");
      setTaskDeadline("");
    }
  };

  const toggleTask = (task, index) => {
    const taskToUpdate = { ...task, completed: !task.completed };
    updateTask(taskToUpdate);
    
    // OPTIMISTIC UI: Update local state immediately for a snappier feel
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (task) => {
    deleteTask(task)
    
    // OPTIMISTIC UI: Remove locally while server call is in progress
    setTasks(tasks.filter(t => t._id !== task._id));
  };
  
  const textboxStyle = {padding: 10, margin: 20}

  // --- RENDERING ---
  return (
    <div className="task-manager-container">
      <h2 className="app-title">Task Management Application</h2>
      <form onSubmit={addTask} className="task-form">
        <input
          type="text" // FIXED: Changed type="taskName" to type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add new task"
          style={textboxStyle}
          required
        />
        <input 
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            placeholder="Deadline"
            style={textboxStyle}
            required
        />
        <button type="submit" style={{padding: 7, color:"#fa0068ff"}}>Add</button>
      </form>

      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={task._id || index}>
              <input
                type="checkbox"
                checked={task.completed}
                // PASSED TASK OBJECT AND INDEX
                onChange={() => toggleTask(task, index)} 
                style={textboxStyle}
              />
              <span style={{ 
                textDecoration: task.completed ? "line-through" : "",
                // Fixed date comparison by setting time to midnight
                color: (!task.completed && new Date(task.deadline).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) ? "red" : "inherit",
                padding: 5,
                margin: 5,
              }}>
                {task.title}, {
                  // INVALID DATE CHECKING
                  new Date(task.deadline) instanceof Date && !isNaN(new Date(task.deadline))
                    ? new Date(task.deadline).toLocaleDateString('en-GB') 
                    : "Invalid Date"
                }
              </span>
              <button onClick={() => removeTask(task)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 
// <-- END OF FILE: The extra brace '}' is removed here.