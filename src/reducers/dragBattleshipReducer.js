
const { innerWidth: width, innerHeight: height } = window;



// This is to calculate which square piece on the battleship that the mouse clicked on when we drag a battleship.
export default function dragBattleshipReducer(state=0, action) {
    if (action.type === "startDrag" && action.clickXY && action.topXY) {
        let nthSquare;
        let sideLength;
        if (width > 600) sideLength = 46;
        else sideLength = 30;
        if (action.direction === "column") {
            nthSquare = Math.floor((action.clickXY.y - action.topXY.y) / sideLength) + 1;
        } else {
            nthSquare = Math.floor((action.clickXY.x - action.topXY.x) / sideLength) + 1;
        }
        state = nthSquare;
        return state;
    }
    return state;
}

export function isDragAllDoneReducer(state=false, action) {
    if (action.type === "dragDone") {
        state = true;
        return state;
    }
    return state;
}