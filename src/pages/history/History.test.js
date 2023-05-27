import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
import {useSelector } from "react-redux";
import History from "./History";
import React from "react";

describe('Provide list of projects, redux environment, and properly configure due date formate', () => {

    let dueSoonDate = new Date();
    dueSoonDate.setDate(dueSoonDate.getDate() + 2);
    dueSoonDate = dueSoonDate.toLocaleDateString();
    dueSoonDate = `${dueSoonDate.split('/')[2]}-${dueSoonDate.split('/')[0]}-${dueSoonDate.split('/')[1]}T00:00:00+00:00`;

    
    let due8Date = new Date();
    due8Date.setDate(due8Date.getDate() + 8);
    due8Date = due8Date.toLocaleDateString()
    due8Date = `${due8Date.split('/')[2]}-${due8Date.split('/')[0]}-${due8Date.split('/')[1]}T00:00:00+00:00`;

    
let initialState= {
    projects: [],
    completedProjects: [{
        _id: 1,
        name: "Test 1",
        details: "testing",
        category: "Marketing",
        dueDate: dueSoonDate,
        comments: [],
        createdBy: {
            displayName: "Mark",
            profileUrl: "profile.png",
            _id: 1
        },
        assignedUserList: [{
            displayName: "Mario",
            profileUrl: "Mario.png",
            _id: 2
        }],
        isCompleted: false
    },
    {
        _id: 2,
        name: "Test 2",
        details: "testing",
        category: "Design",
        dueDate: due8Date,
        comments: [],
        createdBy: {
            displayName: "Mark",
            profileUrl: "profile.png",
            _id: 1
        },
        assignedUserList: [{
            displayName: "Mark",
            profileUrl: "profile.png",
            _id: 1
        }],
        isCompleted: false
    }
],
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

beforeEach(() => {
useSelectorMock.mockClear();
});

afterAll(() => {
cleanup();
});

const reactRedux = { useSelector }
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

it('Should render the History component correctly', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><History /></BrowserRouter></Provider>);

    const projectList = screen.getAllByRole('link');
    const test1 = screen.getByTestId('Test 1');
    const testName = screen.getByText('Test 1');
    const dueByText = screen.getAllByText('Due By:', {exact: false});
    const avatars = screen.getAllByAltText('user avatar');

    expect(projectList.length).toBe(2);
    expect(test1).toBeInTheDocument();
    expect(testName).toBeInTheDocument();
    expect(dueByText.length).toBe(2);
    expect(avatars.length).toBe(2);
})

it('Should render the filter component correctly', () => {
 
    render(<Provider store={store}><BrowserRouter><History /></BrowserRouter></Provider>)

    const btns = screen.getAllByRole('button');
    const allBtn = screen.getByText('All');

    expect(allBtn.className).toBe('active');
    expect(btns.length).toBe(6);

})
})
