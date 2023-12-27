import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { InputLabel, TextField, Button, IconButton } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';
import {Lightbulb, Help} from "@mui/icons-material";
import './QuestionForm.scss';
import {complete} from "../../openai";

interface QuestionFormProps {
    name: string;
    handleSubmit: (event: FormEvent) => void;
    userAnswer: string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isDisabled: boolean;
    score: number;
}
const QuestionForm: React.FC<QuestionFormProps> = ({name, handleSubmit, userAnswer, handleInputChange, isDisabled, score }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    // for the hint and info
    const [hint, setHint] = useState('');
    const [info, setInfo] = useState('');

    const {
        transcript,
        resetTranscript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current!.focus();
        }
    }, [name]); // refocus whenever the name changes

    const handleVoiceButtonClick = () => {
        resetTranscript();
        SpeechRecognition.startListening(); // Use the startListening function from SpeechRecognition
    };

    const handleVoiceInputStop = () => {
        SpeechRecognition.stopListening(); // Use the stopListening function from SpeechRecognition
        handleInputChange({
            target: { value: transcript },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleHintClick = async () => {
        try {
            // Define the prompt for the OpenAI API
            const prompt = `Provide a hint for the capital of ${name}`;
            console.log('prompt for Hint: ', prompt)
            const generatedHint = await complete(prompt);
            setHint(generatedHint);
            console.log('Hint: ', hint);
        } catch (error) {
            console.error("Error generating hint:", error);
        }
    };

    const handleInfoClick = async () => {
        try {
            const prompt = `Provide information about the country ${name}`;
            console.log('prompt for Info: ', prompt)
            const generatedInfo = await complete(prompt);
            setInfo(generatedInfo);
            console.log('Info: ', info);
        } catch (error) {
            console.error("Error generating info:", error);
        }
    };


    useEffect(() => {
        handleInputChange({
            target: { value: transcript },
        } as React.ChangeEvent<HTMLInputElement>);
    }, [transcript]);


    return (
        <form onSubmit={handleSubmit} className={'form'}>
            <InputLabel className={'p-text'}>What is the capital of {name}?</InputLabel>

            <TextField
                id="outlined-basic"
                label="Enter Your Answer Here..."
                autoFocus={true}
                variant="outlined"
                value={userAnswer}
                type="text"
                onChange={handleInputChange}
                disabled={isDisabled}
                inputRef={inputRef}
            />

            {browserSupportsSpeechRecognition && (
                <div className="button-container">
                    <IconButton
                        type="button"
                        onClick={handleVoiceButtonClick}
                        disabled={isDisabled}
                        aria-label="Start Voice Input"
                        style={{ color: 'blue' }}  // Adjust the color value as needed
                    >
                        <VolumeUpIcon />
                    </IconButton>

                    {listening && (
                        <IconButton
                            type="button"
                            onClick={handleVoiceInputStop}
                            disabled={isDisabled}
                            aria-label="Stop Voice Input"
                            style={{ color: 'red' }}  // Adjust the color value as needed
                        >
                            <StopIcon />
                        </IconButton>
                    )}
                </div>
            )}

            <Button type="submit" variant="outlined" size={'large'} disabled={isDisabled}>
                Submit
            </Button>

            <div>
                <IconButton type="button" aria-label={'Help'} style={{ color: 'green' }} onClick={handleHintClick} disabled={isDisabled}>
                    <Help />
                </IconButton>
                <IconButton type="button" aria-label={'Hint'} style={{ color: 'orange' }} onClick={handleInfoClick} disabled={isDisabled}>
                    <Lightbulb />
                </IconButton>
            </div>
            {/* Display the hint and info if they exist */}
            {hint && <InputLabel>Hint: {hint}</InputLabel>}
            {info && <InputLabel>Info: {info}</InputLabel>}

            <InputLabel className="score-label">Score: {score}</InputLabel>

        </form>
    );
};


export default QuestionForm;
