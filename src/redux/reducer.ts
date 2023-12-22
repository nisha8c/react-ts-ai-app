import {GameState} from "../types/types";

const initialState: GameState = {
    gameHistory: [],
    isPaused: false,
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
        case 'PAUSE_GAME':
            return {
                ...state,
                isPaused: true,
            };
        case 'RESUME_GAME':
            return {
                ...state,
                isPaused: false,
            };
        case 'INITIALIZE_GAME_STATE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default reducer;

/*
if i pause game , it displays only resume button, and if i refresh page, it shows resume button only. But If I have answered 2 right questions and got score 2, and if i pause the game, and if I refresh the page while had some score, the score disappears and sets back to zero and even the question sets back to 1st question

I want the current score and question to stay with the help of redux
 */
