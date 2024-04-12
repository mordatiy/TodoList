import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {Counter} from "./Counter";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    //debugger
    let initTasks1: Array<TaskType> = [
        { id : v1(), title: "HTML + CSS", isDone: true },
        { id : v1(), title: "JS", isDone: true },
        { id : v1(), title: "React + TS", isDone: false },
        { id : v1(), title: "Redux", isDone: false },
        { id : v1(), title: "GraphQL", isDone: false },
    ]
    console.log()
    let [tasks, setTasks] = useState<Array<TaskType>>(initTasks1);
    let [filer, setFilter] = useState<FilterValuesType>("all");

    // let tasks2: Array<TaskType> = [
    //     { id :1, title: "The Matrix", isDone: false },
    //     { id :2, title: "1+1", isDone: false },
    //     { id :1, title: "The Godfather", isDone: false },
    // ]


    function removeTask(id: string) {
        tasks = tasks.filter( item => item.id !== id);
        setTasks(tasks)
        // console.log(initTasks1)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filer === "completed") {
        tasksForTodoList = tasks.filter( t => t.isDone === true )
    }
    if (filer === "active") {
        tasksForTodoList = tasks.filter( t => t.isDone === false )
    }


    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
            {/*<TodoList title={"Movies"} tasks={tasks2}/>*/}
            {/*<TodoList title={"Songs"} />*/}
            <Counter />

        </div>
    );
}

export default App;
