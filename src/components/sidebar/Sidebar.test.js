import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Sidebar from "./Sidebar";
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


it('Should render sidebar component correctly with username', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Sidebar /></BrowserRouter></Provider>);

    const greeting = screen.getByTestId('greeting');
    const links = screen.getAllByRole('link')
    const state = screen.getByText('Active')
    const secondsLeft = screen.getByText('seconds', {exact: false});

    expect(greeting).toBeInTheDocument();
    expect(greeting.textContent).toBe('Hello Mario');
    expect(links.length).toBe(4);
    expect(state).toBeInTheDocument();
    expect(secondsLeft).toBeInTheDocument();
})

});