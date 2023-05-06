import { render, screen, act } from "@testing-library/react";
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

    const timeout = async (seconds) => {
        await setTimeout(null, seconds);
    }

    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><IdleTimer /></BrowserRouter></Provider>);

    await timeout(1000);

    const state = screen.getByText('Active');
    const seconds = screen.getByTestId('seconds');


    expect(state).toBeInTheDocument();
    expect(state.textContent).toBe('Active');

    expect(seconds).toBeInTheDocument();

    // await timeout(480001);
    // expect(state.textContent).toBe('Idle');
})
});