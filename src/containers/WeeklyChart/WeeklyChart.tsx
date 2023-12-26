// import {ArrowLeft, ArrowRight} from "@mui/icons-material";

import React, {useEffect, useRef, useCallback, useState} from 'react';
import { Link } from "react-router-dom";
import {Button, IconButton} from "@mui/material";
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getISOWeek, startOfWeek, endOfWeek, isWithinInterval, addWeeks, subWeeks } from 'date-fns';
import {ArrowLeft, ArrowRight} from "@mui/icons-material";
import AppWrap from "../../wrapper/AppWrap";
import { Chart, registerables } from 'chart.js';
import './WeeklyChart.scss';
import {GameEntry} from "../../types/types";

Chart.register(...registerables);

let myChart: Chart | null = null;

const WeeklyChart = () => {
    const gameHistory = useSelector((state: any) => state.historyReducer.gameHistory);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const validEntries = gameHistory.filter((entry: GameEntry) => entry.level);
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

    const destroyChart = useCallback(() => {
        if (myChart) {
            myChart.destroy();
            myChart = null;
        }
    }, []);

    const calculateTotalScore = (level: string, day: number, weekStart: Date) => {
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
        const filteredEntries = validEntries
            .filter((entry: GameEntry) => {
                const timestamp = new Date(entry.timestamp);
                const entryDay = timestamp.getDay();
                return entry.level === level && entryDay === Number(day) && isWithinInterval(timestamp, { start: weekStart, end: weekEnd });
            });

        return filteredEntries.reduce((total: number, entry: GameEntry) => total + entry.score, 0);
    };

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            const nonBlankLevelData = gameHistory.filter((entry: GameEntry) => entry.level !== null);

            if (nonBlankLevelData.length === 0) {
                destroyChart();
                return;
            }

            destroyChart();

            if (ctx) {
                myChart = new Chart(ctx, {
                    type: 'bar',
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                    },
                    data: {
                        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        datasets: [
                            {
                                label: 'Easy',
                                data: [0, 1, 2, 3, 4, 5, 6].map(day => calculateTotalScore('Easy', day, currentWeekStart)),
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Medium',
                                data: [0, 1, 2, 3, 4, 5, 6].map(day => calculateTotalScore('Medium', day, currentWeekStart)),
                                backgroundColor: 'rgba(192,75,75,0.4)',
                                borderColor: 'rgba(192,75,75,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Difficult',
                                data: [0, 1, 2, 3, 4, 5, 6].map(day => calculateTotalScore('Difficult', day, currentWeekStart)),
                                backgroundColor: 'rgba(75,75,192,0.4)',
                                borderColor: 'rgba(75,75,192,1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                });
            }
        }

        return destroyChart;
    }, [canvasRef, gameHistory, destroyChart, currentWeekStart]);

    return (
        <div className={'chart-page'}>
            <div className={'chart-header'}>
                <h1>Week: {getISOWeek(currentWeekStart)}</h1>
                <div>
                    <IconButton onClick={() => setCurrentWeekStart(weekStart => subWeeks(weekStart, 1))}>
                        <ArrowLeft />
                    </IconButton>
                    <IconButton onClick={() => setCurrentWeekStart(weekStart => addWeeks(weekStart, 1))}>
                        <ArrowRight />
                    </IconButton>
                </div>
                <Link to="/protected"><Button variant={"outlined"} size={"large"}>Return Home</Button></Link>
            </div>

            <canvas ref={canvasRef} className={'chart-canvas'} />
        </div>
    );
}

export default AppWrap(WeeklyChart, 'chart-page', 'chart-page');
