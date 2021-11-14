import { useSelector, useDispatch} from 'react-redux';
import Board from '../Board/Board'
import './FreeGame.css';
import {boardClick} from '../../actions/actions'

export default function FreeGame() {

    const dispatch = useDispatch();
    const aiBoard = useSelector((state) => state.aiBoard);
    const winning = aiBoard.ships === 0 ? true : false;

    function freeClick(i, j) {
        dispatch(boardClick(i, j));
    };

    return (
        <div>
            <div id="freeBoard">
                {
                    winning ? <div class="win"> GAME OVER, YOU WIN!</div> 
                    :
                    <div>
                    <Board boardStatus={aiBoard.showBoard} onBoardClick={freeClick}/>
                    <h2 className="freeAi">AI</h2>
                    </div>
                }
            </div>
        </div>
      );
}