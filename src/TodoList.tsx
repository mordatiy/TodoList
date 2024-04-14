import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (value: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    changeTodoListName: (newTitle: string, id: string) => void
    changeTaskTitle: (newTitle: string, taskId: string, todoListId: string) => void
}

export function TodoList(props: PropsType) { // props = {title: "", tasks: {}}

    const onClickAllHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onClickActiveHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onClickCompletedHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListName = (newTitle:string) => {
        // alert(newTitle)
        props.changeTodoListName(newTitle, props.id)
    }

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} onChange={changeTodoListName}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <ul>
                    {
                        props.tasks.map(item => {
                                const onRemoveHandler = () => {
                                    props.removeTask(item.id, props.id)
                                }
                                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(item.id, e.currentTarget.checked, props.id)
                                    //console.log(item.id + " " + e.currentTarget.checked)
                                }
                                const onChangeTitleHandler = (newTitle: string) => {
                                    // alert("onChangeTitleHandler " + newTitle)
                                    props.changeTaskTitle(newTitle, item.id, props.id)
                                }
                                return (<li key={item.id} className={(item.isDone ? "is-done" : "")}>

                                    <input type={"checkbox"}
                                           checked={item.isDone}
                                           onChange={onChangeStatusHandler}
                                    />
                                    {/*<span>{item.id}</span>*/}
                                    <EditableSpan title={item.title} onChange={onChangeTitleHandler}/>
                                    <button onClick={onRemoveHandler}>x</button>
                                </li>)
                            }
                        )
                    }
                </ul>
            </div>
            <div>
                <button onClick={onClickAllHandler} className={props.filter === "all" ? "active-filter" : ""}>All
                </button>
                <button onClick={onClickActiveHandler}
                        className={props.filter === "active" ? "active-filter" : ""}>Active
                </button>
                <button onClick={onClickCompletedHandler}
                        className={props.filter === "completed" ? "active-filter" : ""}>Completed
                </button>
            </div>
        </div>
    )
}

