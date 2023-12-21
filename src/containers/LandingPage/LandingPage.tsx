import React, {useEffect, useState} from "react";
import AppWrap from "../../wrapper/AppWrap";
import { urlFor, client } from '../../client';
import { motion } from 'framer-motion';
import './LandingPage.scss'
import {AlertColor} from "@mui/material";
import { InputLabel } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {ICountry} from "../../types/types";

import SimpleDialog from "../../components/SimpleDialog/SimpleDialog";
import QuestionForm from "../../components/QuestionForm/QuestionForm";

const scaleVariants = {
    whileInView: {
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
};

function LandingPage() {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    // Add a new piece of state for the score
    const [score, setScore] = useState(0);

    // state for the correct answer
    const [correctAnswer, setCorrectAnswer] = useState<string>('');

    // Add a new piece of state to track the disabling state
    const [isDisabled, setIsDisabled] = useState(false);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Fetch the data from Sanity
    useEffect(() => {
        client
            .fetch('*[_type == "countries"]')
            .then((data) => {
                console.log("DATATATAA", data)
                setCountries(data);
                console.log("COUNTRIES: ", countries)
            })
            .catch(console.error);

    }, []);

    // Focus on the TextField when the currentQuestion changes
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (currentQuestion >= countries.length) {
            handleOpenDialog();
        }
    }, [currentQuestion, countries.length]);


    // Function to handle user input
    const handleInputChange = (event: any) => {
        setUserAnswer(event.target.value);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // Function to handle form submission
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Disable the TextField and Submit button
        setIsDisabled(true);

        if (userAnswer.toLowerCase() === countries[currentQuestion].capital.toLowerCase()) {
            setMessage('Correct!');
            setSeverity('success');
            setScore(score + 1); // Increment score when answer is correct
            setCorrectAnswer(''); // Clear correct answer when the answer is correct
            // Below lines were causing the game to not show next question if answer is wrong
            // setCurrentQuestion(currentQuestion + 1);
            // setUserAnswer('');
        } else {
            setMessage(`Sorry, that is not correct. The correct answer is ${countries[currentQuestion].capital}.`);
            setSeverity('error');
            setCorrectAnswer(countries[currentQuestion].capital); // Set the correct answer
        }

        setUserAnswer('');
        setOpen(true);

        // Delay before displaying the next question (adjust the delay time as needed)
        setTimeout(() => {
            setCurrentQuestion(currentQuestion + 1);
            setIsDisabled(false); // Enable the TextField and Submit button
        }, 3000); // 2000 milliseconds (2 seconds) delay

    };

    // If the data hasn't loaded yet, display a loading message
    if (!countries.length) return <InputLabel>Loading...</InputLabel>;

    return (
        <div className={"landing-page"}>
            {currentQuestion < countries.length ? (
                <motion.div
                    variants={scaleVariants}
                    whileInView={scaleVariants.whileInView}
                    className="app__header-circles"
                >

                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delayChildren: 0.5 }}
                        className="flag-form"
                    >
                        <h1>{countries[currentQuestion].name}</h1>
                        <QuestionForm
                            name={countries[currentQuestion].name}
                            handleSubmit={handleSubmit}
                            userAnswer={userAnswer}
                            handleInputChange={handleInputChange}
                            isDisabled={isDisabled}
                            score={score}
                        />
                    </motion.div>

                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delayChildren: 0.5 }}
                        className="flag-img"
                    >
                        <img src={urlFor(countries[currentQuestion].imgUrl)} alt={countries[currentQuestion].name} />
                    </motion.div>
                </motion.div>
            ) : (
                <SimpleDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    text={`You scored ${score} out of ${countries.length}.`}
                    titleText={'Game Over!'}
                />
            )}

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity as AlertColor} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );

}
export default AppWrap(LandingPage, 'landing-page', 'landing-page');