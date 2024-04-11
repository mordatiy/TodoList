import React from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: Function
    changeFilter: Function
}

export function TodoList(props: PropsType) { // props = {title: "", tasks: {}}
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map(item => <li>
                                <input type={"checkbox"} checked={item.isDone}/>
                                <span>{item.id}</span>
                                <span>{item.title}</span>
                                <button onClick={ () => { props.removeTask(item.id) } }>x</button>
                            </li>
                        )
                    }
                </ul>
            </div>

            <div>
                <button onClick={ () => props.changeFilter("all") } >All</button>
                <button onClick={ () => props.changeFilter("active") } >Active</button>
                <button onClick={ () => props.changeFilter("completed") } >Completed</button>
            </div>
        </div>
    )
}