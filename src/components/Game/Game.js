import React from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeShowRule } from "../../actions/actions";
import NormalGame from "../NormalGame/NormalGame";
import FreeGame from "../FreeGame/FreeGame";
import "./Game.css";

export default function Game(props) {
    let params = useParams();
    let game = params.game;
    const dispatch = useDispatch();

    return (
        <div>
            <Link to="/"><button className="button reset">Reset</button></Link>
            <button onClick={()=> dispatch(changeShowRule())} 
                    className="button rule">?
            </button>
            <div className="gameBoard">
                {(game === 'freegame') ? <FreeGame /> : 
                ((game === 'normalgame') ? <NormalGame /> : <Redirect to="/"/> )
                }
            </div>

        </div>
    )
}
