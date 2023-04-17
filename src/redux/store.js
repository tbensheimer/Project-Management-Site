import {createSlice, configureStore} from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        completedProjects: [],
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
        },
        setOnline: (state, action) => {
            state.users = state.users.map(user => {
                if(user.email === action.payload) {
                    return {...user, isOnline: true};
                }
                return user;
            })
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setCompletedProjects: (state, action) => {
            state.completedProjects = action.payload;
        },
        addProject: (state, action) => {
            state.projects = [...state.projects, action.payload];
        },
        removeCompleteProject: (state, action) => {
            const index = state.projects.findIndex(project => project._id === action.payload._id);

            state.projects.splice(index, 1);

            state.completedProjects = [...state.completedProjects, action.payload];
        }
    }
});

const store = configureStore({
    reducer: projectSlice.reducer
});

const {login, logout, setUsers, setOnline, setProjects, setCompletedProjects, addProject, removeCompleteProject} = projectSlice.actions;

//redux functions here

export {store, login, logout, setUsers, setOnline, setProjects, setCompletedProjects, addProject, removeCompleteProject}