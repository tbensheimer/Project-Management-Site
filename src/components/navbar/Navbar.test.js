import { render, screen, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom'
import Navbar from "./Navbar";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
Promise.resolve({
    json: () => 
    Promise.resolve({
     
    })
})

})

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


it('Should render navbar component correctly', async () => {
    store = mockStore(initialState);

    await act(async() => render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>));


    const logoutBtn = screen.getByText('Logout');
    const btns = screen.getAllByRole('button');

    expect(logoutBtn).toBeInTheDocument();
    expect(btns.length).toBe(1);

    fireEvent.click(logoutBtn);

    // expect(logoutBtn).not.toBeInTheDocument();
})

});