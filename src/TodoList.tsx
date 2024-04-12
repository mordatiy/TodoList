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
}

export function TodoList(props: PropsType) { // props = {title: "", tasks: {}}

    let [newTaskTitle, setTaskTitle] = useState<string>("");
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onNewTitleKeyDownHandler = (e: KeyboardEvent) => {
        //debugger;
        if (e.key === "Enter") {
            props.addTask(newTaskTitle);
            setTaskTitle("")
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setTaskTitle("")
    }
    const onClickAllHandler = () => {
        props.changeFilter("all")
    }
    const onClickActiveHandler = () => {
        props.changeFilter("active")
    }
    const onClickCompletedHandler = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onNewTitleKeyDownHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map(item => {
                                const onRemoveHandler = () => {
                                    props.removeTask(item.id)
                                }
                                return (<li key={item.id}>

                                    <input type={"checkbox"} checked={item.isDone}/>
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
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}