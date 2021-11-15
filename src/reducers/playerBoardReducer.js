import { dropBoard } from "./battleshipReducer";

const defaultPlayerBoard = {
    yourBoard: [
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
    spotsToHit:[],
}

function generateDefaultState() {
    let board = JSON.parse(JSON.stringify(defaultPlayerBoard.yourBoard));
    return {
            yourBoard: board, 
            ships: defaultPlayerBoard.ships, 
            spotsToHit: JSON.parse(JSON.stringify(calculateSpots()))
        };
}

function calculateSpots() {
    let spots = []
    for(let i = 0; i < 99; i++) {
        spots.push(i);
    }
    return spots;
}


export default function playerBoardReducer(state, action) {
    if (state === undefined) {
        state = generateDefaultState();
        return state;
    }
    if (action.type === "finishDrag") {
        const newBoard = [...dropBoard];
        return {
            yourBoard: [...newBoard], 
            ships: state.ships, 
            spotsToHit: state.spotsToHit
        };
    }

    if(action.type === "playerBoardUpdate") {
        const len = state.spotsToHit.length;
        const index = Math.floor(Math.random() * len);
        const x = Math.floor(state.spotsToHit[index] / 10);
        const y = state.spotsToHit[index] % 10;
        state.spotsToHit.splice(index, 1);
        if(state.yourBoard[x][y] === 'occupied') {
            state.yourBoard[x][y] = 'attacked';
            state.ships--;
        }
        if(state.yourBoard[x][y] === '') {
            state.yourBoard[x][y] = 'missed';
        }
        return {
            yourBoard: [...state.yourBoard], 
            ships: state.ships, 
            spotsToHit: [...state.spotsToHit]
        };
    }
    return state;
}