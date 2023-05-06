import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom'
import ProjectFilter from "./ProjectFilter";

describe('Change filter function', () => {

  const setState = jest.fn();
  jest.spyOn(React, 'useState')
  .mockImplementationOnce(initState => [initState, setState]);

  let filter = "All";
  const changeFilter = (newFilter) => {
    setState(newFilter);
    filter = newFilter;
  }


it('Should render the component correctly', () => {
 
    render(<ProjectFilter filter={filter} changeFilter={changeFilter} />)

    const btns = screen.getAllByRole('button');
    const allBtn = screen.getByText('All');

    expect(allBtn.className).toBe('active');
    expect(btns.length).toBe(6);

})

it('Should change filter state', () => {

  render(<ProjectFilter filter={filter} changeFilter={changeFilter} />)

  const mineBtn = screen.getByText('Mine');
  const marketingBtn = screen.getByText('Marketing');
  const salesBtn = screen.getByText('Sales');

  fireEvent.click(mineBtn);

  expect(setState).toHaveBeenCalledWith('Mine'); 
  expect(filter).toBe('Mine');

  fireEvent.click(marketingBtn);

  expect(setState).toHaveBeenCalledWith('Marketing'); 
  expect(filter).toBe('Marketing');

  fireEvent.click(salesBtn);

  expect(setState).toHaveBeenCalledWith('Sales'); 
  expect(filter).toBe('Sales');

})
});