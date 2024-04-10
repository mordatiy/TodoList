import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


function App() {
    //debugger
    let tasks1: Array<TaskType> = [
        { id :1, title: "HTML + CSS", isDone: true },
        { id :2, title: "JS", isDone: true },
        { id :1, title: "React + TS", isDone: false },
    ]
    let tasks2: Array<TaskType> = [
        { id :1, title: "The Matrix", isDone: false },
        { id :2, title: "1+1", isDone: false },
        { id :1, title: "The Godfather", isDone: false },
    ]

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasks1}/>
            <TodoList title={"Movies"} tasks={tasks2}/>
            {/*<TodoList title={"Songs"} />*/}
        </div>
    );
}

export default App;
