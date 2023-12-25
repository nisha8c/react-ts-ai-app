import React, {useEffect, useRef, useCallback, useState} from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import AppWrap from "../../wrapper/AppWrap";
import { Chart, registerables } from 'chart.js';
import { getISOWeek } from 'date-fns';
import './WeeklyChart.scss';
import {GameEntry} from "../../types/types";

Chart.register(...registerables);

let myChart: Chart | null = null;

const WeeklyChart = () => {
    const gameHistory = useSelector((state: any) => state.historyReducer.gameHistory);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Create a new array that only includes entries with a non-null, non-empty level
    const validEntries = gameHistory.filter((entry: GameEntry) => entry.level);
    //console.log('All dates:', validEntries.map((entry: GameEntry) => entry.timestamp));

    const destroyChart = useCallback(() => {
        if (myChart) {
            myChart.destroy();
            myChart = null;
        }
    }, []);

    const calculateTotalScore = (level: string, day: number) => {
        console.log('validEntries:: ', validEntries);
        const filteredEntries = validEntries
            .filter((entry: GameEntry) => {

                // Check if entry.timestamp is not undefined and not an empty string
                if (!entry.timestamp || entry.timestamp.trim() === '') {
                    console.log(`Invalid timestamp: ${entry.timestamp}`);
                    return false;
                }

                console.log('Original timestamp:', entry.timestamp);

                // Attempt to parse the timestamp as DD/MM/YYYY, HH:mm:ss
                const [dateStr, timeStr] = entry.timestamp.split(', ');
                const [dayStr, monthStr, yearStr] = dateStr.split('/');
                const parsedDate = new Date(`${monthStr} ${dayStr} ${yearStr} ${timeStr}`);

                // Check if the parsed date is valid
                if (!isNaN(parsedDate.getTime())) {
                    // Successfully parsed as DD/MM/YYYY, HH:mm:ss
                    const entryDay = parsedDate.getDay(); // 0-6, where 0 is Sunday
                    const isMatch = entry.level === level && entryDay === Number(day);
                    console.log('Parsed date:', parsedDate, 'Comparison:', isMatch ? 'Match' : 'No Match');
                    return isMatch;
                } else {
                    // Try parsing the timestamp as ISO 8601
                    const isoDate = new Date(entry.timestamp);
                    if (!isNaN(isoDate.getTime())) {
                        // Successfully parsed as ISO 8601
                        const entryDay = isoDate.getDay(); // 0-6, where 0 is Sunday
                        const isMatch = entry.level === level && entryDay === Number(day);
                        console.log('Parsed date (ISO 8601):', isoDate, 'Comparison:', isMatch ? 'Match' : 'No Match');
                        return isMatch;
                    } else {
                        // Both parsing attempts failed
                        console.log('Invalid timestamp format');
                        return false;
                    }
                }
            });

        const totalScore = filteredEntries
            .reduce((total: number, entry: GameEntry) => total + entry.score, 0);
        console.log(`Total score for level ${level} on day ${day}:`, totalScore);
        return totalScore;
    };



    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Check if there is a non-blank level in the gameHistory
            const nonBlankLevelData = gameHistory.filter((entry: GameEntry) => entry.level !== null);

            if (nonBlankLevelData.length === 0) {
                // No non-blank level found, destroy the chart and return
                destroyChart();
                return;
            }

            // Destroy the previous chart before creating a new one
            destroyChart();

            // Create a new chart
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
                                data: [0, 1, 2, 3, 4, 5, 6].map(day => calculateTotalScore('Easy', day)),
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Medium',
                                data: [0, 1, 2, 3, 4, 5, 6].map(day => calculateTotalScore('Medium', day)),
                                backgroundColor: 'rgba(192,75,75,0.4)',
                                borderColor: 'rgba(192,75,75,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Difficult',
                                data: [0, 1, 2, 3, 4, 5, 6].map(day => calculateTotalScore('Difficult', day)),
                                backgroundColor: 'rgba(75,75,192,0.4)',
                                borderColor: 'rgba(75,75,192,1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                });
            }
        }
        // Cleanup function to destroy the chart when the component is unmounted or dependencies change
        return destroyChart;
    }, [canvasRef, gameHistory, destroyChart]);

    return (
        <div className={'chart-page'}>
            <div className={'chart-header'}>
                <h2>Weekly Chart</h2>
                <Link to="/protected"><Button variant={"outlined"} size={"large"}>Return Home</Button></Link>
            </div>

            <canvas ref={canvasRef} className={'chart-canvas'} />
        </div>
    );
}

export default AppWrap(WeeklyChart, 'chart-page', 'chart-page');
