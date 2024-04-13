import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {Counter} from "./Counter";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
    id: string
    name: string
    filter: FilterValuesType
}


function App() {
    //debugger
    // let initTasks1: Array<TaskType> = [
    //     {id: v1(), title: "HTML + CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React + TS", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]
    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML + CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React + TS", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: string, todoListId: string) {
        tasksObj[todoListId] = tasksObj[todoListId].filter(item => item.id !== id);
        setTasksObj({...tasksObj})
        // console.log(initTasks1)
    }

    function addTask(newTaskTitle: string, todoListId: string) {
        if (newTaskTitle.trim() !== "") {
            let newTask = {id: v1(), title: newTaskTitle, isDone: false};
            let tasks = tasksObj[todoListId];
            tasksObj[todoListId] = [newTask, ...tasks];
            setTasksObj({...tasksObj});
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj})
        }

    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        // setFilter(value);
        let todoList = todoLists.find( (tl) =>  tl.id === todoListID)
        if (todoList) {
            todoList.filter = value;
            setTodoList([...todoLists]);
        }

    }

    const todoListsId1 = v1();
    const todoListsId2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListsId1, name: "What to learn", filter: "all"},
        {id: todoListsId2, name: "What to learn", filter: "completed"},
    ])

    let [tasksObj, setTasksObj] = useState({
        [todoListsId1]: [
            {id: v1(), title: "HTML + CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React + TS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Mac", isDone: true},
            {id: v1(), title: "Phone", isDone: false},
            {id: v1(), title: "Watch", isDone: false},
            {id: v1(), title: "Tablet", isDone: false},
        ],

    })



    return (

        <div className="App">
            {todoLists.map((tdl) => {
                let tasksForTodoList = tasksObj[tdl.id];
                if (tdl.filter === "completed") {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                }
                if (tdl.filter === "active") {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                }
                // console.log(tasksForTodoList);

                return <TodoList key={tdl.id}
                                 id={tdl.id}
                                 title={tdl.name}
                                 tasks={tasksForTodoList}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={tdl.filter}
                />

            })
            }

            {/*<Counter />*/}

        </div>
    );
}

export default App;
