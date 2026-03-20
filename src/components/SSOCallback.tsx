import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

const SSOCallback = () => {
  return (
    <AuthenticateWithRedirectCallback
      continueSignUpUrl="/join-the-builders"
      signInUrl="/join-the-builders"
      signUpUrl="/join-the-builders"
      signInFallbackRedirectUrl="/join-the-builders"
      signUpFallbackRedirectUrl="/join-the-builders"
    />
  );
};

export default SSOCallback;

