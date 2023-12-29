import React from 'react';
import './App.scss';

import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import {WithSignInProtectionHOC, Welcome, LandingPage, GameHistoryPage, WeeklyChart, PageNotFound, Rules} from "./containers";

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
            <ScrollToTop smooth={true} width='25' height='25' top={15}/>
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
                <Route path="/chart" element={WithSignInProtectionHOC(WeeklyChart)} />
                <Route path="/rules" element={WithSignInProtectionHOC(Rules)} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </ClerkProvider>
    );
}



export default App;
