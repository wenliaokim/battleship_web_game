import { useDispatch } from 'react-redux';
import { changeShowRule } from "../../actions/actions";
import './Rule.css';

export default function Rule({}) {
    const dispatch = useDispatch();

    return (
        <div className="instruction">
            <div className="instr-box">
                <p>
                    A game of Battleship is made up of two 10X10 boards, 
                    one that represents the player’s board and one that represents the opponents.  
                    At the start of the game, 5 ships are randomly placed on each board 
                    (one 5X1 ship, one 4X1 ship, two 3X1 ships, and one 2X1 ship).  
                </p>
                <p>
                    During the game, you and an AI will take turns (the player always goes first). 
                    On your turn, you will select a square on your opponent’s board. 
                    On your opponent’s turn, the AI will randomly select a square on your grid. 
                    If you or your opponent hit a ship, then mark that board with a color and symbol.
                    If you or your opponent miss, then mark a spot on the board to remind the players 
                    where on the board they have attempted
                </p>
                <button onClick={()=> dispatch(changeShowRule())} 
                        className="back">Back
                </button>
            </div>

        </div>
    )
}