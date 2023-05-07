import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import ProjectList from "./ProjectList";
import { BrowserRouter } from "react-router-dom";

describe('Provide list of projects, redux environment, and properly configure due date formate', () => {

    let dueSoonDate = new Date();
    dueSoonDate.setDate(dueSoonDate.getDate() + 2);
    dueSoonDate = dueSoonDate.toLocaleDateString();
    dueSoonDate = `${dueSoonDate.split('/')[2]}-${dueSoonDate.split('/')[0]}-${dueSoonDate.split('/')[1]}T00:00:00+00:00`;

    
    let due8Date = new Date();
    due8Date.setDate(due8Date.getDate() + 8);
    due8Date = due8Date.toLocaleDateString()
    due8Date = `${due8Date.split('/')[2]}-${due8Date.split('/')[0]}-${due8Date.split('/')[1]}T00:00:00+00:00`;

    const projects = [{
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
]

it('Should render Project List component correctly', () => {

    render(<BrowserRouter><ProjectList projects={projects} /></BrowserRouter>);

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

});