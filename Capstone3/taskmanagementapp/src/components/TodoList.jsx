import React from "react";      
import Todo from "./Todo";

// FIX: Receive handler functions instead of state setters
const TodoList = ({ filteredTodos, onComplete, onDelete }) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {filteredTodos.map((todo) => (
                    <Todo
                    key={todo.id}
                    text={todo.text}
                    todo={todo}
                    // FIX: Pass the handlers down
                    onComplete={onComplete}
                    onDelete={onDelete}
                    />      
                ))} 
            </ul>
        </div>
    );
};
export default TodoList;