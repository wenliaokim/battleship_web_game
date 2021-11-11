import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import SquareForDrop from "../Square/SquareForDrop";
import Battleship from '../Battleship/Battleship';
import { clickBattleship } from "../../actions/actions";

import './Board.css';

export default function BoardForDrop({ boardStatus }) {

    const dispatch = useDispatch();

    const battleships = useSelector((state) => state.battleships);
    // this state is to show which battleship on the board has been clicked to be ready for direction changing. 
    // This will be used to emphasize the battleship by adding extra border. 
    const clickedShip = useSelector((state) => state.clickedShip);

    // add the square which accepts the dropping of battleship into the array to form the board. 
    const boardComponent = [];
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            boardComponent.push((
            <SquareForDrop 
                // key={`DroppableBoard i ${i}, j ${j}`}
                squareStatus={boardStatus[i][j]}
                i={i} j={j}/>))
        }
    }

    // to find out the battleships that have been dropped onto the board.
    const droppedBattleships = [];
    for (let i = 0; i < 5; i++) {
        if (battleships[i].dropped) {
            let borderColor = ""
            if (battleships[i].id === clickedShip) {
                borderColor = "3px solid red";
            } else {
                borderColor = "";
            }
            droppedBattleships.push(
                <div 
                    style={{position:"absolute", top:battleships[i].top, left:battleships[i].left, border:borderColor}}
                    onClick={() => (dispatch(clickBattleship(battleships[i].id)))}>
                    <Battleship toHidden={false} id={battleships[i].id} 
                                length={battleships[i].length} 
                                direction={battleships[i].direction}/>
                </div>
            )
        }
    }

    return (
        <div id="droppableBoard">
            <div id="board">{boardComponent}</div>
            {droppedBattleships}
        </div>
    )
}