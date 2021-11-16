import { useDispatch } from 'react-redux';
import { changeShowRule } from "../../actions/actions";
import './Rule.css';

export default function Rule({}) {
    const dispatch = useDispatch();

    return (
        <div className="instruction">
            <div className="instr-box">
                <p>
                    Normal game: You vs computer. Each one will have 5 battleships. Click the oppoent's board to try a hit. 
                    Who first hit all of the oppoent's battleships will be the winner!
                </p>
                <p>
                    Free game: Just the computer board. Try to hit all the battleships!
                </p>
                <button onClick={()=> dispatch(changeShowRule())} 
                        className="back">Back
                </button>
            </div>

        </div>
    )
}