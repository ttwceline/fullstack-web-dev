import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
// FIX: Import Navigate for the root route redirect
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './components/Login';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // FUNCTION TO LOAD TODOS FROM LOCAL STORAGE
  const getLocalTodos = useCallback(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // 1. useEffect to LOAD DATA
  useEffect(() => {
    getLocalTodos();
  }, [getLocalTodos]);

  // MEMOIZED FUNCTION to filter the todos list
  const filterHandler = useCallback(() => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [status, todos]);

  // MEMOIZED FUNCTION to save the todos list
  const saveLocalTodos = useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 2. useEffect to RUN FILTERING
  useEffect(() => {
    filterHandler();
  }, [todos, status, filterHandler]);

  // 3. useEffect to RUN SAVING
  useEffect(() => {
    saveLocalTodos();
  }, [todos, saveLocalTodos]);

  // --- HANDLERS (Central State Logic) ---
  
  const completeHandler = (todoId) => {
    setTodos(todos.map((item) => {
        if(item.id === todoId){
            return {
                ...item, completed: !item.completed
            };
        }
        return item;
    }));
  };

  const deleteHandler = (todoId) => {
     setTodos(todos.filter(el => el.id !== todoId));
  };


  return (
    <Routes>
      {/* FIX: Redirects the root path to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} /> 
      
      <Route path="/login" element={<Login />} />
      <Route
        path="/form"
        element={
          <div className="task-management-app">
            <Form
              inputText={inputText}
              todos={todos}
              setTodos={setTodos}
              setInputText={setInputText}
              setStatus={setStatus}
            />
            <TodoList
              filteredTodos={filteredTodos}
              onComplete={completeHandler}
              onDelete={deleteHandler}
            />
          </div>
        }
      />
    </Routes>
  );
}

export default App;