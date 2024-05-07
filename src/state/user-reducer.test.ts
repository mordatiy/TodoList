import {userReducer} from "./user-reducer";

test('user reducer increment age only', () => {
    const startState = { age: 30, childrenCount: 2, name: 'Dima' };
    const endState = userReducer(startState, { type:'INCREMENT-AGE' });

    expect(endState.age).toBe(31);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer increment childrenCount only', () => {
    const startState = { age: 30, childrenCount: 2, name: 'Dima' };
    const endState = userReducer(startState, { type:'INCREMENT-CHILDREN-COUNT' });

    expect(endState.age).toBe(30);
    expect(endState.childrenCount).toBe(3);
})