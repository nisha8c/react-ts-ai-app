import React from 'react';
import { motion } from 'framer-motion';

function PageNotFound() {
    return (
        <motion.div
                    whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                    transition={{ duration: 0.5 }}
        >
            <h1>404 - Page not Found</h1>
            <p>Please check the path</p>
        </motion.div>
    );
}
export default PageNotFound;