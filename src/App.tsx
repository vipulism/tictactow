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
const isGameOver:Players | null = null;

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
        const newLogs = { 
          X:[...oldLog.X.map(itm => [...itm])], 
          O:[...oldLog.O.map(itm => [...itm])]
        };

        newLogs[currentPlayer].push([row, col]);

        Winners.forEach(combos => {
          if(newLogs[currentPlayer].length >= 3 && !gameOver){
             const isWinner = combos.every(combo => newLogs[currentPlayer].some(itm => itm[0] === combo[0] && itm[1] === combo[1]))
            if(isWinner){
              setGameOver(() => currentPlayer === 'X' ? 'O' : 'X');
            }
              
          }
        });
        return newLogs;
      });

      setCurrentPlayer((prevPlayer) => {
        const p = prevPlayer === 'X' ? 'O' : 'X';
        return p;
      });
  }

  return (
    <div className='container w-500'>
        <Header gameOver={gameOver} activePlayer={currentPlayer} />
        { gameOver && <h1>GameOver</h1>}
        { gameOver && `${gameOver} is Looser`}
        <Game 
            gameOver={gameOver}
            currentPlayer={currentPlayer}
            status={game}
            onSelection={onClicked} />
    </div>
  )
}

export default App
