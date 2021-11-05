import { useSelector, useDispatch } from 'react-redux';
import Board from '../Board/Board';
import Square from '../Square/Square';
import './NormalGame.css';

export default function NormalGame() {
    const aiBoard = useSelector((state) => state.aiBoard);

    const createShip = (length) => {
        const squareList = [];
        for (let i = 0; i < length; i++) {
           squareList.push(<Square squareStatus={'occupied'}/>)
        }
        return squareList;
    }

    if (true) {
        return (
            <div>
                <p className="putShipTitle">Drag to put your battleships</p>
                <div id="putShipBoard">
                    <Board />
                    <div id="ships">
                        <div className="battleship5">{createShip(5)}</div>
                        <div>{createShip(4)}</div>
                        <div>{createShip(3)}</div>
                        <div>{createShip(3)}</div>
                        <div>{createShip(2)}</div>
                    </div>
                </div>
            </div>

        );
    } else {
        return (
            <div>
                <div id="normalBoard">
                    <div>
                        <Board boardStatus={aiBoard}/>
                        <h2 className="normal-ai">AI</h2>
                    </div>
                    <div>
                        <Board />
                        <h2 className="human">You</h2>
                    </div>
                </div>
            </div>
        ); 
    }
}