import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import OnlineUsers from "./OnlineUsers";
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

it('Should render online users component correctly', async () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><OnlineUsers /></BrowserRouter></Provider>);

    const users = screen.getAllByTestId('user');
    const activeUsers = screen.getAllByTestId('active');
    const Luigi = screen.getByText('Luigi');
    const profileImgs = screen.getAllByRole('img');

    expect(users.length).toBe(3);
    expect(activeUsers.length).toBe(2);
    expect(Luigi).toBeInTheDocument();
    expect(profileImgs.length).toBe(3);

})
});