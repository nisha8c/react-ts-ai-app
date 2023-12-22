import {GameState} from "../types/types";
export const setGameHistory = (history: any) => ({
    type: 'SET_GAME_HISTORY',
    payload: history,
});

// New action type and action creator for clearing game history
export const clearGameHistory = () => ({
    type: 'CLEAR_GAME_HISTORY',
});
export const pauseGame = () => ({
    type: 'PAUSE_GAME',
});

export const resumeGame = () => ({
    type: 'RESUME_GAME',
});

// New action to initialize game state from local storage
export const initializeGameState = (state: GameState) => ({
    type: 'INITIALIZE_GAME_STATE',
    payload: state,
});
