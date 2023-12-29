import React from 'react';
import { motion } from 'framer-motion';
import AppWrap from "../../wrapper/AppWrap";

function Rules() {
    return (
        <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className={'rules-page'}
        >
            <h1>Rules</h1>
        </motion.div>
    );
}
export default AppWrap(Rules, 'rules-page', 'rules-page');