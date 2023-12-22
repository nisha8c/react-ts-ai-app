import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppWrap from "../../wrapper/AppWrap";
import {Button} from "@mui/material";

const GameHistoryPage = () => {
    const gameHistory = useSelector((state: any) => state.historyReducer.gameHistory);
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

            <Button variant={"outlined"} size={"large"}>
                <Link to="/protected">Go Back to Game Page</Link>
            </Button>
        </div>
    );
};

export default AppWrap(GameHistoryPage, 'history-page', 'history-page');
