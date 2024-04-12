import React, {useState} from "react";
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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={newTaskTitle}
                       onChange={(e) => {
                           setTaskTitle(e.currentTarget.value)
                       }}
                       onKeyDown={ (e) => {
                           // debugger
                           if (e.key === "Enter") {
                               props.addTask(newTaskTitle);
                               setTaskTitle("")
                           }
                       } }
                />
                <button onClick={() => {
                    props.addTask(newTaskTitle);
                    setTaskTitle("")
                }}>+
                </button>
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map(item => <li key={item.id}>
                                <input type={"checkbox"} checked={item.isDone}/>
                                {/*<span>{item.id}</span>*/}
                                <span>{item.title}</span>
                                <button onClick={() => {
                                    props.removeTask(item.id)
                                }}>x
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>

            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}