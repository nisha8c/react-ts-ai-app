import React, {ChangeEvent, FormEvent, useEffect, useRef} from 'react';
import { InputLabel, TextField, Button } from '@mui/material';

interface QuestionFormProps {
    name: string;
    handleSubmit: (event: FormEvent) => void;
    userAnswer: string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isDisabled: boolean;
    score: number;
}
const QuestionForm: React.FC<QuestionFormProps> = ({ name, handleSubmit, userAnswer, handleInputChange, isDisabled, score }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current!.focus();
        }
    }, [name]); // refocus whenever the name changes
    return (
        <form onSubmit={handleSubmit} className={'form'}>
            <InputLabel>
                What is the capital of {name}?
            </InputLabel>

            <TextField id="outlined-basic"
                       label="Enter Your Answer Here..."
                       autoFocus={true}
                       variant="outlined"
                       value={userAnswer}
                       type={"text"}
                       onChange={handleInputChange}
                       disabled={isDisabled}
                       inputRef={inputRef}
            />

            <Button
                type="submit"
                variant="outlined"
                size={'large'}
                disabled={isDisabled}
            >
                Submit
            </Button>

            <InputLabel>Score: {score}</InputLabel>
        </form>
    );
};

export default QuestionForm;
