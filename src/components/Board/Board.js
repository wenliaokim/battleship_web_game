import Square from '../Square/Square';
import './Board.css';


export default function Board({ boardStatus, onBoardClick, aiBoard, playerBoard }) {

    const boardComponent = [];
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            boardComponent.push((
                <Square 
                    squareStatus={boardStatus[i][j]}
                    i={i} j={j} onBoardClick={onBoardClick} 
                    aiBoard={aiBoard} playerBoard={playerBoard}
                />
            ))
        }
    }

    return (
        <div
        id="board">{boardComponent}
        </div>
    )
}