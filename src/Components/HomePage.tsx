import React from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/homepage.css'

const HomePage : React.FunctionComponent = () => {

  const navigate = useNavigate();
  return (
    <div  className='home-page'>
      <div className="logo">
        <div className="form">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/1200px-Tic_tac_toe.svg.png" alt="TIC-TAC-TOE" />
          <div className="form-title">
            <h1>TIC-TAC-TOE</h1>
          </div>
          <div className="form-description">
            <p>Lets play & have fun</p>
          </div>
          <div className="form-buttons">
            <button onClick={() => {navigate("/playwithfriend")}} className='play-button' data-testid="1"> Play with Friend</button>
            <button onClick={() => {navigate("/playwithcomputer")}} className='play-button'> Play with Computer</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default HomePage