import React from 'react';
import { useSelector } from 'react-redux';
import AppWrap from "../../wrapper/AppWrap";

const GameHistoryPage = () => {
    const gameHistory = useSelector((state: any) => state.gameHistory);
    console.log('gameHistory:: ', gameHistory);

    return (
        <div className={'history-page'}>
            <h1>Game History</h1>
            <ul>
                {gameHistory.map((entry: any, index: number) => (
                    <li key={index}>
                        <p>Level: {entry.level}</p>
                        <p>Score: {entry.score}</p>
                        <p>Timestamp: {entry.timestamp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppWrap(GameHistoryPage, 'history-page', 'history-page');
