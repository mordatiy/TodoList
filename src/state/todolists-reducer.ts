import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";
import {todoListsStartData} from "./data";

// export type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTodoListType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodoListType = {
    type: "ADD-TODOLIST",
    title: string
    id: string
}
export type ChangeTodoListTitleType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}
export type ChangeTodoListFilterType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}

type ActionTypes = RemoveTodoListType | AddTodoListType | ChangeTodoListTitleType | ChangeTodoListFilterType

const initialState: Array<TodoListType> = todoListsStartData();

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionTypes): Array<TodoListType> => {
    // debugger;
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD-TODOLIST": {
            return [
                {
                    id: action.id,
                    title: action.title,
                    filter: "all"
                },
                ...state,
            ];

        }
        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find((tl) => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find((tl) => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }

        default:
        //throw new Error("I don't understand action.type!")
        return state;
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListType => {
    return { type: "REMOVE-TODOLIST", id: todoListID }
}
export const addTodoListAC = (title: string): AddTodoListType => {
    return { type: "ADD-TODOLIST", title: title, id: v1()}
}
export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleType => {
    return { type: "CHANGE-TODOLIST-TITLE", id: todoListID, title: title}
}
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodoListFilterType => {
    return { type: "CHANGE-TODOLIST-FILTER", id: todoListID, filter: filter }
}