import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import Square from "../Square/Square";
import { useEffect } from "react";
import { rmShipOnBoard, startDrag } from "../../actions/actions";
import "./Battleship.css";

export default function Battleship({ toHidden, id, length, direction }) {

    const dispatch = useDispatch();
    const battleships = useSelector((state) => state.battleships);

    const createBattleship = (length) => {
        const squareList = [];
        for (let i = 0; i < length; i++) {
           squareList.push(<Square squareStatus={'occupied'} i={i}/>)
        }
        return squareList;
    };

    // This is to make the battleship draggable. 
    // It will pass the values in the item object to the element that accept the battleship.
    // We can also get some useful values like a boolean about if this element is being dragged, 
    // the inital position of the element, and the position where the mouse clicked.
	const [{ isDragging, clickXY, topXY }, drag] = useDrag(() => ({
        type: "battleship",
        item: {
            id: id,
            length: length, //not used
        },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
            clickXY: monitor.getInitialClientOffset(),
            topXY: monitor.getSourceClientOffset(),
		}),
	}));

    // if the item is being dragged, pass its battleship id, its position information to the 
    // reducer to calculate the dropping information.
    useEffect(() => {
        if (clickXY != null && topXY != null) {
            dispatch(startDrag(clickXY, topXY, battleships[id - 1].direction, 
                battleships[id -1].length, id))
        }
    }, [isDragging]);

    // If this battleship has been dropped on the board. make its display be none.
    let returnDiv;
    if (toHidden) {
        returnDiv = <div id="ship" style={{display: "none"}}>{createBattleship(length)}</div>
    } else {
        returnDiv = 
            <div id="ship" ref={drag} 
                style={{opacity: isDragging ? 0.5 : 1, display: "flex",
                flexDirection: direction}}>
                {createBattleship(length)}
            </div>
    }

    return (
        <div>
            {returnDiv}
        </div>
    )
}