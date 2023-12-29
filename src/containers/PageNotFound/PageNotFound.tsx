import React from 'react';
import { motion } from 'framer-motion';
import AppWrap from "../../wrapper/AppWrap";

function PageNotFound() {
    return (
        <motion.div
                    whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                    transition={{ duration: 0.5 }}
                    className={'404-page'}
        >
            <h1>404 - Page not Found</h1>
            <p>Please check the path</p>
        </motion.div>
    );
}
export default AppWrap(PageNotFound, '404-page', '404-page');