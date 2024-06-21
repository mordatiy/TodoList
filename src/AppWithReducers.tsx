import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {Counter} from "./Counter";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {tasksStartData, todoListsStartData} from "./state/data";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// const startData: Array<TodoListType> = todoListsStartData();

function AppWithReducers() {
    // console.log("AppWithReducers")
    // Initialization todoLists
    let[todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, todoListsStartData());

    // Initialization Tasks
    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, tasksStartData);


    // << Tasks functions:
    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId);
        dispatchToTasksReducer(action);
    }

    function addTask(newTaskTitle: string, todoListId: string) {
        if (newTaskTitle.trim() !== "") {
            //const action = addTaskAC(newTaskTitle, todoListId);
            dispatchToTasksReducer(addTaskAC(newTaskTitle, todoListId));
        } else {}
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        // const action = changeTaskStatusAC(todoListId, taskId, isDone);
        dispatchToTasksReducer(changeTaskStatusAC(todoListId, taskId, isDone));
    }

    function changeTaskTitle(newTitle: string, taskId: string, todoListId: string) {
        //const action = changeTaskTitleAC(todoListId, taskId, newTitle);
        dispatchToTasksReducer(changeTaskTitleAC(todoListId, taskId, newTitle));
    }
    // end Tasks functions >>


    // << todoList functions
    let removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId);
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        // const action = changeTodoListFilterAC(todoListID, value);
        dispatchToTodoListsReducer(changeTodoListFilterAC(todoListID, value));
    }

    let changeTodoListName = (newTitle: string, todoListId: string) => {
        dispatchToTodoListsReducer(changeTodoListTitleAC(todoListId, newTitle));
    }
    // end todoList functions >>


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

                        return <Grid key={`wrap_todoid_${tdl.id}`}>
                            <Paper elevation={3} style={ {padding: "20px"} }>
                                <TodoList key={tdl.id}
                                          id={tdl.id}
                                          title={tdl.title}
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

export default AppWithReducers;
