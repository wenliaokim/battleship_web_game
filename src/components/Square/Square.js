import './Square.css';

export default function Square(props) {
    const {i, j, squareStatus, onBoardClick, aiBoard, playerBoard} = props;

    let squareColor = "";
    if (squareStatus === 'occupied') {
        squareColor = "occupied";
    }

    if (squareStatus === 'missed') {
        squareColor = "missed";
        return <div id="square" className={squareColor}>X</div>

    }

    if (squareStatus === 'attacked') {
        squareColor = "attacked";
        return <div id="square" className={squareColor}></div>
    }
    
    if(aiBoard) {
        squareColor = "empty";
    }

    return (
        <div id="square" className={squareColor} onClick={()=> {
            onBoardClick && onBoardClick(i, j);
        }}></div>
    )
}