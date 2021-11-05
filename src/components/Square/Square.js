import './Square.css';

export default function Square({ squareStatus }) {

    let squareColor = "";
    if (squareStatus === 'occupied') {
        squareColor = "occupied";
    }

    return (
        <div id="square" className={squareColor}></div>
    )
}