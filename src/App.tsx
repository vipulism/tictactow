import { useState } from 'react';
import './App.css'
import Game from './components/game';
import Header from './components/header/'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Winners } from './components/game/winner';

export type Players = 'X' | 'O';

export type GameRow  = Array< 'X' | 'O' | null>;

const defaultGame: GameRow[] = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

interface Logs {
  X:number[][],
  O:number[][],
}

const activePlayer = 'X' as Players;
const isGameOver = false;

function App() {

 const [currentPlayer, setCurrentPlayer] = useState(activePlayer);
  const default_logs:Logs = { X:[], O:[]}
  const [logs, setLogs] = useState(default_logs);
  const [gameOver, setGameOver] = useState(isGameOver);
  const [game, setGame] = useState(defaultGame);

  const onClicked = (row:number, col:number, player:Players) => {
  
      if(gameOver) return;

      setGame(prevGame => {
        const newGame = [...prevGame.map(row => [...row])];
        newGame[row][col] = player;
        return newGame;
      });


      setLogs(oldLog => {
        const newLogs = { X:[...oldLog.X.map(itm => [...itm])], O:[...oldLog.O].map(itm => [...itm])}
        newLogs[currentPlayer].push([row, col]);
        return newLogs;
      });


      setCurrentPlayer((prevPlayer) => {
        const p = prevPlayer === 'X' ? 'O' : 'X';
        console.log('set new current player', p);
        return p;
      });
      
      Winners.forEach(combos => {
        if(logs[currentPlayer].length >= 3 && !gameOver){
          const isWinner = combos.every(combo => logs[currentPlayer].some(itm => itm[0] === combo[0] && itm[1] === combo[1]))
          if(isWinner){
            console.log('Game Overrrrrrrrrrrr ' + currentPlayer + ' winner' );
            setGameOver(state => !state);
          }
        }
      });
  }


  return (
    <div className='container w-500'>
        <Header activePlayer={currentPlayer} />
        { gameOver && <h1>GameOver</h1>}
        <Game 
            gameOver={gameOver}
            currentPlayer={currentPlayer}
            status={game}
            onSelection={onClicked} />
          x:{JSON.stringify(logs.X)}
          <br />
          o:{JSON.stringify(logs.O)}
    </div>
  )
}

export default App
