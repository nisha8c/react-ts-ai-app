import React, {ChangeEvent, FormEvent, useEffect} from 'react';
import { InputLabel, TextField, Button, IconButton } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';
import './QuestionForm.scss'
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

    useEffect(() => {
        handleInputChange({
            target: { value: transcript },
        } as React.ChangeEvent<HTMLInputElement>);
    }, [transcript]);


    return (
        <form onSubmit={handleSubmit} className={'form'}>
            <InputLabel>What is the capital of {name}?</InputLabel>

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

            <InputLabel className="score-label">Score: {score}</InputLabel>

        </form>
    );
};


export default QuestionForm;
