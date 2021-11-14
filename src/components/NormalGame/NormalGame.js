import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Board from '../Board/Board';
import Battleship from '../Battleship/Battleship';
import BoardForDrop from '../Board/BoardForDrop';
import { ChangeDir, doneAllDragging, finishDrag } from '../../actions/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { boardClick, playerBoardUpdate } from '../../actions/actions';
import './NormalGame.css';


export default function NormalGame() {

    const dispatch = useDispatch();

    const aiBoard = useSelector((state) => state.aiBoard);
    const playerBoard = useSelector((state) => state.playerBoard);
    const battleships = useSelector((state) => state.battleships);
    const clickedShip = useSelector((state) => state.clickedShip);
    const isDragAllDone = useSelector(state => state.isDragAllDone);

    const [toDragBattleships, setDragBattships] = useState([]);
    const [submitAllowed, setSubmitAllowed] = useState(false);

    const aiWinning = aiBoard.ships === 0 ? true : false;
    const playerWinning = playerBoard.ships === 0 ? true : false;

    function clickAiBoard(i, j) {
            dispatch(boardClick(i, j));
            dispatch(playerBoardUpdate());
    }

    // To find out the player's battleships that haven't bee dragged to the board (toDragBattleships).
    // When all battleships are dragged, we allow the submit button to work (change submitAllowed to be true).
    useEffect(() => {
        const newList = [];
        let draggedCount = 0;
        for (let i = 0; i < 5; i++) {
            newList.push(
                <Battleship 
                    key={`toDragBattleship: id ${i + 1}`}
                    toHidden={battleships[i].dropped} 
                    id={battleships[i].id} 
                    length={battleships[i].length} 
                    direction={battleships[i].direction}/>)
            if (battleships[i].dropped) draggedCount++;
        }
        setDragBattships(newList);
        (draggedCount === 5) ? setSubmitAllowed(true) : setSubmitAllowed(false);
    }, [battleships]);

    // If a certain battleship on board is clicked, allow the change button to work.
    const[changeButtonActive, setActive] = useState(false);
    useEffect(() => {
        (clickedShip !== -1) ? setActive(true) : setActive(false);
    }, [clickedShip]);    


    // If the submit button is clicked, change the isDragAllDone to be true. 
    // So we can change the view to the play view.
    if (!isDragAllDone) {
        return (
            <DndProvider backend={HTML5Backend}>
            <div>
                <p className="putShipTitle">Drag to put your battleships on board</p>
                {changeButtonActive 
                ? <button 
                    className="button directionButton" 
                    onClick={() => {dispatch(ChangeDir(clickedShip))}}>
                    change Direction
                </button>
                : <button className="button directionButton disabledButton" disabled={true}>change Direction</button>
                }
                {submitAllowed
                ? <button 
                    className="button directionButton" 
                    onClick={() => {
                        dispatch(finishDrag());
                        dispatch(doneAllDragging());
                    }}>OK</button>
                : <button className="button directionButton disabledButton">OK</button>
                }
                <div id="putShipBoard">
                    <BoardForDrop boardStatus={playerBoard.yourBoard}/>
                    <div id="ships">{toDragBattleships}</div>
                </div>
            </div>
            </DndProvider>
        );
    } 
    else {
        if(aiWinning){
            return (
                <div>
                    <div class="hasWin"> GAME OVER, YOU WIN!</div>
                </div>
            )
        }
        else if(playerWinning){
            return (
                <div>
                    <div class="hasWin"> GAME OVER, AI WIN!</div>
                </div>
            )
        } 
        else {
            return (
                <div>
                    <div id="normalBoard">
                        <div>
                            <Board boardStatus={aiBoard.showBoard} onBoardClick={clickAiBoard} normalGameAiBoard={true}/>
                            <h2 className="normal-ai">AI</h2>
                        </div>
                        <div>
                            <Board boardStatus={playerBoard.yourBoard}/>
                            <h2 className="human">You</h2>
                        </div>
                    </div>
                </div>
            ); 
        }
    }
}