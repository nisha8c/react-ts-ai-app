import {SignOutButton, UserButton} from "@clerk/clerk-react";
import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function LandingPage() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Protected page</h1>
            <UserButton />
            <SignOutButton />
            <Button onClick={() => navigate('/page1')}>Go to Page 1</Button>
            <Button onClick={() => navigate('/page2')}>Go to Page 2</Button>
        </>
    );
}
export default LandingPage;