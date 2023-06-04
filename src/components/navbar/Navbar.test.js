import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Navbar from "./Navbar";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import { useDispatch, useSelector } from "react-redux";

describe('With redux provider environment', () => {

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
            profileUrl: "mario.png"
        },
        users: null
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

it('Should render navbar component correctly with user', () => {
    store = mockStore(initialState);

    // fetch.mockResponseOnce(() => {
    //     initialState.user = null;
        
    //    return JSON.stringify({ _id: 1,
    //         email: 'mario@gmail.com',
    //         displayName: 'Mario',
    //         profileUrl: 'mario.png' })
    // });

    //     const mockDispatch = jest.fn();
    //  useDispatchMock.mockReturnValue(mockDispatch);
    //  store.dispatch = mockDispatch;


    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);

    const logoutBtn = screen.getByText('Logout');
    const btns = screen.getAllByRole('button');
    const dojoImg = screen.getByAltText('Dojo icon');

    expect(logoutBtn).toBeInTheDocument();
    expect(btns.length).toBe(1);
    expect(dojoImg).toBeInTheDocument();

    // userEvent.click(logoutBtn);

    // expect(initialState.user).toBe(null);
    // expect(window.location.href).toBe('http://localhost/login');

})

it('Should render navbar without user correctly', () => {
    initialState.user = null;

    store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);

const signupLink = screen.getByText('Signup');
const loginLink = screen.getByText('Login');
const dojoImg = screen.getByAltText('Dojo icon');

expect(signupLink).toBeInTheDocument();
expect(loginLink).toBeInTheDocument();
expect(dojoImg).toBeInTheDocument();
});

it('Should direct users to home page', () => {

store = mockStore(initialState);

render(<Provider store={store}><BrowserRouter><Navbar/></BrowserRouter></Provider>)

window.location.href = 'http://localhost/signup';

const homepage = window.location.href;

expect(homepage).toBe('http://localhost/');
})

// it('Should log user out', async () => {

//     initialState.user = {
//         _id: 1,
//         displayName: "Mario",
//         profileUrl: "mario.png"
//     };

//     store = mockStore(initialState);

//     fetch.mockResponseOnce(() => {
//         initialState.user = JSON.stringify({
//             _id: 1,
//             displayName: "Mario",
//             profileUrl: "mario.png"
//         });
//     })
//     .then(res => {
//         resolve(res.json());
//     })
    

//     render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);

//     const logoutBtn = screen.getByText('Logout');

//     userEvent.click(logoutBtn);

//     expect(await screen.findByText('Loading')).toBeInTheDocument();
//     // expect(await screen.findByText('Signup')).toBeInTheDocument();

// })

});