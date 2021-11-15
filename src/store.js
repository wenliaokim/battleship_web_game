import { createStore } from "redux";
import reducers from "./reducers/reducers";

function saveToLocalStorage(state) {
    try {
        localStorage.setItem("state", JSON.stringify(state));
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("state");
        return serialisedState ? JSON.parse(serialisedState) : undefined;
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const store = createStore(reducers, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export function removeLocalStorage() {
    localStorage.removeItem("state");
}

export default store;