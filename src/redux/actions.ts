export const setGameHistory = (history: any) => ({
    type: 'SET_GAME_HISTORY',
    payload: history,
});

// New action type and action creator for clearing game history
export const clearGameHistory = () => ({
    type: 'CLEAR_GAME_HISTORY',
});
