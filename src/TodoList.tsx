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
            {/*<ul>*/
            }


            {/*    <li><input type={"checkbox"} checked={props.tasks[0].isDone}/>{props.tasks[0].title}</li>*/
            }
            {/*    <li><input type={"checkbox"} checked={props.tasks[1].isDone}/>{props.tasks[1].title}</li>*/
            }
            {/*    <li><input type={"checkbox"} checked={props.tasks[2].isDone}/>{props.tasks[2].title}</li>*/
            }
            {/*</ul>*/
            }
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}