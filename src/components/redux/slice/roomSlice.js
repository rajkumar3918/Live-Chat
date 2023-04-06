import {createSlice} from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room name",
    initialState:{
        value:"public-group",
        rooms:[]
    },
    reducers:{
        enterRoomName: (state, action)=>{
            state.value = action.payload;
        },
        createRoom: (state, action)=>{
            const name = action.payload;
            state.rooms.push(name);
            
        }
    }
})

export const {enterRoomName, createRoom} = roomSlice.actions;

export default roomSlice;