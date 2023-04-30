import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Avatar from "./Avatar"

it('Should render avatar component with correct src', () => {
    render(<Avatar src={"userImage.png"}/>)

    const rootURL = window.location.href;
    const avatar = screen.getByRole('img');

    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe(`${rootURL}userImage.png`);
    expect(avatar.alt).toBe('user avatar');
    expect(avatar.parentNode.className).toBe('avatar');
})
