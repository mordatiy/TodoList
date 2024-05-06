import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {Counter} from "./Counter";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
    id: string
    name: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //debugger

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

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj})
        }

    }

    function changeTaskTitle(newTitle: string, taskId: string, todoListId: string) {
        // alert("changeTaskTitle " + newTitle + " " + taskId + " " + todoListId );
        let tasks = tasksObj[todoListId];
        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        // setFilter(value);
        let todoList = todoLists.find((tl) => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value;
            setTodoList([...todoLists]);
        }

    }


    const todoListsId1 = v1();
    const todoListsId2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListsId1, name: "What to learn", filter: "all"},
        {id: todoListsId2, name: "What to buy", filter: "all"},
    ])

    let removeTodoList = (todoListId: string) => {
        // debugger
        // console.log(" removeTodoList"  + todoListId)
        let clearTodoList = todoLists.filter(tl => tl.id !== todoListId);
        setTodoList(clearTodoList);

        delete tasksObj[todoListId];
        setTasksObj({...tasksObj});
    }

    let changeTodoListName = (newTitle: string, todoListId: string) => {
        // let tasks = tasksObj[todoListId];
        let todoList = todoLists.find((tl) => tl.id === todoListId);
        if (todoList) {
            todoList.name = newTitle;
            setTodoList([...todoLists]);
        }
    }

    function addTodoList(title: string) {
        // let newTodoListID = v1();
        let newTodoList: TodoListType = {
            id: v1(),
            name: title,
            filter: "all"
        };
        setTodoList([newTodoList, ...todoLists]);
        setTasksObj({
            ...tasksObj,
            [newTodoList.id]: []
        })
    }

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
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

            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: "20px 20px"} }>
                    <AddItemForm addItem={addTodoList} itemLabel={"List Name"}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tdl) => {
                        let tasksForTodoList = tasksObj[tdl.id];
                        if (tdl.filter === "completed") {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                        }
                        if (tdl.filter === "active") {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                        }
                        // console.log(tasksForTodoList);

                        return <Grid>
                            <Paper elevation={3} style={ {padding: "20px"} }>
                                <TodoList key={tdl.id}
                                          id={tdl.id}
                                          title={tdl.name}
                                          tasks={tasksForTodoList}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          changeTaskTitle={changeTaskTitle}
                                          filter={tdl.filter}
                                          removeTodoList={removeTodoList}
                                          changeTodoListName={changeTodoListName}
                                />
                            </Paper>
                        </Grid>

                    })
                    }
                </Grid>

            </Container>

            {/*<Counter />*/}

        </div>
    );
}

export default App;
