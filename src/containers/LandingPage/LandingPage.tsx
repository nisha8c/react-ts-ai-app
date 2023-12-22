import React, {useEffect, useState} from "react";
import AppWrap from "../../wrapper/AppWrap";
import { urlFor, client } from '../../client';
import { motion } from 'framer-motion';
import './LandingPage.scss'
import {AlertColor} from "@mui/material";
import { InputLabel, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';

//import {pauseGame, resumeGame} from "../../redux/actions";
import { setGameHistory } from "../../redux/actions";
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
    const dispatch = useDispatch();
    const isPaused = useSelector((state: any) => state.historyReducer.isPaused);

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

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [levelClicked, setLevelClicked] = useState(false);
    const [buttonSelected, setButtonSelected] = useState(false);

    const handleLevelClick = (level: string) => {
        setSelectedLevel(level);
        setCurrentQuestion(0); // Reset current question when changing levels
        setScore(0); // Reset score when changing levels
        setLevelClicked(true);
        setButtonSelected(true);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);

        // Dispatch game history to Redux store
        dispatch(setGameHistory({
            level: selectedLevel,
            score,
            timestamp: new Date().toLocaleString(),
        }));
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setButtonSelected(false);
    };

    // Fetch the data from Sanity with level filtering
    useEffect(() => {
        let query = '*[_type == "countries"]';

        if (selectedLevel) {
            query += `[level == "${selectedLevel}"]`;
        }

        client
            .fetch(query)
            .then((data) => {
                setCountries(data);
            })
            .catch(console.error);

    }, [selectedLevel]);


    useEffect(() => {
        if (currentQuestion >= countries.length) {
            handleOpenDialog();
        }
    }, [currentQuestion, countries.length]);

    // Function to handle user input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsDisabled(true);

        if (userAnswer.toLowerCase() === countries[currentQuestion].capital.toLowerCase()) {
            setMessage('Correct!');
            setSeverity('success');
            setScore(prevScore => prevScore + 1);
            setCorrectAnswer('');
        } else {
            setMessage(`Sorry, that is not correct. The correct answer is ${countries[currentQuestion].capital}.`);
            setSeverity('error');
            setCorrectAnswer(countries[currentQuestion].capital);
        }

        setUserAnswer('');
        setOpen(true);

        setTimeout(() => {
            setCurrentQuestion(prevQuestion => prevQuestion + 1);
            setIsDisabled(false);
        }, 3000);
    };

    // If the data hasn't loaded yet, display a loading message
    if (!countries.length) return <InputLabel>Loading...</InputLabel>;

    return (
        <div className={"landing-page"}>
            <motion.div
                variants={scaleVariants}
                whileInView={scaleVariants.whileInView}
                className='level-buttons'
            >
                <div className="button-container">
                    <Button
                        onClick={() => handleLevelClick('Easy')}
                        variant="outlined"
                        size={'large'}
                        disabled={buttonSelected && selectedLevel !== 'Easy'}
                    >
                        Easy
                    </Button>
                    <Button
                        onClick={() => handleLevelClick('Medium')}
                        variant="outlined"
                        size={'large'}
                        disabled={buttonSelected && selectedLevel !== 'Medium'}
                    >
                        Medium
                    </Button>
                    <Button
                        onClick={() => handleLevelClick('Difficult')}
                        variant="outlined"
                        size={'large'}
                        disabled={buttonSelected && selectedLevel !== 'Difficult'}
                    >
                        Difficult
                    </Button>
                </div>
            </motion.div>

            {levelClicked && currentQuestion < countries.length ? (
                <motion.div
                    variants={scaleVariants}
                    whileInView={scaleVariants.whileInView}
                    className="app__header-form-and-flag"
                >
                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delayChildren: 0.5 }}
                        className="flag-form"
                    >
                        <h1>{countries[currentQuestion].name}</h1>
                        {/*
                        {isPaused ? (
                            <Button onClick={() => dispatch(resumeGame())}>Resume</Button>
                        ) : (
                            <Button onClick={() => dispatch(pauseGame())}>Pause</Button>
                        )}
                         */}
                        <QuestionForm
                            name={countries[currentQuestion].name}
                            handleSubmit={handleSubmit}
                            userAnswer={userAnswer}
                            handleInputChange={handleInputChange}
                            isDisabled={isDisabled || isPaused}
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
            ) : null}

            {currentQuestion >= countries.length && (
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