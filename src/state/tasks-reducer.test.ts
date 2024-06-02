import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";


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