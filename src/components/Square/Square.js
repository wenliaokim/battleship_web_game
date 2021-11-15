import './Square.css';
import { useDispatch } from 'react-redux';

export default function Square(props) {

   const {i, j, squareStatus, onBoardClick, aiBoard, playerBoard} = props;
    const dispatch = useDispatch();

    let squareColor = "empty";
    if (squareStatus === 'occupied') {
        squareColor = "occupied";
    }

    if (squareStatus === 'missed') {
        squareColor = "missed";
        return (
            <div id="square" className={squareColor}>
                X
            </div>
        )
    }

    if (squareStatus === 'attacked') {
        squareColor = "attacked";
        return <div id="square" className={squareColor}></div>
    }
    
    if(aiBoard) {
        squareColor = "empty";
    }

    if(playerBoard) {
        if(squareColor === 'empty')
            squareColor = "";
    }

    return (
        <div id="square" className={squareColor} onClick={()=> {
            onBoardClick && onBoardClick(i, j);
        }}></div>
    )
}