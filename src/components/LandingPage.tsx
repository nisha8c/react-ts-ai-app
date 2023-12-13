import {UserButton} from "@clerk/clerk-react";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import AppWrap from "../wrapper/AppWrap";

function LandingPage() {
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => console.log('DATA::: ', data))
            .catch((error) => console.error('There has been a problem with your fetch operation: ', error));
    }, []);
    return (
        <div className={"landing-page"}>
            <h1>Protected page</h1>
            <UserButton />
            <Button onClick={() => navigate('/page1')}>Go to Page 1</Button>
            <Button onClick={() => navigate('/page2')}>Go to Page 2</Button>
        </div>
    );
}
export default AppWrap(LandingPage, 'landing-page', 'landing-page');