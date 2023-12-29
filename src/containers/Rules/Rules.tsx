import React from 'react';
import { motion } from 'framer-motion';
import AppWrap from "../../wrapper/AppWrap";
import './Rules.scss'; // Import your SCSS file

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

    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={listVariants}
            className={'rules-page'}
        >
            <h1>Rules</h1>
            <motion.ul transition={{ staggerChildren: 0.2 }}>
                {textLines.map((line, index) => (
                    <motion.li key={index} variants={listItemVariants}>
                        {line}
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
}

export default AppWrap(Rules, 'rules-page', 'rules-page');
