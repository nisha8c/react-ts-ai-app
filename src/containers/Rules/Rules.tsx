import React from 'react';
import { motion } from 'framer-motion';
import AppWrap from "../../wrapper/AppWrap";

function Rules() {
    const textLines = [
        'The game has three levels of questions, and user can freely choose their level.',
        'At a time, every level will have 10 questions, and once the \'Game Over\' dialogue is displayed, only then points of that level will get registered in the history and chart.',
        'User can either type in the answers or press speaker button to record answers.',
        'When one level button is clicked, other level buttons get disabled.',
        'Users can select same level again after attempting once, but the next attempt will have the next 10 questions of the same level.',
        'Chart displays average score of every level for everyday of the week.',
        'User can delete the game history log. This will delete the chart too.',
        'AI can be used to get the hint or more information.',
    ];
    return (
        <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className={'rules-page'}
        >
            <h1>Rules</h1>
            <ul>
                {textLines.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
        </motion.div>
    );
}
export default AppWrap(Rules, 'rules-page', 'rules-page');