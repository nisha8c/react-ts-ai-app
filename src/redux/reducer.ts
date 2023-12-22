interface GameState {
    gameHistory: any[]; // You can replace 'any' with a more specific type if needed
}

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
