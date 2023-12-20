import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AppWrap from "../../wrapper/AppWrap";
import { urlFor, client } from '../../client';
import { motion } from 'framer-motion';
import './LandingPage.scss'

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

    // Function to handle form submission
    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Check the user's answer and proceed to the next question

        if (userAnswer.toLowerCase() === countries[currentQuestion].capital.toLowerCase()) {
            alert('Correct!');
            setCurrentQuestion(currentQuestion + 1);
            setUserAnswer('');
        } else {
            alert('Sorry, that is not correct.');
        }


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
                        <form onSubmit={handleSubmit}>
                            <label>
                                What is the capital of this country?
                                <input type="text" value={userAnswer} onChange={handleInputChange} />
                            </label>
                            <button type="submit">Submit</button>
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
        </div>
    );

}
export default AppWrap(LandingPage, 'landing-page', 'landing-page');