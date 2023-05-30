import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Login from "./Login"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";

describe('With redux provider environment', () => {

    fetchMock.enableMocks();

    beforeEach(() => {
        fetch.mockClear();
    })

    let initialState= {
        projects: [],
        completedProjects: [],
        user: null,
        users: [
            {
                _id: 1,
                displayName: "Mario",
                profileUrl: "mario.png",
                email: "mario@gmailcom",
                isOnline: true
            },
            {
                _id: 2, 
                displayName: "Luigi",
                profileUrl: "luigi.png",
                email: "luigi@gmail.com",
                isOnline: false
            },
            {
                _id: 3,
                displayName: "Bowser",
                profileUrl: "bowser.png",
                email: "bowser@gmail.com",
                password: "bowser123",
                isOnline: true
            }
        ]
    };

const mockStore = configureStore();
let store

it('Should render Login component correctly', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Login /></BrowserRouter></Provider>);

    const email = screen.getByPlaceholderText("Email...");
    const password = screen.getByPlaceholderText("Password...");

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
})

it('Should render profile pic', async () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Login /></BrowserRouter></Provider>);

    const email = screen.getByPlaceholderText("Email...");
    const password = screen.getByPlaceholderText("Password...");

    userEvent.type(email, "bowser@gmail.com");
    userEvent.type(password, "bowser123");

    expect(await screen.findByAltText('user avatar')).toBeInTheDocument();
})

});