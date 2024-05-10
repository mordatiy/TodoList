import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";

// export type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todoListID: string,
    taskID: string,
}
export type Action2Type = {
    type: "2",
    title: string
}

type ActionTypes = RemoveTaskActionType | Action2Type

export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const task = state[action.todoListID];
            //const filteredTasks = task.filter( t => t.id != action.taskID);
            stateCopy[action.todoListID] = task.filter( t => t.id != action.taskID);
            return stateCopy;
        }
        case "2": {
            return {...state};
        }

        default:
            throw new Error("I don't understand action.type!")

    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todoListID, taskID }
}
export const addTodoListAC = (title: string): Action2Type => {
    return { type: "2", title: title }
}