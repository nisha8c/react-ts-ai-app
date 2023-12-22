import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import AppWrap from "../../wrapper/AppWrap";
import { Chart, registerables } from 'chart.js';
import './WeeklyChart.scss'

Chart.register(...registerables);

let myChart: Chart | null = null;

const WeeklyChart = () => {
    const gameHistory = useSelector((state: any) => state.historyReducer.gameHistory);
    console.log('gameHistory:::: ', gameHistory);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const destroyChart = useCallback(() => {
        if (myChart) {
            myChart.destroy();
            myChart = null;
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Check if there is a non-blank level in the gameHistory
            const nonBlankLevelData = gameHistory.filter((entry: any) => entry.level !== null);

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
                    data: {
                        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        datasets: [
                            {
                                label: 'Score',
                                data: [0, 0, 0, 0, 0, nonBlankLevelData.reduce((total: number, entry: { score: number }) => total + entry.score, 0), 0],
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
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
