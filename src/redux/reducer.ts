import {GameState} from "../types/types";

const initialState: GameState = {
    gameHistory: [],
};

const reducer = (state: GameState = initialState, action: any) => {
    switch (action.type) {
        case 'SET_GAME_HISTORY':
            return {
                ...state,
                gameHistory: [...state.gameHistory, action.payload],
            };
        case 'CLEAR_GAME_HISTORY':
            return {
                ...state,
                gameHistory: [],
            };
        default:
            return state;
    }
};

export default reducer;
