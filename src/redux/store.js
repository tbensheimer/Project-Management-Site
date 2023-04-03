import {createSlice, configureStore} from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        user: null,
        users: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    }
});

const store = configureStore({
    reducer: projectSlice.reducer
});

const {login, logout, setUsers} = projectSlice.actions;

//redux functions here

export {store, login, logout, setUsers}