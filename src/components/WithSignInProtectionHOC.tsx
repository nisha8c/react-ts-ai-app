import {
    SignedIn,
    SignedOut,
    RedirectToSignIn,
} from "@clerk/clerk-react";

import {ReactElement, ReactNode} from "react";
function WithSignInProtectionHOC (WrappedComponent: () => ReactElement): ReactNode {

    return (
        <>
            <SignedIn>
                <WrappedComponent />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}

export default WithSignInProtectionHOC;