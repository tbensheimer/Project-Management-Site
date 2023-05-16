import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Signup from "./Signup";
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
        user: null,
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

it('Should render Signup component correctly', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Signup /></BrowserRouter></Provider>);

    const email = screen.getByPlaceholderText("Email...");
    const password = screen.getByPlaceholderText("Password...");
    const displayName = screen.getByPlaceholderText('Display Name...');
    const profilePic = screen.getByPlaceholderText('Profile Pic...');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(displayName).toBeInTheDocument();
    expect(profilePic).toBeInTheDocument();

})

});