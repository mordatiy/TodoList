import {TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC, todoListsReducer} from "./todolists-reducer";


test('correct task should be REMOVED from correct array', () => {
    const startState: TasksStateType = {
        "todoListsId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListsId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Mac", isDone: true},
            {id: "3", title: "Phone", isDone: false},
        ],
    };

    const action = removeTaskAC("2", "todoListsId2");
    const endState = tasksReducer(startState, action);

    expect(endState['todoListsId1'].length).toBe(3);
    expect(endState['todoListsId2'].length).toBe(2);
    expect(endState['todoListsId2'].every( t => t.id != "2")).toBeTruthy();
});

test('correct task should be ADDED from correct array', () => {
    const startState: TasksStateType = {
        "todoListsId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListsId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Mac", isDone: true},
            {id: "3", title: "Phone", isDone: false},
        ],
    };

    const action = addTaskAC("Watch", "todoListsId2");
    const endState = tasksReducer(startState, action);

    expect(endState['todoListsId1'].length).toBe(3);
    expect(endState['todoListsId2'].length).toBe(4);
    expect(endState['todoListsId2'][0].id).toBeDefined();
    expect(endState['todoListsId2'][0].title).toBe("Watch");
    expect(endState['todoListsId2'][0].isDone).toBe(false);
});


test('STATUS of specific task should be changed', () => {
    const startState: TasksStateType = {
        "todoListsId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListsId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Mac", isDone: true},
            {id: "3", title: "Phone", isDone: false},
        ],
    };

    const action = changeTaskStatusAC("todoListsId2", "1", false);
    const endState = tasksReducer(startState, action);

    //expect(endState['todoListsId1'].length).toBe(3);
    expect(endState['todoListsId2'].length).toBe(3);
    expect(endState['todoListsId2'][0].isDone).toBe(false);
    expect(endState['todoListsId2'][1].isDone).toBe(true);
    expect(endState['todoListsId2'][2].isDone).toBe(false);
});


test('TITLE of specific task should be changed', () => {
    const startState: TasksStateType = {
        "todoListsId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListsId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Mac", isDone: true},
            {id: "3", title: "Phone", isDone: false},
        ],
    };

    const action = changeTaskTitleAC("todoListsId2", "1", "Pencil");
    const endState = tasksReducer(startState, action);

    expect(endState['todoListsId1'][0].title).toBe("HTML");
    expect(endState['todoListsId2'][0].title).toBe("Pencil");
    expect(endState['todoListsId2'][1].title).toBe("Mac");
});


test('new property with new array should be added when new todolist added', () => {
    const startTaskState: TasksStateType = {
        "todoListsId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListsId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Mac", isDone: true},
            {id: "3", title: "Phone", isDone: false},
        ],
    };
    const startTodoListState: Array<TodoListType> = [
        {id: "todoListsId1", title: "What to learn", filter: "all"},
        {id: "todoListsId2", title: "What to buy", filter: "all"}
    ];

    const action = addTodoListAC("title no matter");
    const endTodoListState = todoListsReducer(startTodoListState, action);
    const endTaskState = tasksReducer(startTaskState, action);

    const keys = Object.keys(endTodoListState);
    // console.log(endTodoListState[0].id);
    // console.log(endTodoListState[1].id);
    // console.log(endTodoListState[2].id);
    // console.log(action.id)
    // console.log(endTaskState)
    // expect(keys.length).toBe(2);

    expect(keys.length).toBe(3)
    expect(endTodoListState[2].id).toBe(action.id);
    expect(endTaskState[action.id]).toStrictEqual([]);
});


test('property with todoListsId should be removed', () => {
    const startTaskState: TasksStateType = {
        "todoListsId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListsId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Mac", isDone: true},
            {id: "3", title: "Phone", isDone: false},
        ],
    };

    const action = removeTodoListAC("todoListsId1");
    const endTaskState = tasksReducer(startTaskState, action);

    const keys = Object.keys(endTaskState);
    // console.log(endTaskState);

    expect(keys.length).toBe(1);
    // expect(endTaskState["todoListsId1"]).not.toBeDefined();
    expect(endTaskState["todoListsId1"]).toBeUndefined()

});