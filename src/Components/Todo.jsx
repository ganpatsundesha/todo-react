import React, { useEffect, useRef, useState } from 'react'
import './Css/Todo.css'
import { TodoItem } from './TodoItem';


let count;
export const Todo = () => {

    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = (e) => {
        e.preventDefault();

        count = Math.floor(Math.random() * 10000 + 1);

        const isUnique = todos.some((todo) => {
            return todo.id === count
        });

        if (isUnique) {
            return add(e);
        }

        if ((inputRef.current.value).trim() == '') {
            alert("Please Add Todo")
        }
        else {
            setTodos([...todos, { id: count, text: inputRef.current.value, display: '' }])
            inputRef.current.value = '';
        }
    }

    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todos")));
        //  [] to relode this useeffect on page relode
    }, [])

    useEffect(() => {
        // Hear i Use setTimeout because of i use 2 useEffect and i want to relode this useeffect after first one 
        setTimeout(() => {
            localStorage.setItem("todos", JSON.stringify(todos))
        }, 100)
    }, [todos])

    return (
        <div className='todo'>
            <div className="todo-header">Todo List</div>
            <div className="todo-add">
                <form onSubmit={add}>
                    <input ref={inputRef} type="text" placeholder='Add You Todo' className='todo-input' />
                    <input className="todo-add-btn" type="submit" value={"Add"} />
                </form>
            </div>
            <div className="todo-list">
                {todos.map((item, index) => {
                    return <TodoItem key={index} setTodos={setTodos} id={item.id} text={item.text} display={item.display} />
                })}
            </div>
        </div>
    )
}
