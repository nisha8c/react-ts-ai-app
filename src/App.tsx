import React from 'react';
import './App.scss';

import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {WithSignInProtectionHOC, Welcome, LandingPage, GameHistoryPage, Page2, PageNotFound} from "./containers";

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
                <Route path={"/"} element={<Welcome />}/>

                <Route
                    path="/sign-in/*"
                    element={<SignIn routing="path" path="/sign-in" />}
                />
                <Route
                    path="/sign-up/*"
                    element={<SignUp routing="path" path="/sign-up" />}
                />
                <Route path="/protected" element={WithSignInProtectionHOC(LandingPage)} />
                <Route path="/gameHistory" element={WithSignInProtectionHOC(GameHistoryPage)} />
                <Route path="/page2" element={WithSignInProtectionHOC(Page2)} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </ClerkProvider>
    );
}



export default App;
