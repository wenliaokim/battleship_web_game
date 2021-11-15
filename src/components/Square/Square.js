import './Square.css';
import { useDispatch } from 'react-redux';

export default function Square(props) {

   const {i, j, squareStatus, onBoardClick, normalGameAiBoard, normalPlayerBoard} = props;
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
    
    if(normalGameAiBoard) {
        squareColor = "empty";
    }

    if(normalPlayerBoard) {
        if(squareColor === 'empty')
            squareColor = "";
    }

    return (
        <div id="square" className={squareColor} onClick={()=> {
            onBoardClick && onBoardClick(i, j);
        }}></div>
    )
}