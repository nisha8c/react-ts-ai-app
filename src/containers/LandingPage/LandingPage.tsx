import {UserButton} from "@clerk/clerk-react";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import AppWrap from "../../wrapper/AppWrap";
import { urlFor, client } from '../../client';

interface ICountry {
    name: string;
    capital: string;
    imageurl: {
        asset: {
            url: string;
        };
    };
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
            <div>
                <h1>{countries[currentQuestion].name}</h1>
                <img src={countries[currentQuestion].imageurl.asset.url} alt={countries[currentQuestion].name} />
                <form onSubmit={handleSubmit}>
                    <label>
                        What is the capital of this country?
                        <input type="text" value={userAnswer} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default AppWrap(LandingPage, 'landing-page', 'landing-page');