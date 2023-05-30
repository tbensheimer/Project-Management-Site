import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import { useDispatch, useSelector } from "react-redux";
import Project from "./Project";

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

beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  afterAll(() => {
    cleanup();
  });

  const reactRedux = { useDispatch, useSelector }
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

it('Should render Project component correctly', () => {
    store = mockStore(initialState);

    let dueSoonDate = new Date();
    dueSoonDate.setDate(dueSoonDate.getDate() + 2);
    dueSoonDate = dueSoonDate.toLocaleDateString();
    dueSoonDate = `${dueSoonDate.split('/')[2]}-${dueSoonDate.split('/')[0]}-${dueSoonDate.split('/')[1]}T00:00:00+00:00`;
    
    fetch.mockResponseOnce(() => {  
       return JSON.stringify({
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
    })
    });

    render(<Provider store={store}><BrowserRouter><Project /></BrowserRouter></Provider>);

    const imgs = screen.getAllByRole("img");

    expect(imgs).toBeInTheDocument();

})


});