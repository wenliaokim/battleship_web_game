import aiBoardReducer from "./aiBoardReducer";
import { dropBoard } from "./battleshipReducer";



const playerBoard = {
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


function calculateSpots() {
    let spots = []
    for(let i = 0; i < 99; i++) {
        spots.push(i);
    }
    return spots;
}


export default function playerBoardReducer(state=playerBoard, action) {
    if (action.type === "finishDrag") {
        const newBoard = [...dropBoard];
        const spots = calculateSpots(newBoard);
        return {yourBoard: [...newBoard], ships: playerBoard.ships, spotsToHit: [...spots]};
    }


    if(action.type === "playerBoardUpdate") {
        const len = state.spotsToHit.length;
        const index = Math.floor(Math.random() * len);
        const x = Math.floor(state.spotsToHit[index] / 10);
        const y = state.spotsToHit[index] % 10;
        state.spotsToHit.splice(index, 1);
        if(state.yourBoard[x][y] === 'occupied') {
            state.yourBoard[x][y] = 'attacked';
            playerBoard.ships--;
        }
        if(state.yourBoard[x][y] === '') {
            state.yourBoard[x][y] = 'missed';
        }
        return {yourBoard: [...state.yourBoard], ships: playerBoard.ships, spotsToHit: [...state.spotsToHit]}
    }

    return state;
}