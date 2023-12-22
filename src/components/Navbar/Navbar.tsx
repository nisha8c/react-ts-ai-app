import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Button from "@mui/material/Button";
import {UserButton} from "@clerk/clerk-react";

import {images} from '../../assets/index';
import './Navbar.scss';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <img src={images.logo} alt="logo" />
            </div>
            <ul className="app__navbar-links">
                <li className="app__flex p-text">
                    <div />
                    <Button onClick={() => navigate('/gameHistory')}>Game History</Button>
                </li>
                <li className="app__flex p-text">
                    <div />
                    <Button onClick={() => navigate('/page2')}>Go to Page 2</Button>
                </li>
            </ul>

            <div className="app__navbar-menu">
                <HiMenuAlt4 onClick={() => setToggle(true)} />

                {toggle && (
                    <motion.div
                        whileInView={{ x: [300, 0] }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                    >
                        <HiX onClick={() => setToggle(false)} />
                        <ul>
                            <li>
                                <Button onClick={() => { setToggle(false); navigate('/gameHistory'); }}>Game History</Button>
                            </li>
                            <li>
                                <Button onClick={() => { setToggle(false); navigate('/page2'); }}>Go to Page 2</Button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </div>
            <div className="app__navbar-logo">
                <UserButton />
            </div>
        </nav>
    );
};

export default Navbar;