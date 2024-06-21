import {
    addTodoListAC, changeTodoListFilterAC,
    ChangeTodoListFilterType, changeTodoListTitleAC,
    ChangeTodoListTitleType,
    removeTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

test('correct todolist should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ];
    // const endState = todoListsReducer(startState, { type:'REMOVE-TODOLIST', id: todoListId1});
    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('new todolist should be added', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const newListTitle = "New List Title";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ];
    // const endState = todoListsReducer(startState, { type:'ADD-TODOLIST', title: newListTitle});
    const endState = todoListsReducer(startState, addTodoListAC(newListTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newListTitle);
    expect(endState[0].filter).toBe("all");
});

test('change todolist name', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const newListTitle = "New List Title";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ];
    // const action:ChangeTodoListTitleType = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todoListId2,
    //     title: newListTitle
    // }
    // const endState = todoListsReducer(startState, action);
    const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListId2, newListTitle));


    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newListTitle);
});

test('correct todolist filter should be changed', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const newFilterValue: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ];
    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER' as const,
    //     id: todoListId2,
    //     filter: newFilterValue
    // }
    // const endState = todoListsReducer(startState, action);
    const endState = todoListsReducer(startState, changeTodoListFilterAC(todoListId2,newFilterValue));

    // expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilterValue);
});

