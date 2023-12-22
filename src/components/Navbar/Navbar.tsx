import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Button from "@mui/material/Button";
import { UserButton } from "@clerk/clerk-react";
import { images } from '../../assets/index';
import './Navbar.scss';
import {Link, useNavigate} from "react-router-dom";
import {NavItemProps} from "../../types/types";

const NavItem = ({ label, path, onClick }: NavItemProps) => (
    <li className="app__flex p-text">
        <div />
        <Button onClick={onClick}>{label}</Button>
    </li>
);

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { label: 'Home', path: '/protected' },
        { label: 'Game History', path: '/gameHistory' },
        { label: 'Weekly Chart', path: '/chart' },
    ];

    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <Link to="/protected">
                    <img src={images.logo} alt="logo" />
                </Link>
            </div>

            <ul className="app__navbar-links">
                {navItems.map(item => (
                    <NavItem
                        key={item.path}
                        label={item.label}
                        path={item.path}
                        onClick={() => {
                            setMenuOpen(false);
                            navigate(item.path);
                        }}
                    />
                ))}
            </ul>

            <div className="app__navbar-menu">
                <HiMenuAlt4 onClick={() => setMenuOpen(true)} />

                {isMenuOpen && (
                    <motion.div
                        whileInView={{ x: [300, 0] }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                    >
                        <HiX onClick={() => setMenuOpen(false)} />
                        <ul>
                            {navItems.map(item => (
                                <NavItem
                                    key={item.path}
                                    label={item.label}
                                    path={item.path}
                                    onClick={() => {
                                        setMenuOpen(false);
                                        navigate(item.path);
                                    }}
                                />
                            ))}
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
