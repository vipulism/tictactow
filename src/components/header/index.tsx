import './styles.css'; 

export default function Header(){
    return (
        <header className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
                <span className='p-2'>PLAYER 1</span>
                <span className='h6 p-2 m-0 shadow'>X</span>
            </div>
            <div className='d-flex align-items-center'>
                <span className='p-2'>PLAYER 2</span>
                <span className='h6 p-2 m-0 shadow'>O</span>
            </div>
        </header>
    )
} 