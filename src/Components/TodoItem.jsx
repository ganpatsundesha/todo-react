import React from 'react'
import './Css/TodoItem.css'
import cross from './Assets/cross.png'
import not_tick from './Assets/not_tick.png'
import tick from './Assets/tick.png'

export const TodoItem = ({ no, display, text, setTodos }) => {

    const toggleTodo = (no) => {
        let data = JSON.parse(localStorage.getItem("todos"));
        for (let i = 0; i < data.length; i++) {
            if (data[i].no === no) {
                if (data[i].display === "") {
                    data[i].display = "task-done";
                }
                else {
                    data[i].display = "";
                }
                break;
            }
        };
        setTodos(data);
    }

    const randomNum = () => {
        
    }

    const removeTodo = (no) => {
        let data = JSON.parse(localStorage.getItem("todos"));
        data = data.filter((todo) => todo.no !== no);
        setTodos(data)
    }

    return (
        <div className='todoitems'>
            <div className={`todoitems-container ${display}`} onClick={() => { toggleTodo(no) }}>
                {display == "" ? <img src={not_tick} /> : <img src={tick} />}
                <div className="todoitems-text">{text}</div>
            </div>
            <img className='close-icon' src={cross} onClick={() => { removeTodo(no) }} />
        </div>
    )
}
