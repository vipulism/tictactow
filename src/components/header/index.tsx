import { Players } from '../../App';
import './styles.css'; 


export default function Header({activePlayer}:{activePlayer:Players}){
    return (
        <header className='d-flex justify-content-between'>
            <div className={'d-flex align-items-center' + (activePlayer === 'X' ? ' active' :'' )}>
                <span className='p-2'>PLAYER 1</span>
                <span className='h6 p-2 m-0 shadow'>X</span>
            </div>
            <div className={'d-flex align-items-center' + (activePlayer === 'O' ? ' active' :'' )}>
                <span className='p-2'>PLAYER 2</span>
                <span className='h6 p-2 m-0 shadow'>O</span>
            </div>
        </header>
    )
} 