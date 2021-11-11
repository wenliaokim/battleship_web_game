import { dropBoard } from "./battleshipReducer";

const playerBoard = [
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
]

export default function playerBoardReducer(state=playerBoard, action) {
    if (action.type === "finishDrag") {
        state = [...dropBoard];
        return [...state];
    }
    return state;
}