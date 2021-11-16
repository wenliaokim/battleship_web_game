import { useParams, Link, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import ReactTooltip from "react-tooltip";
import { changeShowRule } from "../../actions/actions";
import NormalGame from "../NormalGame/NormalGame";
import FreeGame from "../FreeGame/FreeGame";
import { removeLocalStorage } from '../../store'
import "./Game.css";

export default function Game(props) {
    let params = useParams();
    let game = params.game;
    const dispatch = useDispatch();

    return (
        <div>
            <Link to='/'>
                <button 
                    className="button reset" 
                    onClick={()=>{
                        removeLocalStorage();
                        setTimeout(window.location.reload.bind(window.location), 250);
                    }}
                    data-tip data-for="resetTip">Reset
                </button>
            </Link>
            <ReactTooltip id="resetTip" place="right" type="light" effect="solid">
                    click to exit the game and return to the homepage.
            </ReactTooltip>

            <button 
                onClick={()=> dispatch(changeShowRule())} className="button rule"
                data-tip data-for="ruleTip">?
            </button>
            <ReactTooltip id="ruleTip" place="right" type="light" effect="solid">
                    show game rules
            </ReactTooltip>
    
            <div className="gameBoard">
                {(game === 'freegame') ? <FreeGame /> : 
                ((game === 'normalgame') ? <NormalGame /> : <Redirect to="/"/>)}
            </div>
        </div>
    )
}
