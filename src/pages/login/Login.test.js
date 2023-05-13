import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Login from "./Login"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

describe('With redux provider environment', () => {

    const rootURL = window.location.href;

    fetchMock.enableMocks();

    beforeEach(() => {
        fetch.mockClear();
    })

    let initialState= {
        projects: [],
        completedProjects: [],
        user: {
            _id: 1,
            displayName: "Mario",
            profileUrl: "mario.png",
            email: "mario@gmail.com"
        },
        users: [
            {
                _id: 1,
                displayName: "Mario",
                profileUrl: "mario.png",
                isOnline: true
            },
            {
                _id: 2, 
                displayName: "Luigi",
                profileUrl: "luigi.png",
                isOnline: false
            },
            {
                _id: 3,
                displayName: "Bowser",
                profileUrl: "bowser.png",
                email: "bowser@gmail.com",
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

    // fireEvent.change(email, { target: { value: "bowser@gmail.com"}});

    // const profilePic = screen.getByAltText("user avatar");

    // expect(profilePic).toBeInTheDocument();
    // expect(profilePic.src).toBe("bowser.png");
})

});