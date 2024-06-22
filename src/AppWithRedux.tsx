import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {
    console.log("AppWithRedux + dispatch")
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>( state => state.todoLists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)

    // Initialization todoLists
    // let[todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, todoListsStartData());

    // Initialization Tasks
    // let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, tasksStartData);

    //
    const dispatch = useDispatch();

    // << Tasks functions:
    function removeTask(id: string, todoListId: string) {
        // const action = removeTaskAC(id, todoListId);
        // dispatchToTasksReducer(action);
        dispatch(removeTaskAC(id, todoListId));
    }

    function addTask(newTaskTitle: string, todoListId: string) {
        if (newTaskTitle.trim() !== "") {
            //const action = addTaskAC(newTaskTitle, todoListId);
            // dispatchToTasksReducer(addTaskAC(newTaskTitle, todoListId));
            dispatch(addTaskAC(newTaskTitle, todoListId))
        } else {}
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone));
    }

    function changeTaskTitle(newTitle: string, taskId: string, todoListId: string) {
        //const action = changeTaskTitleAC(todoListId, taskId, newTitle);
        //dispatchToTasksReducer(changeTaskTitleAC(todoListId, taskId, newTitle));
        dispatch(changeTaskTitleAC(todoListId, taskId, newTitle));
    }
    // end Tasks functions >>


    // << todoList functions
    let removeTodoList = (todoListId: string) => {
        // const action = removeTodoListAC(todoListId);
        // dispatchToTasksReducer(action);
        // dispatchToTodoListsReducer(action);
        dispatch(removeTodoListAC(todoListId));
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatch(action)
        // dispatchToTasksReducer(action);
        // dispatchToTodoListsReducer(action);

    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        // const action = changeTodoListFilterAC(todoListID, value);
        dispatch(changeTodoListFilterAC(todoListID, value));
    }

    let changeTodoListName = (newTitle: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle));
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

export default AppWithRedux;
