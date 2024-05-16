import { createSlice } from "@reduxjs/toolkit";


export const Saltdata = createSlice({
    name: 'saltdata',
    initialState: [],
    reducers: {
        search_data(state, action){
            return action.payload.data.saltSuggestions || [];
        }
    }
})

export const { search_data } = Saltdata.actions;

export default Saltdata.reducer  