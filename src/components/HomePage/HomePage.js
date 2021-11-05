import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeShowRule } from "../../actions/actions";
import './HomePage.css';

export default function HomePage() {
    const dispatch = useDispatch();
    return (
        <div className="Home">
            <Link to="/Game/normalgame"><button className="button">Normal Game</button></Link>
            <Link to="/Game/freegame"><button className="button">Free Game</button></Link>
            <button className="button instr-button" 
                    onClick={()=> dispatch(changeShowRule())}>Instruction
            </button>
        </div>
    )
}