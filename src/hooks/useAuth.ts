import { useUser, useAuth as useClerkAuth, useClerk } from "@clerk/clerk-react";

export function useAuth() {
  const { user, isLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerkAuth();
  const clerk = useClerk();

  const openSignIn = () => {
    clerk.openSignIn({
      forceRedirectUrl: window.location.pathname,
    });
  };

  const signOut = async () => {
    await clerkSignOut();
  };

  return {
    user: isLoaded && user ? { id: user.id, email: user.primaryEmailAddress?.emailAddress } : null,
    loading: !isLoaded,
    signOut,
    openSignIn,
  };
}
