import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import AppWrap from "../../wrapper/AppWrap";
function WeeklyChart() {
    return (
        <div className={'chart-page'}>
            <Button variant={"outlined"} size={"large"}>
                <Link to="/protected">Go Back to Game Page</Link>
            </Button>
        </div>
    );
}
export default AppWrap(WeeklyChart, 'chart-page', 'chart-page');