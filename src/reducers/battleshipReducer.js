// top and left represent the css position values of dropped battleships in terms of the board.

import { randomBoard } from "./aiBoardReducer";

const { innerWidth: width, innerHeight: height } = window;

// i and j represent the square where the first piece of the battleship is on the board.
const defaultBattleships = [
    {
        id: 1,
        length: 5,
        dropped: false,
        direction: "column",
        top: 0,
        left: 0,
        i: -1,
        j: -1,
    },
    {
        id: 2,
        length: 4,
        dropped: false,
        direction: "column",
        top: 0,
        left: 0,
        i: -1,
        j: -1,
    },
    {
        id: 3,
        length: 3,
        dropped: false,
        direction: "column",
        top: 0,
        left: 0,
        i: -1,
        j: -1,
    },
    {
        id: 4,
        length: 3,
        dropped: false,
        direction: "column",
        top: 0,
        left: 0,
        i: -1,
        j: -1,
    },
    {
        id: 5,
        length: 2,
        dropped: false,
        direction: "column",
        top: 0,
        left: 0,
        i: -1,
        j: -1,
    },
];

const defaultDropBoard = [
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
];

export let dropBoard;

dropBoard = JSON.parse(JSON.stringify(defaultDropBoard));

export default function battleshipReducer(state=defaultBattleships, action) {
    if (action.type === "dropBattleship" && action.id > 0) {
        let toDrop = state[action.id - 1];
        let newBoard = JSON.parse(JSON.stringify(dropBoard));

        // To modify the board status if the to-drop battleship is already on the board.
        if (toDrop.i !== -1 && toDrop.j !== -1) {
            newBoard = cleanBoard(newBoard, toDrop.i, toDrop.j, toDrop.direction, toDrop.length);
        }
    
        // to check if the to-drop battleship will beyond the board.
        if (isBeyondBoard(newBoard, action.i, action.j, toDrop.direction, toDrop.length))
            return [...state];

        // to check if the to-drop battleship will overlap other battleships on the board.
        if (isSquareOccupied(newBoard, action.i, action.j, toDrop.direction, toDrop.length))
            return [...state];

        // if dropping is allowed, change the board status.
        newBoard = addToBoard(newBoard, action.i, action.j, toDrop.direction, toDrop.length);

        dropBoard = newBoard;

        // change the battleship's attributes.
        let sideLength;
        if (width > 600) sideLength = 46;
        else sideLength = 30;
        state[action.id - 1].dropped = true;
        state[action.id - 1].top = sideLength * action.i;
        state[action.id - 1].left = sideLength * action.j;
        state[action.id - 1].i = action.i;
        state[action.id - 1].j = action.j;

        return [...state];
    }

    if (action.type === "changeDirection") {
        let toChange = state[action.id - 1];
        let newBoard = JSON.parse(JSON.stringify(dropBoard));

        if (toChange.direction === "column") {
            newBoard = cleanBoard(newBoard, toChange.i, toChange.j,"column", toChange.length);

            if (isBeyondBoard(newBoard, toChange.i, toChange.j, "row", toChange.length)) return state;
            if (isSquareOccupied(newBoard, toChange.i, toChange.j, "row", toChange.length)) return state;
            
            dropBoard = addToBoard(newBoard, toChange.i, toChange.j,"row", toChange.length);
            state[action.id - 1].direction = "row";
        } 
        else {
            newBoard = cleanBoard(newBoard, toChange.i, toChange.j, "row", toChange.length);
            if (isBeyondBoard(newBoard, toChange.i, toChange.j, "column", toChange.length)) return state;
            if (isSquareOccupied(newBoard, toChange.i, toChange.j, "column", toChange.length)) return state;

            dropBoard = addToBoard(newBoard, toChange.i, toChange.j, "column", toChange.length);
            state[action.id - 1].direction = "column";
        }
        return [...state];
    }

    if (action.type == "randomlyPutShips") {
        let sideLength;
        if (width > 600) sideLength = 46;
        else sideLength = 30;
        const newShips = JSON.parse(JSON.stringify(defaultBattleships));
        const randomInfo = randomBoard();
        dropBoard = JSON.parse(JSON.stringify(randomInfo.newState.showBoard));
        const shipsInfo = randomInfo.shipsInfo;

        for (let i = 0; i < 5; i++) {
            let id = 5 - shipsInfo[i].length + shipsInfo[i].num;
            if (shipsInfo[i].length === 2) id++;
            newShips[id - 1].dropped = true;
            newShips[id - 1].top = sideLength * shipsInfo[i].i;
            newShips[id - 1].left = sideLength * shipsInfo[i].j;
            newShips[id - 1].i = shipsInfo[i].i;
            newShips[id - 1].j = shipsInfo[i].j;
            if (shipsInfo[i].isVertical) 
                newShips[id - 1].direction = "column";
            else 
                newShips[id - 1].direction = "row";
        }
        state = [...newShips];
        return [...state];
    }

    return state;
};


// To indicate which battleship has been clicked and ready for change direction.
export function clickBattleshipReducer(state=-1, action) {
    if (action.type === "clickBattleship") {
        if (action.id === state) state = -1;
        else state = action.id;
        return state;
    }
    return state;
}



// helper function.
function isSquareOccupied(board, i, j, direction, length) {
    for (let k = 0; k < length; k++) {
        if (direction === "column") {
            if (board[i + k][j] === "occupied") return true;
        } else {
            if (board[i][j + k] === "occupied") return true;
        }
    }
    return false;
}

// helper function.
function isBeyondBoard(board, i, j, direction, length) {
    if (direction === "column") {
        if (i < 0 || i + length > 10) return true;
    } else {
        if (j < 0 || j + length > 10) return true;
    }
    return false;
}

// helper function.
function cleanBoard(board, i, j, direction, length) {

    for (let k = 0; k < length; k++) {
        if (direction === "column") {
            board[i + k][j] = "";
        }
        else board[i][j + k] = "";
    }
    return board;
}

// helper function.
function addToBoard(board, i, j, direction, length) {
    for (let k = 0; k < length; k++) {
        if (direction === "column") board[i + k][j] = "occupied";
        else board[i][j + k] = "occupied";
    }
    return board;
}


