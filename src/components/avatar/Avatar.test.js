import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar"

it('Should render avatar component with correct src', () => {
    render(<Avatar src={'userImage.png'}/>)

    const avatar = screen.getByRole('img');

    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe('userImage.png');
})
