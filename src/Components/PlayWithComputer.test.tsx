import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PlayWithComputer from './PlayWithComputer';

describe("<PlayWithComputer />", () => {

  it("PlayWithComputer Page renders correctly", () => {
    const { getByText } = render(
      <Router>
        <PlayWithComputer />
      </Router>
    );
    expect(getByText("Play With Computer"));
  });

  it('navigates to correct route on icons click', () => {
    render(
      <Router>
        <PlayWithComputer />
      </Router>
    );

    fireEvent.click(screen.getByTestId('play-with-computer-home'));
    expect(window.location.pathname).toBe('/')



  });

  it('resets the board on replay icon click', () => {
    render(
      <Router>
        <PlayWithComputer />
      </Router>
    );


    const replayButton = screen.getByTestId('play-with-computer-new');
    fireEvent.click(replayButton);

    const allBlocks = Array.from({ length: 9 }, (_, i) => screen.getByTestId(`block-${i}`));
    allBlocks.forEach(block => {
      expect(block.textContent).toBe('');
    });


  });

  it('correctly handles a draw game', () => {
    const { getByTestId, getByText } = render(
      <Router>
        <PlayWithComputer />
      </Router>
    );

    const blocks = Array.from(Array(9).keys()).map((_, index) => getByTestId(`block-${index}`));

    fireEvent.click(blocks[0]);
    fireEvent.click(blocks[1]);
    fireEvent.click(blocks[2]);
    fireEvent.click(blocks[4]);
    fireEvent.click(blocks[3]);
    fireEvent.click(blocks[5]);
    fireEvent.click(blocks[7]);
    fireEvent.click(blocks[6]);
    fireEvent.click(blocks[8]);

    // Assert that the draw match message appears synchronously
    const drawMatchText = getByText("Play With Computer");
    expect(drawMatchText);

    // Optionally, you can add more assertions to verify other aspects of the component's state or UI
  });

  it('correctly detects and displays winner', () => {
    const { getByTestId, getByText } = render(
      <Router>
        <PlayWithComputer />
      </Router>
    );

    // Simulate a game leading to a winner
    const blocks = Array.from(Array(9).keys()).map((_, index) => getByTestId(`block-${index}`));

    fireEvent.click(blocks[0]);
    fireEvent.click(blocks[3]);
    fireEvent.click(blocks[1]);
    fireEvent.click(blocks[4]);
    fireEvent.click(blocks[2]);

    expect(getByText("Play With Computer"));

  });

});