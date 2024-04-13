import React, {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
}

export function TodoList(props: PropsType) { // props = {title: "", tasks: {}}

    let [newTaskTitle, setTaskTitle] = useState<string>("");
    let [errorInput, setErrorInput] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onNewTitleKeyDownHandler = (e: KeyboardEvent) => {
        // debugger;
        if (e.key !== " ") {
            setErrorInput(null)
        }
        if (e.key === "Enter") {
            props.addTask(newTaskTitle, props.id);
            setTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setErrorInput("Field is required")
            return;
        }
        setErrorInput(null)
        props.addTask(newTaskTitle.trim(), props.id);
        setTaskTitle("")
    }

    const onClickAllHandler = () => { props.changeFilter("all", props.id) }
    const onClickActiveHandler = () => { props.changeFilter("active", props.id) }
    const onClickCompletedHandler = () => { props.changeFilter("completed", props.id) }
    const removeTodoList = () => { props.removeTodoList(props.id) }


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input type="text"
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onNewTitleKeyDownHandler}
                       className={errorInput ? "error" : ""}
                />
                <button onClick={addTask}>+
                </button>
                {errorInput && <div className={"error-message"}>{errorInput}</div>}
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map(item => {
                                const onRemoveHandler = () => { props.removeTask(item.id, props.id ) }
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(item.id, e.currentTarget.checked, props.id)
                                    //console.log(item.id + " " + e.currentTarget.checked)
                                }
                                return (<li key={item.id} className={ (item.isDone ? "is-done" : "") } >

                                    <input type={"checkbox"}
                                           checked={item.isDone}
                                           onChange={onChangeHandler}
                                    />
                                    {/*<span>{item.id}</span>*/}
                                    <span>{item.title}</span>
                                    <button onClick={onRemoveHandler}>x</button>
                                </li>)
                            }
                        )
                    }
                </ul>
            </div>

            <div>
                <button onClick={onClickAllHandler} className={ props.filter === "all" ? "active-filter" : "" } >All</button>
                <button onClick={onClickActiveHandler} className={ props.filter === "active" ? "active-filter" : "" } >Active</button>
                <button onClick={onClickCompletedHandler} className={ props.filter === "completed" ? "active-filter" : "" } >Completed</button>
            </div>
        </div>
    )
}