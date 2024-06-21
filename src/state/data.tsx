import {v1} from "uuid";
import {TasksStateType, TodoListType} from "../AppWithReducers";

const todoListsId1 = v1();
const todoListsId2 = v1();

export const todoListsStartData = (): Array<TodoListType>  => {
    return [
        {id: todoListsId1, title: "What to learn", filter: "all"},
        {id: todoListsId2, title: "What to buy", filter: "all"},
    ]
};

// export const tasksStartData = (): TasksStateType => {
//     return {
//         [todoListsId1]: [
//             {id: v1(), title: "HTML + CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "React + TS", isDone: false},
//             {id: v1(), title: "Redux", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//         ],
//         [todoListsId2]: [
//             {id: v1(), title: "Book", isDone: true},
//             {id: v1(), title: "Mac", isDone: true},
//             {id: v1(), title: "Phone", isDone: false},
//             {id: v1(), title: "Watch", isDone: false},
//             {id: v1(), title: "Tablet", isDone: false},
//         ],
//     }
// }

export const tasksStartData: TasksStateType = {
    [todoListsId1]: [
        {id: v1(), title: "HTML + CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React + TS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListsId2]: [
        {id: v1(), title: "Book", isDone: true},
        {id: v1(), title: "Mac", isDone: true},
        {id: v1(), title: "Phone", isDone: false},
        {id: v1(), title: "Watch", isDone: false},
        {id: v1(), title: "Tablet", isDone: false},
    ],
}