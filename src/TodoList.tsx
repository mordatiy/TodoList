import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (value: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    changeTodoListName: (newTitle: string, id: string) => void
}

export const TodoList = React.memo(function TodoList(props: PropsType) { // props = {title: "", tasks: {}}
    console.log("TodoList is called")

    const onClickAllHandler = useCallback( () => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id] );
    const onClickActiveHandler =  useCallback( () => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id] );
    const onClickCompletedHandler = useCallback( () => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id] );

    
    const addTask = useCallback( (title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id] )
    // const addTask = (title: string) => {
    //     props.addTask(title, props.id)
    // }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListName = useCallback( (newTitle:string) => {
        // alert(newTitle)
        props.changeTodoListName(newTitle, props.id)
    }, [props.id, props.changeTodoListName] )

    // filtering:
    let tasksForTodoList = props.tasks;

    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} onChange={changeTodoListName}/>
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} itemLabel={"Task Name"}/>
            <div>
                <ul className={"task-list"}>
                    {
                        tasksForTodoList.map(item => {
                            return <Task key={item.id}
                                         itemTask={item}
                                         removeTask={props.removeTask}
                                         changeTaskTitle={props.changeTaskTitle}
                                         changeTaskStatus={props.changeTaskStatus}
                                         todolistId={props.id}
                                    />
                        })
                    }
                </ul>
            </div>
            <div>
                <Button onClick={onClickAllHandler}
                        color={"inherit"}
                        variant={props.filter === "all" ? "contained" : "text"}
                        className={props.filter === "all" ? "active-filter" : ""}>All
                </Button>
                <Button onClick={onClickActiveHandler}
                        color={"primary"}
                        variant={props.filter === "active" ? "contained" : "text"}
                        className={props.filter === "active" ? "active-filter" : ""}>Active
                </Button>
                <Button onClick={onClickCompletedHandler}
                        color={"secondary"}
                        variant={props.filter === "completed" ? "contained" : "text"}
                        className={props.filter === "completed" ? "active-filter" : ""}>Completed
                </Button>
            </div>
        </div>
    )
} );

