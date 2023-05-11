import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Create from "./Create";
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

it('Should render Create component correctly', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Create /></BrowserRouter></Provider>);

    const projectName = screen.getByPlaceholderText('Name...');
    const projectDetails = screen.getByPlaceholderText('Details...');

    const categorySelectElement = screen.getByTestId('category');
    const userSelectElement = screen.getByTestId('users');
    const dueDate = screen.getByPlaceholderText('Due Date...');

    expect(projectName).toBeInTheDocument();
    expect(projectDetails).toBeInTheDocument();
    expect(categorySelectElement).toBeInTheDocument();
    expect(userSelectElement).toBeInTheDocument();
    expect(dueDate).toBeInTheDocument();
})

});