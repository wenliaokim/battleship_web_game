import { combineReducers } from 'redux';
import showRulesReducer from './showRulesReducer';
import aiBoardReducer from './aiBoardReducer';
import playerBoardReducer from './playerBoardReducer';

const reducers = combineReducers (
    {
       rules: showRulesReducer,
       aiBoard: aiBoardReducer,
       playerBoard: playerBoardReducer
    }
);

export default reducers;
