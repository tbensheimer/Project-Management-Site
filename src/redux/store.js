import {createSlice, configureStore} from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        project: [],
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

const store = configureStore({
    reducer: projectSlice.reducer
});

const {login, logout} = projectSlice.actions;

//redux functions here

export {store, login, logout}