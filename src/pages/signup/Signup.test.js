import { render, screen } from "@testing-library/react";
import Signup from "./Signup"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom'

import App from "../../App";


describe('With redux provider environment', () => {

    let initialState= {
        projects: [],
        completedProjects: [],
        user: null,
        users: null
    };

const mockStore = configureStore();
let store

it('Should render button', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><Signup /></Provider>)

    let title = screen.getByRole('h2');

    expect(title).toBeInTheDocument();
    expect(title).toBe('Sign up');
})
})