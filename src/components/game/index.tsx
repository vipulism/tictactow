
import { GameRow, Players } from '../../App';
import './style.css';

interface Props {
	status:GameRow[],
	onSelection(row:number, col:number, player:Players):void;
	currentPlayer:Players;
}

export default function Game(prop:Props){
   
	const clicked = (row:number, col:number, player:Players) => {
		prop.onSelection(row,col,player);
	}
    const rows =  prop.status.map((row, rowIndex) => {

        return (
        <li  key={'row'+rowIndex}>
					<ul>
						{ 
							row.map((col, colIndex) => {
								return (
									<li key={'col'+colIndex}>
										<button 
											disabled={col !== null}
											onClick={() => clicked(rowIndex, colIndex, prop.currentPlayer)}>
											{col || ''}
										</button>
									</li>
								)
							})
						}
					</ul>
        </li>
        );

    })
    console.log('status', rows);
    return(
        <ul className="game">
            {rows}
        </ul>
    )
}