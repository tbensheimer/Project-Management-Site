import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom'
import ProjectFilter from "./ProjectFilter";


it('Should render the component correctly', () => {
    const setState = jest.fn();
    jest.spyOn(React, 'useState')
    .mockImplementationOnce(initState => [initState, setState]);

    let filter = "All";


      const changeFilter = (newFilter) => {
        setState(newFilter);
        filter = newFilter;
      }

    render(<ProjectFilter filter={filter} changeFilter={changeFilter} />)

    const btns = screen.getAllByRole('button');
    const allBtn = screen.getByText('All');
    const mineBtn = screen.getByText('Mine');

    expect(allBtn.className).toBe('active');
    expect(btns.length).toBe(6);

    fireEvent.click(mineBtn);

    expect(setState).toHaveBeenCalledWith('Mine'); 
    expect(filter).toBe('Mine');
})
