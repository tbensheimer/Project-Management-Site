import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import IdleTimer from "./IdleTimer"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'


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
let store;


it('Should render Active state', async () => {


    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><IdleTimer /></BrowserRouter></Provider>);

    const state = screen.getByText('Active');

    fireEvent.click(state);

    const seconds = screen.getByTestId('seconds');

    expect(state).toBeInTheDocument();
    expect(seconds).toBeInTheDocument();
    expect(seconds).toBe(479);

});
});
