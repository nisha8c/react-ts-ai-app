import React, {useState} from 'react';
import logo from './Nisha_Logo.png';
import './App.css';
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
    UserButton
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
function App() {
  return (
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
  );
}

function ClerkProviderWithRoutes() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            publishableKey={clerkPubKey}
            navigate={(to) => navigate(to)}
        >
            <Routes>
                <Route path={"/"} element={<WelcomePage />}/>

                <Route
                    path="/sign-in/*"
                    element={<SignIn routing="path" path="/sign-in" />}
                />
                <Route
                    path="/sign-up/*"
                    element={<SignUp routing="path" path="/sign-up" />}
                />
                <Route
                    path="/protected"
                    element={
                        <>
                            <SignedIn>
                                <ProtectedPage />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    }
                />
            </Routes>
        </ClerkProvider>
    );
}

function WelcomePage() {
    const navigate = useNavigate();
    const [startClicked, setStartClicked] = useState(false);

    const handleClick = () => {
        setStartClicked(true);
        navigate('/protected');
    }
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <button onClick={handleClick}>Let's Start!</button>
                </header>
            </div>
        </>
    );
}

function ProtectedPage() {
    return (
        <>
            <h1>Protected page</h1>
            <UserButton />
        </>
    );
}

export default App;
