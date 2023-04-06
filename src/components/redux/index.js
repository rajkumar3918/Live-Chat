import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./slice/roomSlice";

const store = configureStore({
    reducer:{
        RoomName: roomSlice.reducer,
        
    }
})

export default store;