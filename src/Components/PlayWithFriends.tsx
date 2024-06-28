
import React, { useEffect, useState } from "react";
import "../styles/playwithfriends.css";
import Block from "./Block";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';

const PlayWithFriends: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isDrawMatch, setIsDrawMatch] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);
  const [previousTurn, setPreviousTurn] = useState<string | null>(null);  // Track the last player

  const handleBoxClick = (index: number) => {
    if (state[index] === null && !winner) {
      const state2 = [...state];
      state2[index] = currentTurn;
      setState(state2);
      // Set the previous turn to current turn before switching
      setPreviousTurn(currentTurn);
      // Reset the timer after a valid move
      setTimer(5);
    }
  };

  const checkWinner = (): string | null => {
    const winner = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of winner) {
      if (state[a] && state[a] === state[b] && state[a] === state[c])
        return state[a];
    }

    return null;
  };

  const isBoardFull = (): boolean => {
    return state.every((block) => block !== null);
  };

  const handleNewGame = () => {
    setState(Array(9).fill(null));
    setWinner(null);
    setIsDrawMatch(false);
    setCurrentTurn("X");
    setTimer(5);
    setPreviousTurn(null);  // Reset the previous turn for a new game
  };

  useEffect(() => {
    const win = checkWinner();
    if (win) {
      setWinner(win);
    } else if (isBoardFull()) {
      setIsDrawMatch(true);
    } else {
      const timeout = setTimeout(() => {
        if (timer === 1) {
          setWinner(previousTurn);  // Declare the previous player as the winner
        } else {
          setTimer(timer - 1);
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [state, timer]);

  useEffect(() => {
    setTimer(5);
  }, [currentTurn]);

  useEffect(() => {
    if (!winner && !isDrawMatch) {
      setCurrentTurn(currentTurn === "X" ? "O" : "X");
    }
  }, [state]);

  let resultMessage: string;
  if (winner) {
    resultMessage = `Winner of the game is : Player ${winner}`;
  } else if (isDrawMatch) {
    resultMessage = 'Draw Match';
  } else {
    resultMessage = `Player : ${currentTurn}'s Turn`;
  }

  return (
    <div className="main-page-friend">
      <div className="friend-background-white">
        <div className="heading-friend">Play With Friend</div>
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
        <div className="results-viewboard">
          <h1 className="results">{resultMessage}</h1>
        </div>
        <div className="timer">
          {!winner && !isDrawMatch && <h2>Time left: {timer} seconds</h2>}
        </div>
        <div data-testid="play-with-friends-home" className="buttons">
          <button
            className="home-button-friends"
            onClick={() => navigate("/")}
          >
            <HomeIcon fontSize="large" />
          </button>
          <button
            data-testid="play-with-friend-new"
            className="start-new-game-friend"
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

export default PlayWithFriends;
