import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name : "user",
    initialState : {name : 'kim', age : 20},
    reducers : {
        changeName(state) {
            state.name = 'park';
        },
        changeAge(state, action) {
            state.age += action.payload;
        }
    }
})

//state 변경함수들이 남음.
export let { changeName, changeAge } = user.actions;

export default user;