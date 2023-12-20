import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AppWrap from "../../wrapper/AppWrap";
import { urlFor, client } from '../../client';
import { motion } from 'framer-motion';
import './LandingPage.scss'
import {AlertColor, TextField} from "@mui/material";
import { InputLabel } from '@mui/material';
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ICountry {
    name: string;
    capital: string;
    imgUrl: any
}


function LandingPage() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

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

        if (userAnswer.toLowerCase() === countries[currentQuestion].capital.toLowerCase()) {
            setMessage('Correct!');
            setSeverity('success');
            setCurrentQuestion(currentQuestion + 1);
            setUserAnswer('');
        } else {
            setMessage('Sorry, that is not correct.');
            setSeverity('error');
        }

        setOpen(true);

    };

    // If the data hasn't loaded yet, display a loading message
    if (!countries.length) return <div>Loading...</div>;

    return (
        <div className={"landing-page"}>
            {currentQuestion < countries.length ? (
                <div>


                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delayChildren: 0.5 }}
                        className="flag-form"
                    >
                        <h1>{countries[currentQuestion].name}</h1>
                        <form onSubmit={handleSubmit} className={'form'}>
                            <InputLabel>
                                What is the capital of this country?

                            </InputLabel>
                            <TextField id="outlined-basic"
                                       label="Enter Your Answer Here..."
                                       variant="outlined"
                                       value={userAnswer}
                                       type={"text"}
                                       onChange={handleInputChange}
                            />
                            <Button type="submit" variant="outlined" size={'large'}>Submit</Button>
                        </form>
                    </motion.div>

                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delayChildren: 0.5 }}
                        className="flag-img"
                    >
                        <img src={urlFor(countries[currentQuestion].imgUrl)} alt={countries[currentQuestion].name} />
                    </motion.div>
                </div>
            ) : (
                <div>Game Over</div>
            )}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity as AlertColor} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );

}
export default AppWrap(LandingPage, 'landing-page', 'landing-page');