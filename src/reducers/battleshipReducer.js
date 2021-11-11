// top and left represent the css position values of dropped battleships in terms of the board.
// i and j represent the square where the first piece of the battleship is on the board.
const defaultBattleships = [
    {
        id: 1,
        length: 5,
        dropped: false,
        isDragging: false,
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
        isDragging: false,
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
        isDragging: false,
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
        isDragging: false,
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
        isDragging: false,
        direction: "column",
        top: 0,
        left: 0,
        i: -1,
        j: -1,
    },
];


export let dropBoard = [
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

export default function battleshipReducer(state=defaultBattleships, action) {
    if (action.type === "dropBattleship" && action.id > 0) {
        state[action.id - 1].isDragging = false;
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
        state[action.id - 1].dropped = true;
        state[action.id - 1].top = 49 * action.i;
        state[action.id - 1].left = 49 * action.j;
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

    if (action.type === "startDrag") {
        state[action.id - 1].isDragging = true;
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
        if (direction === "column") board[i + k][j] = "";
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


