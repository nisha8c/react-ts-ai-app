import React, {ChangeEvent, FormEvent, useEffect} from 'react';
import { InputLabel, TextField, Button } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
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
                <>
                    <Button type="button" variant="outlined" size={'large'} onClick={handleVoiceButtonClick}>
                        Start Voice Input
                    </Button>

                    {listening && (
                        <Button type="button" variant="outlined" size={'large'} onClick={handleVoiceInputStop}>
                            Stop Voice Input
                        </Button>
                    )}
                </>
            )}

            <Button type="submit" variant="outlined" size={'large'} disabled={isDisabled}>
                Submit
            </Button>

            <InputLabel>Score: {score}</InputLabel>
        </form>
    );
};


export default QuestionForm;
