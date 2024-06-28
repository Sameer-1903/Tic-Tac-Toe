import React, { useEffect, useState } from 'react';
import '../styles/playwithcomputer.css';
import Block from './Block';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';


const PlayWithComputer: React.FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isDrawMatch, setIsDrawMatch] = useState<boolean>(false);

  const handleBoxClick = (index: number) => {
    if (state[index] === null && !winner && currentTurn === 'X') {
      const state2 = [...state];
      state2[index] = currentTurn;
      setState(state2);
      setCurrentTurn('O');
    }
  };

  const checkWinner = (board: (string | null)[]): string | null => {
    const winnerPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const pattern of winnerPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = (board: (string | null)[]): boolean => {
    return board.every((block) => block !== null);
  };

  const handleNewGame = () => {
    setState(Array(9).fill(null));
    setWinner(null);
    setIsDrawMatch(false);
    setCurrentTurn("X");
  };

  const getRandomMove = (board: (string | null)[]): number => {
    const availableMoves = board
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null) as number[];
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  };

  const getWinningMove = (board: (string | null)[], player: string): number | null => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = player;
        if (checkWinner(newBoard) === player) {
          return i;
        }
      }
    }
    return null;
  };

  const makeComputerMove = () => {
    // Check if the computer can win
    const winningMove = getWinningMove(state, 'O');
    if (winningMove !== null) {
      return winningMove;
    }

    // Check if the computer needs to block the player from winning
    const blockingMove = getWinningMove(state, 'X');
    if (blockingMove !== null) {
      return blockingMove;
    }

    // Otherwise, make a random move
    return getRandomMove(state);
  };

  useEffect(() => {
    const win = checkWinner(state);
    if (win) {
      setWinner(win);
    } else if (isBoardFull(state)) {
      setIsDrawMatch(true);
    } else if (currentTurn === "O") { // Computer's turn
      const computerMove = makeComputerMove();
      const state2 = [...state];
      state2[computerMove] = 'O';
      setTimeout(() => {
        setState(state2);
        setCurrentTurn('X');
      }, 500);
    }
  }, [state, currentTurn]);

  let resultMessage: string;
  if (winner) {
    resultMessage = `Winner of the game is : Player ${winner}`;
  } else if (isDrawMatch) {
    resultMessage = 'Draw Match';
  } else {
    resultMessage = `Player : ${currentTurn}'s Turn`;
  }

  return (
    <div className="main-page-computer">
      <div className="computer-background-white">

        <div className="heading-computer">Play With Computer</div>
        <div className="board-layout">
          <div className="row">
            <Block onClick={() => handleBoxClick(0)} value={state[0]} data-testid="block-0" />
            <Block onClick={() => handleBoxClick(1)} value={state[1]} data-testid="block-1" />
            <Block onClick={() => handleBoxClick(2)} value={state[2]} data-testid="block-2" />
          </div>
          <div className="row">
            <Block onClick={() => handleBoxClick(3)} value={state[3]} data-testid="block-3" />
            <Block onClick={() => handleBoxClick(4)} value={state[4]} data-testid="block-4" />
            <Block onClick={() => handleBoxClick(5)} value={state[5]} data-testid="block-5" />
          </div>
          <div className="row">
            <Block onClick={() => handleBoxClick(6)} value={state[6]} data-testid="block-6" />
            <Block onClick={() => handleBoxClick(7)} value={state[7]} data-testid="block-7" />
            <Block onClick={() => handleBoxClick(8)} value={state[8]} data-testid="block-8" />
          </div>

        </div>
        <div className="results-viewboard-computer">
          <h1 className="results">{resultMessage}</h1>

        </div>
        <div data-testid="play-with-computer-home" className="buttons-computer">
          <button
            className="home-button-computer"
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon fontSize="large" />
          </button>
          <button
            data-testid="play-with-computer-new"
            className="start-new-game-computer"
            type="button"
            onClick={handleNewGame}
          >
            <ReplayIcon fontSize="large" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default PlayWithComputer;

