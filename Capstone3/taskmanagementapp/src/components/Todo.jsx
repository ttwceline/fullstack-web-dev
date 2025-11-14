import React from 'react'

// FIX: Receive handler functions (onComplete, onDelete)
const Todo = ({ text, todo, onComplete, onDelete }) => {
    
    // FIX: Call the prop handler instead of re-implementing state logic
    const deleteHandler = () => {
        onDelete(todo.id); 
    }

    // FIX: Call the prop handler instead of re-implementing state logic
    const completeHandler = () => {
        onComplete(todo.id);
    }

    return(
        <div className='todo'>
            <li className={`todo-item ${todo.completed ? 'completed' : ''} `}>{text}</li>
            <button onClick={completeHandler} className='complete-btn'>
                <i className='fas fa-check'></i>
            </button>
            <button onClick={deleteHandler} className='trash-btn'>
                <i className='fas fa-trash'></i>
            </button>
        </div>
    );
}

export default Todo;