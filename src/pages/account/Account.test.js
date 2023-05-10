import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Account from "./Account";
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
                isOnline: true
            }
        ]
    };

const mockStore = configureStore();
let store

it('Should render Account component correctly with user data', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Account /></BrowserRouter></Provider>);

    const email = screen.getByPlaceholderText('Email');
    const oldPassword = screen.getByPlaceholderText('Old Password');
    const newPassword = screen.getByPlaceholderText('New Password');
    const displayName = screen.getByPlaceholderText('Display Name');
    const profileImg = screen.getByAltText('profile pic');

    expect(email).toBeInTheDocument();
    expect(email.value).toBe('mario@gmail.com');
    expect(oldPassword).toBeInTheDocument();
    expect(oldPassword.value).toBe('');
    expect(newPassword).toBeInTheDocument();
    expect(newPassword.value).toBe('');
    expect(displayName).toBeInTheDocument();
    expect(displayName.value).toBe('Mario');
    expect(profileImg).toBeInTheDocument();
    expect(profileImg.src).toBe(rootURL + 'mario.png')
})

it('Should successfully save changes made to user', async () => {
    store = mockStore(initialState);

    fetch.mockResponseOnce(() => {
        initialState.user = {
            _id: 1,
            email: 'luigi@gmail.com',
            displayName: 'Luigi',
            profileUrl: 'luigi.png'
        }
        
       return JSON.stringify({ _id: 1,
            email: 'luigi@gmail.com',
            displayName: 'Luigi',
            profileUrl: 'luigi.png' })
    });

 render(<Provider store={store}><BrowserRouter><Account /></BrowserRouter></Provider>);

    const displayNameInput = screen.getByPlaceholderText('Display Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const profileImg = screen.getByAltText('profile pic');
    const saveBtn = screen.getByRole('button');
    
    fireEvent.change(displayNameInput, { target: { value: 'Luigi' }});
    fireEvent.change(emailInput, { target: { value: 'luigi@gmail.com' }});
    fireEvent.change(profileImg, { target: { src: 'luigi.png' }});
    fireEvent.click(saveBtn);

    const newDisplayName = screen.getByPlaceholderText('Display Name');
    const newEmail = screen.getByPlaceholderText('Email');
    const newImage = screen.getByAltText('profile pic');

    expect(newDisplayName.value).toBe('Luigi');
    expect(newEmail.value).toBe('luigi@gmail.com');
    expect(newImage.src).toBe(rootURL + 'luigi.png');
    expect(initialState.user.email).toBe('luigi@gmail.com');
}) 
});