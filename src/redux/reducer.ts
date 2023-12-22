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
        default:
            return state;
    }
};

export default reducer;
