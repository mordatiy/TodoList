import React, {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (value: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (value: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
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
            props.addTask(newTaskTitle);
            setTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setErrorInput("Field is required")
            return;
        }
        setErrorInput(null)
        props.addTask(newTaskTitle.trim());
        setTaskTitle("")
    }

    const onClickAllHandler = () => { props.changeFilter("all") }
    const onClickActiveHandler = () => { props.changeFilter("active") }
    const onClickCompletedHandler = () => { props.changeFilter("completed") }



    return (
        <div>
            <h3>{props.title}</h3>
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
                                const onRemoveHandler = () => { props.removeTask(item.id) }
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(item.id, e.currentTarget.checked)
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