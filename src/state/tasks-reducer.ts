import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";

// export type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todoListID: string
    taskID: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    todoListID: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todoListID: string
    taskID: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todoListID: string
    taskID: string
    title: string
}

type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType;

export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const task = state[action.todoListID];
            //const filteredTasks = task.filter( t => t.id != action.taskID);
            stateCopy[action.todoListID] = task.filter( t => t.id != action.taskID);
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state};
            // console.log(stateCopy);
            if (action.title.trim() !== "") {
                const tasks = state[action.todoListID];
                const newTask = {id: v1(), title: action.title, isDone: false};
                stateCopy[action.todoListID] = [newTask, ...tasks];
            } else {}
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state};
            const tasks = state[action.todoListID];
            const task = tasks.find((t) => t.id === action.taskID);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};
            const tasks = state[action.todoListID];
            const task = tasks.find((t) => t.id === action.taskID);
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }

        default:
            throw new Error("I don't understand action.type!")

    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todoListID, taskID }
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return { type: "ADD-TASK", todoListID, title }
}
export const changeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", todoListID, taskID, isDone }
}
export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", todoListID, taskID, title }
}