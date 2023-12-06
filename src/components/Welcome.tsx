import {useNavigate} from "react-router-dom";
import React from "react";
import logo from "../Nisha_Logo.png";
import Button from "@mui/material/Button";

function Welcome() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/protected');
    }
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Button variant="contained" size="large" onClick={handleClick}>Let's Start!</Button>
                </header>
            </div>
        </>
    );
}

export default Welcome;