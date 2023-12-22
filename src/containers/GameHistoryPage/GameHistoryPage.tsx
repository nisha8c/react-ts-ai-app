import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import AppWrap from "../../wrapper/AppWrap";
import {Button} from "@mui/material";
import {clearGameHistory} from "../../redux/actions";

const GameHistoryPage = () => {
    const dispatch = useDispatch();
    const gameHistory = useSelector((state: any) => state.historyReducer.gameHistory);
    console.log('gameHistory:: ', gameHistory);

    const handleClearHistory = () => {
        // Dispatch the action to clear the game history
        dispatch(clearGameHistory());
    };

    return (
        <div className={'history-page'}>
            <h1>Game History</h1>
            <ul>
                {gameHistory.map((entry: any, index: number) => (
                    // Check if the 'level' is not blank before rendering the <li> element
                    entry.level && (
                        <li key={index}>
                            <p>Level: {entry.level}</p>
                            <p>Score: {entry.score}</p>
                            <p>Timestamp: {entry.timestamp}</p>
                        </li>
                    )
                ))}
            </ul>

            <Button variant={"outlined"} size={"large"} onClick={handleClearHistory}>
                Clear Game History
            </Button>

            <Button variant={"outlined"} size={"large"}>
                <Link to="/protected">Go Back to Game Page</Link>
            </Button>
        </div>
    );
};

export default AppWrap(GameHistoryPage, 'history-page', 'history-page');
