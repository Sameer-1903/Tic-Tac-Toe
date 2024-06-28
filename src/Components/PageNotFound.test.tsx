import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from './PageNotFound';


describe("<PageNotFound />", () => {
  it("PageNotFound Page renders correctly", () => {
    const { getByText } = render(
      <Router>
        <PageNotFound />
      </Router>
    );
    expect(getByText("404"));

  });

  it('navigate to correct route', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );
    fireEvent.click(screen.getByText('404'));
    expect(window.location.pathname).toBe('/')
  })
});
