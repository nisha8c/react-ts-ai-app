import {useNavigate} from "react-router-dom";
import React from "react";
import Button from "@mui/material/Button";
import { motion } from 'framer-motion';
import AppWrap from "../../wrapper/AppWrap";
import './welcome.scss'
import {images} from '../../assets/index';
function Welcome() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/protected');
    }
    return (
        <>
            <motion.div className="welcome">
                <header className="App-header">
                    <motion.img
                        whileInView={{ scale: [0, 1] }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        src={images.gcLogo} className="app__app-logo" alt="logo" />
                    <Button variant="outlined" size="large" onClick={handleClick}>Let's Start!</Button>
                </header>
            </motion.div>
        </>
    );
}

export default AppWrap(Welcome, 'welcome', 'welcome');