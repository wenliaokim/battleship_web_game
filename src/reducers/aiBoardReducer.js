const defaultAiState = {
    showBoard:[
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
            ],
    ships: 17,
}

const generateDefaultSate = () => {
    let board = JSON.parse(JSON.stringify(defaultAiState.showBoard));
    return {showBoard: board, ships: defaultAiState.ships};
}

const isSpace = (board, i, j, isVertical, length) => {
    if (isVertical) {
        for (let k = 0; k < length; k++) {
            if (board[i + k][j] !== '') {
                return false;
            } 
        }
        return true;
    } else {
        for (let k = 0; k < length; k++) {
            if (board[i][j + k] !== '') {
                return false;
            } 
        }
        return true;
    }
}

const putBattleship = (board, i, j, isVertical, length) => {
    if (isVertical) {
        for (let k = 0; k < length; k++) {
            board[i + k][j] = "occupied";
        }
    }
    else {
        for (let k = 0; k < length; k++) {
            board[i][j + k] = "occupied";
        }
    }
    return board;
}

export const randomBoard = () => {
    let newState = generateDefaultSate();
    let board = newState.showBoard;
    let shipsInfo = [];
    for (let k = 5; k >= 2; k--) {
        let battshipNum = 1;
        if (k === 3) {
            battshipNum = 2;
        }
        while (battshipNum != 0) {
            let isVertical = Math.random() < 0.5;
            let i;
            let j;
            if (isVertical) {
                i = Math.floor(Math.random() * (k + 1));
                j = Math.floor(Math.random() * 10);
            } else {
                i = Math.floor(Math.random() * 10);
                j = Math.floor(Math.random() * (k + 1));
            }
            if (isSpace(board, i, j, isVertical, k)) {
                shipsInfo.push({num:battshipNum, length:k, i:i, j:j, isVertical:isVertical});
                board = putBattleship(board, i, j, isVertical, k);
                battshipNum--;
            }
        }
    }
    return {newState:newState, shipsInfo:shipsInfo};
}

export default function aiBoardReducer(state, action) {
    if (state === undefined) {
        state = (randomBoard()).newState;
        return state;
    }
    if(action.type === 'boardClick') {
        const board = state.showBoard;
        const value = board[action.x][action.y];
        if(value === ''){
            board[action.x][action.y] = 'missed';
        } else if(value === 'occupied'){
            board[action.x][action.y] = 'attacked';
            state.ships--;
        }
        return {showBoard: [...board], ships: state.ships};
    }
    return state;
}