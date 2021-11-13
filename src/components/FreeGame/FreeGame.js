import { useSelector } from 'react-redux';
import Board from '../Board/Board'
import './FreeGame.css';

export default function FreeGame() {

    const aiBoard = useSelector((state) => state.aiBoard);
    const winning = aiBoard.ships === 0 ? true : false;

    return (
        <div>
            <div id="freeBoard">
                {
                    winning ? <div class="win"> YOU WIN!</div> 
                    :
                    <div>
                    <Board boardStatus={aiBoard}/>
                    <h2 className="freeAi">AI</h2>
                    </div>
                }
            </div>
        </div>
      );
}