import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import AppWrap from "../../wrapper/AppWrap";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let myChart: Chart | null = null;

const WeeklyChart = () => {
    const gameHistory = useSelector((state: any) => state.historyReducer.gameHistory);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Destroy the previous chart before creating a new one
            if (myChart) {
                myChart.destroy();
            }

            // Create a new chart
            if (ctx) {
                myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        datasets: [
                            {
                                label: 'Score',
                                data: [0, 0, 0, 0, 0, 0, 0], // This will be replaced with actual data
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                });
            }
        }
    }, [canvasRef, gameHistory]);

    return (
        <div className={'chart-page'}>
            <h2>Weekly Chart</h2>
            <canvas ref={canvasRef} />
            <Button variant={"outlined"} size={"large"}>
                <Link to="/protected">Go Back to Game Page</Link>
            </Button>
        </div>
    );
}

export default AppWrap(WeeklyChart, 'chart-page', 'chart-page');
