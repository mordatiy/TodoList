import React from "react";

type PropsType = {
    title: string
}

export function TodoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type={"checkbox"} checked={true}/>HTML + CSS</li>
                <li><input type={"checkbox"} checked={true}/>JS</li>
                <li><input type={"checkbox"} checked={false}/>React + TS</li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}