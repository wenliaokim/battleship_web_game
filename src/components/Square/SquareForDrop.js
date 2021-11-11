import { useDrop } from "react-dnd";
import { useState } from "react";
import {useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { dropShip } from "../../actions/actions";

export default function SquareForDrop({ squareStatus, i, j }) {

    const dispatch = useDispatch();

    // This state is about which square piece on the battleship the mouse has been clicked on when we drag it.
    const nthSquare = useSelector((state) => state.dragBattleship);
    const battleships = useSelector((state) => state.battleships);

    const [droppedId, setDroppedId] = useState(-1);

    // When the square detected that a battleship is dropped above it, 
    // the square will know which battleship is dropped.
    const [{ isOver, canDrop, didDrop }, drop] = useDrop(() => ({
        accept: "battleship",
        drop: (item) => {
            setDroppedId(item.id);
            console.log("aaa");
            },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            didDrop: !!monitor.didDrop(),
            })
    }));

    // When a battleship is dropped, we send its id, position info of the first square piece to the reducer.
    useEffect(() => {
        if (droppedId !== -1) {
            if (battleships[droppedId - 1].direction === "column") {
                dispatch(dropShip(droppedId, (i - nthSquare + 1), j))
            } else {
                dispatch(dropShip(droppedId, i, (j - nthSquare + 1)))
            }
        }
        setDroppedId(-1);
    }, [droppedId]);

    return (
        <div ref={drop} 
            id="square" className={squareStatus}>
        </div>
    )
}