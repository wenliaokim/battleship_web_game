import './Square.css';
import { useDispatch } from 'react-redux';

export default function Square(props) {

    const x = props.i;
    const y = props.j;
    const board = props.squareStatus.aiBoard;
    const dispatch = useDispatch();

    let squareColor = "";
    if (board[x][y] === 'occupied') {
        squareColor = "occupied";
    }

    if (board[x][y]=== 'missed') {
        squareColor = "missed";
        return (
            <div id="square" className={squareColor}>
                X
            </div>
        )
    }

    if (board[x][y] === 'attacked') {
        squareColor = "attacked";
    }

    return (
        <div id="square" className={squareColor} onClick={()=>{
            dispatch({
                type: 'boardClick',
                x: props.i,
                y: props.j,
            })
        }
        }
        ></div>
    )
}