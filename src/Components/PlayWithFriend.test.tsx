import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlayWithFriends from './PlayWithFriends';




describe("<PlayWithFriends />", () => {

    it("PlayWithFriends Page renders correctly", () => {
        const { getByText } = render(
            <BrowserRouter>
                <PlayWithFriends />
            </BrowserRouter>
        );
        expect(getByText("Play With Friend"));
    });

    it('navigates to correct route on icons click', () => {
        render(
            <BrowserRouter>
                <PlayWithFriends />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByTestId('play-with-friends-home'));
        expect(window.location.pathname).toBe('/')
    });

    it('resets the board on replay icon click', () => {
        render(
            <BrowserRouter>
                <PlayWithFriends />
            </BrowserRouter>
        );


        const replayButton = screen.getByTestId('play-with-friend-new');
        fireEvent.click(replayButton);

        const allBlocks = Array.from({ length: 9 }, (_, i) => screen.getByTestId(`block-${i}`));
        allBlocks.forEach(block => {
            expect(block.textContent).toBe('');
        });


    });

    it('correctly handles a draw game', async () => {
        const { getByTestId, getByText } = render(
            <BrowserRouter>
                <PlayWithFriends />
            </BrowserRouter>
        );

        const blocks = Array.from(Array(9).keys()).map((_, index) => getByTestId(`block-${index}`));
    
        fireEvent.click(blocks[0]); // X
        fireEvent.click(blocks[1]); // O
        fireEvent.click(blocks[2]); // X
        fireEvent.click(blocks[4]); // O
        fireEvent.click(blocks[3]); // X
        fireEvent.click(blocks[5]); // O
        fireEvent.click(blocks[7]); // X
        fireEvent.click(blocks[6]); // O
        fireEvent.click(blocks[8]); // X - Draw scenario
    
        // Use waitFor to wait for the async rendering or updates
        await waitFor(() => {
            expect(getByText(/Draw Match/i));
        });
    });

    it('correctly detects and displays winner', async () => {
        const { getByTestId, getByText } = render(
            <BrowserRouter>
                <PlayWithFriends />
            </BrowserRouter>
        );

        // Simulate a game leading to a winner
        const blocks = Array.from(Array(9).keys()).map((_, index) => getByTestId(`block-${index}`));

        fireEvent.click(blocks[0]); // O
        fireEvent.click(blocks[3]); // X
        fireEvent.click(blocks[1]); // O
        fireEvent.click(blocks[4]); // X
        fireEvent.click(blocks[2]); // O - Winning move

        // Use waitFor to wait for the async rendering or updates
        await waitFor(() => {
            expect(getByText(/Winner of the game is: Player [OX]/));
        });
    });


});



