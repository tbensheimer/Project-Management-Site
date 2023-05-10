import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Navbar from "./Navbar";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";

describe('With redux provider environment', () => {

    let initialState= {
        projects: [],
        completedProjects: [],
        user: {
            _id: 1,
            displayName: "Mario",
            profileUrl: "mario.png"
        },
        users: null
    };

const mockStore = configureStore();
let store

it('Should render navbar component correctly with user', async () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);

    const logoutBtn = screen.getByText('Logout');
    const btns = screen.getAllByRole('button');
    const dojoImg = screen.getByAltText('Dojo icon');

    expect(logoutBtn).toBeInTheDocument();
    expect(btns.length).toBe(1);
    expect(dojoImg).toBeInTheDocument();

})

it('Should render navbar without user correctly', async () => {
    initialState.user = null;

    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);

const signupLink = screen.getByText('Signup');
const loginLink = screen.getByText('Login');
const dojoImg = screen.getByAltText('Dojo icon');

expect(signupLink).toBeInTheDocument();
expect(loginLink).toBeInTheDocument();
expect(dojoImg).toBeInTheDocument();
})

});