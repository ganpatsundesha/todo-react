import React, { useEffect, useRef, useState } from 'react'
import './Css/Todo.css'
import { TodoItem } from './TodoItem';


let count = 0;
export const Todo = () => {

    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = (e) => {
        e.preventDefault();
        setTodos([...todos, { no: count++, text: inputRef.current.value, display: '' }])
        inputRef.current.value = '';
    }

    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todos")))
        //  [] to relode this useeffect on page relode
    }, [])

    useEffect(() => {
        // Hear i Use setTimeout because of i use 2 useEffect and i want to relode this useeffect after first one 
        setTimeout(() => {
            console.log(todos);
            localStorage.setItem("todos", JSON.stringify(todos))
        }, 100)
    }, [todos])

    return (
        <div className='todo'>
            <div className="todo-header">Todo List</div>
            <div className="todo-add">
                <form onSubmit={add}>
                    <input ref={inputRef} type="text" placeholder='add Your Todo Hear' className='todo-input' />
                    <input className="todo-add-btn" type="submit" value={"Add"} />
                </form>
            </div>
            <div className="todo-list">
                {todos.map((item, index) => {
                    return <TodoItem key={index} setTodos={setTodos} no={item.no} text={item.text} display={item.display} />
                })}
            </div>
        </div>
    )
}
