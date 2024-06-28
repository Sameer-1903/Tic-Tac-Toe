
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';


describe('HomePage component', () => {
  it('renders correctly', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText('TIC-TAC-TOE'));
    expect(screen.getByText('Play with Friend'));
    expect(screen.getByText('Play with Computer'));
  });

  it('navigates to correct routes on button click', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    fireEvent.click(screen.getByText('Play with Friend'));
    expect(window.location.pathname).toBe('/playwithfriend');

    fireEvent.click(screen.getByText('Play with Computer'));
    expect(window.location.pathname).toBe('/playwithcomputer');
  });
});