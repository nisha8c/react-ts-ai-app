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
import useSound from 'use-sound';
import Confetti from 'react-confetti';

import correctAnswerSound from '../../sounds/correct.mp3';
import wrongAnswerSound from '../../sounds/wrong.mp3';
import clapsSound from '../../sounds/claps.mp3';



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

    // Initialize offsets from localStorage or set to default values
    const [offsets, setOffsets] = useState(() => {
        const savedOffsets = localStorage.getItem('offsets');
        return savedOffsets ? JSON.parse(savedOffsets) : { Easy: 0, Medium: 0, Difficult: 0 };
    });

    const [playCorrect] = useSound(correctAnswerSound);
    const [playWrong] = useSound(wrongAnswerSound);
    const [playClaps] = useSound(clapsSound);


    const handleLevelClick = (level: string) => {
        setSelectedLevel(level);
        setCurrentQuestion(0); // Reset current question when changing levels
        setScore(0); // Reset score when changing levels
        setLevelClicked(true);
        setButtonSelected(true);

        // Increment the offset for the selected level
        setOffsets((prevOffsets: { Easy: number; Medium: number; Difficult: number; }) => {
            const newOffsets = {
                ...prevOffsets,
                [level]: prevOffsets[level as keyof typeof prevOffsets] + 10,
            };

            // Save the new offsets to localStorage
            localStorage.setItem('offsets', JSON.stringify(newOffsets));

            return newOffsets;
        });

    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        playClaps();
        // Dispatch game history to Redux store
        dispatch(setGameHistory({
            level: selectedLevel,
            score,
            timestamp: new Date().toISOString(),
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
                // Get the next 10 questions starting from the current offset
                const start = offsets[selectedLevel as keyof typeof offsets];
                const end = start + 10;
                const slicedData = data.slice(start, end);

                // If the offset exceeds the total number of questions, reset it to 0
                if (slicedData.length < 10) {
                    setOffsets((prevOffsets: { Easy: number; Medium: number; Difficult: number; }) => {
                        const newOffsets = {
                            ...prevOffsets,
                            [selectedLevel as keyof typeof offsets]: 0,
                        };

                        // Save the new offsets to localStorage
                        localStorage.setItem('offsets', JSON.stringify(newOffsets));

                        return newOffsets;
                    });
                }

                setCountries(slicedData);
            })
            .catch(console.error);

    }, [selectedLevel, offsets]);



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

        const isCorrect = userAnswer.toLowerCase() === countries[currentQuestion].capital.toLowerCase();

        if (isCorrect) {
            setMessage('Correct!');
            setSeverity('success');
            setScore(prevScore => prevScore + 1);
            setCorrectAnswer('');
            playCorrect(); // Play the correct sound here
        } else {
            setMessage(`Sorry, that is not correct. The correct answer is ${countries[currentQuestion].capital}.`);
            setSeverity('error');
            setCorrectAnswer(countries[currentQuestion].capital);
            playWrong(); // Play the wrong sound here
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
                        <h1 className={'bold-text'}>{countries[currentQuestion].name}</h1>
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
                <>
                    <Confetti />
                    <SimpleDialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        text={`You scored ${score} out of ${countries.length}.`}
                        titleText={'Game Over!'}
                    />
                </>
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