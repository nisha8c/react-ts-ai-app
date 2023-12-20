import {
    SignedIn,
    SignedOut,
    RedirectToSignIn,
} from "@clerk/clerk-react";

import {ReactElement, ReactNode} from "react";
import Navbar from "../../components/Navbar/Navbar";
function WithSignInProtectionHOC (WrappedComponent: () => ReactElement): ReactNode {

    return (
        <>
            <SignedIn>
                <Navbar />
                <WrappedComponent />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}

export default WithSignInProtectionHOC;