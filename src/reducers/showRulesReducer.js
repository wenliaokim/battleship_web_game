
export default function showRulesReducer(state=false, action) {
    if (action.type === 'changeShowRule') {
        state = !state;
        return state;
    }
    return state;
};