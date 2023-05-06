import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import IdleTimer from "./IdleTimer"

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

//need to mock store redux
it('Should render Active state', async () => {
    render(<IdleTimer />)

    await timeout(1000);

    const state = screen.getByText('Active');
    const seconds = screen.getByText('seconds');


    expect(state).toBeInTheDocument();
    expect(state).toBe('Active');

    expect(seconds).toBeInTheDocument();
    expect(seconds).toBe('479 seconds');
})
