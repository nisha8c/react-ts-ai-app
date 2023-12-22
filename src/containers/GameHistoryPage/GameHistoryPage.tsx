import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import AppWrap from "../../wrapper/AppWrap";
import {Button} from "@mui/material";
import {clearGameHistory} from "../../redux/actions";
import CustomCard from "../../components/CustomCard/CustomCard";
import './GameHistory.scss'
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
            <div className={'cards-panel'}>
                {gameHistory.map((entry: any, index: number) => (
                    // Check if the 'level' is not blank before rendering the card
                    entry.level && (
                        <CustomCard
                            key={index}
                            title={`Level: ${entry.level}`}
                            description={`Score: ${entry.score}, Timestamp: ${entry.timestamp}`}
                        />
                    )
                ))}
            </div>


            <Button variant={"outlined"} size={"large"} onClick={handleClearHistory}>
                Clear Game History
            </Button>

            <Link to="/protected"><Button variant={"outlined"} size={"large"}>Return Home</Button></Link>

        </div>
    );
};

export default AppWrap(GameHistoryPage, 'history-page', 'history-page');
