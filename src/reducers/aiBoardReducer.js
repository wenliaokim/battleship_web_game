const aiState = {
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

let initialState = [
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

const randomBoard = () => {
    let board = JSON.parse(JSON.stringify(aiState.showBoard));
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
                board = putBattleship(board, i, j, isVertical, k);
                battshipNum--;
            }
        }
    }
    initialState = JSON.parse(JSON.stringify(board));
    return {showBoard: board, ships: aiState.ships};
}

export default function aiBoardReducer(state, action) {
    if (state === undefined) {
        state = randomBoard();
        return state;
    }

    if(action.type === 'home') {
        state = randomBoard();
        aiState.ships = 17;
        return {showBoard: [...state.showBoard], ships: aiState.ships}
    }

    if(action.type === 'reset') {
        aiState.ships = 17
        return {showBoard: JSON.parse(JSON.stringify(initialState)), ships: aiState.ships}
    }

    if(action.type === 'boardClick') {
      //  console.log('123');
        const board = state.showBoard;
        const value = board[action.x][action.y];
        if(value === ''){
            board[action.x][action.y] = 'missed';
        } else if(value === 'occupied'){
            board[action.x][action.y] = 'attacked';
            aiState.ships--;
        }
        return {showBoard: [...board], ships: aiState.ships};
    }

    return state;
}