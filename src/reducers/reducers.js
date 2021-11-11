import { combineReducers } from 'redux';
import showRulesReducer from './showRulesReducer';
import aiBoardReducer from './aiBoardReducer';
import playerBoardReducer from './playerBoardReducer';
import dragBattleshipReducer, { isDragAllDoneReducer } from './dragBattleshipReducer';
import battleshipReducer, { clickBattleshipReducer } from './battleshipReducer';

const reducers = combineReducers (
    {
       rules: showRulesReducer,
       aiBoard: aiBoardReducer,
       playerBoard: playerBoardReducer,
       dragBattleship: dragBattleshipReducer,
       battleships: battleshipReducer,
       clickedShip: clickBattleshipReducer,
       isDragAllDone: isDragAllDoneReducer,
    }
);

export default reducers;
