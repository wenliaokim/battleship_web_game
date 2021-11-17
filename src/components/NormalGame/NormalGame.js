import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ReactTooltip from "react-tooltip";
import Board from '../Board/Board';
import Battleship from '../Battleship/Battleship';
import BoardForDrop from '../Board/BoardForDrop';
import { ChangeDir, doneAllDragging, finishDrag, randomlyPut } from '../../actions/actions';
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from 'react-dnd-html5-backend';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
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
            // <DndProvider backend={HTML5Backend}>
            <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div className="drageFunction">
                <p className="putShipTitle">Drag to put your battleships on board, or click <b>Randomly</b></p>
                <button className="button dragFunButton" onClick={() => dispatch(randomlyPut())}>Radomly</button>
                {changeButtonActive 
                ? <button 
                    className="button dragFunButton" data-tip data-for="changeDirTip"
                    onClick={() => {dispatch(ChangeDir(clickedShip))}}>change Direction
                </button>
                : <button 
                    className="button dragFunButton disabledButton" 
                    // disabled={true} 
                    data-tip data-for="changeDirTip">change Direction
                </button>
                }
                <ReactTooltip id="changeDirTip" place="top" type="light" effect="solid">
                    Click battleship on board, then click the button. <br />
                    Only works when there are enough squares in to-change direction for the battleship
                </ReactTooltip>
                {submitAllowed
                ? <button 
                    className="button dragFunButton" 
                    onClick={() => {
                        dispatch(finishDrag());
                        dispatch(doneAllDragging());
                    }}
                    data-tip data-for="submitTip">submit</button>
                : <button className="button dragFunButton disabledButton" data-tip data-for="submitTip">submit</button>
                }
                <ReactTooltip id="submitTip" place="top" type="light" effect="solid">
                    When all battleships have been dragged on board, you can click the button to submit.
                </ReactTooltip>
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
                            <Board boardStatus={aiBoard.showBoard} onBoardClick={clickAiBoard} isAiBoard={true}/>
                            <h2 className="normal-ai">AI</h2>
                        </div>
                        <div>
                            <Board boardStatus={playerBoard.yourBoard} isAiBoard={false}/>
                            <h2 className="human">You</h2>
                        </div>
                    </div>
                </div>
            ); 
        }
    }
}