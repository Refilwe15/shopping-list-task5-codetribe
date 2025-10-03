import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list : [] ,
}

const listSlice = createSlice({
    name : "list",
    initialState,
    reducers : {

        addList : (state,action) => {
            state.list.push(action.payload)
        },
        removeList : (state,action) => {

        },
        editList : (state,action) => {

        },


    }

});
export const {addList,removeList,editList} = movieSlice.actions;
export default listSlice.reducer;