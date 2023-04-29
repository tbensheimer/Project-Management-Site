import { render, screen } from "@testing-library/react";
import Signup from "./Signup"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from "../../App";


describe('With redux provider environment', () => {

    let initialState= {
        projects: [],
        completedProjects: [],
        user: null,
        users: null
    };

const mockStore = configureStore();
let store,wrapper

it('Should render button', () => {
    store = mockStore(initialState);

    const { Signup } = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    render(<Signup />)

    expect(Signup).toBeInTheDocument();
})
})