import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodoList";

export type TaskPropType = {
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string, todoListId: string) => void
    itemTask: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.itemTask.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.itemTask.id, e.currentTarget.checked, props.todolistId)
        //console.log(item.id + " " + e.currentTarget.checked)
    }
    const onChangeTitleHandler = useCallback( (newTitle: string) => {
        props.changeTaskTitle(newTitle, props.itemTask.id, props.todolistId)
    }, [props.itemTask.id,props. todolistId, props.changeTaskTitle]);

    return (<li key={props.itemTask.id} className={(props.itemTask.isDone ? "is-done" : "")}>

        <Checkbox checked={props.itemTask.isDone}
                  onChange={onChangeStatusHandler}
        />


        <EditableSpan title={props.itemTask.title} onChange={onChangeTitleHandler}/>

        <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <DeleteIcon/>
        </IconButton>
    </li>)
});