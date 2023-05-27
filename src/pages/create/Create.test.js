import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import Create from "./Create";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import { useDispatch, useSelector } from "react-redux";

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

// it('Should call dispatch and add a project', async () => {
//     store = mockStore(initialState);

//     const mockDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(mockDispatch);
//     store.dispatch = mockDispatch;

//     const component = render(<Provider store={store}><BrowserRouter><Create /></BrowserRouter></Provider>);

//     const projectName = screen.getByPlaceholderText('Name...');
//     const projectDetails = screen.getByPlaceholderText('Details...');
//     const categorySelectElement = screen.getByTestId('category');
//     const userSelectElement = screen.getByTestId('users');
//     const dueDate = screen.getByPlaceholderText('Due Date...');
//     const createBtn = screen.getByRole('button');

//     fireEvent.change(projectName, { target: { value: "MarioBros Project"}});
//     fireEvent.change(projectDetails, { target: { value: "Brothers for life"}});
    
//     fireEvent.click(categorySelectElement);

//     fireEvent.keyDown(component, {key: 'ArrowDown', code: 'ArrowDown', charCode: 40})
//     fireEvent.keyDown(component, {key: 'Enter', code: 'Enter', charCode: 13})

//     fireEvent.click(userSelectElement);

//     fireEvent.keyDown(userSelectElement, {key: 'ArrowDown', code: 'ArrowDown'})
//     fireEvent.keyDown(userSelectElement, {key: 'Enter', code: 'Enter'})

//     fireEvent.change(dueDate, { target: { value: "2023-05-13"}});


//     expect(projectName.value).toBe('MarioBros Project');
//     expect(projectDetails.value).toBe("Brothers for life");
//     // expect(categorySelectElement).toBe('Marketing');
//     // expect(userSelectElement.users.length).toBe(2);
//     expect(dueDate.value).toBe('2023-05-13');
//     expect(createBtn).toBeInTheDocument();

//     fireEvent.click(createBtn);

//     const error = screen.getByRole('p');

//     expect(error).toBeInTheDocument();

//     expect(store.dispatch).toHaveBeenCalledTimes(1);

    
// })

});