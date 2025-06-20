import { useState, useEffect, useCallback } from "react";
import {
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from "aws-amplify/auth";

export interface User {
  userId: string;
  username: string;
  email: string;
  emailVerified: boolean;
  attributes: Record<string, any>;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface ConfirmResetPasswordData {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const setError = useCallback((error: string | null) => {
    setAuthState((prev) => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setAuthState((prev) => ({ ...prev, isLoading }));
  }, []);

  const checkAuthState = useCallback(async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      const session = await fetchAuthSession();

      if (user && session.tokens) {
        try {
          const userAttributes = await fetchUserAttributes();
          const userObj: User = {
            userId: user.userId,
            username: user.username,
            email: userAttributes.email || user.signInDetails?.loginId || "",
            emailVerified: userAttributes.email_verified === "true",
            attributes: userAttributes || {},
          };

          setAuthState({
            user: userObj,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } catch (attrError) {
          // Fallback if attributes fetch fails
          const userObj: User = {
            userId: user.userId,
            username: user.username,
            email: user.signInDetails?.loginId || "",
            emailVerified: false,
            attributes: {},
          };

          setAuthState({
            user: userObj,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        }
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null, // No error for unauthenticated state
      });
    }
  }, [setLoading]);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  const handleSignUp = async (data: SignUpData) => {
    try {
      setLoading(true);
      setError(null);

      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            name: data.name || data.email.split("@")[0],
          },
        },
      });

      if (isSignUpComplete) {
        await checkAuthState();
        return { success: true, userId, nextStep };
      }

      return { success: true, userId, nextStep, requiresConfirmation: true };
    } catch (error: any) {
      const errorMessage = error.message || "Sign up failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (data: SignInData) => {
    try {
      setLoading(true);
      setError(null);

      const { isSignedIn, nextStep } = await signIn({
        username: data.email,
        password: data.password,
      });

      if (isSignedIn) {
        await checkAuthState();
        return { success: true, nextStep };
      }

      return { success: true, nextStep, requiresAdditionalSteps: true };
    } catch (error: any) {
      const errorMessage = error.message || "Sign in failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.message || "Sign out failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const handleConfirmSignUp = async (email: string, code: string) => {
    try {
      setLoading(true);
      setError(null);

      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      if (isSignUpComplete) {
        await checkAuthState();
        return { success: true, nextStep };
      }

      return { success: true, nextStep, requiresAdditionalSteps: true };
    } catch (error: any) {
      const errorMessage = error.message || "Email confirmation failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await resendSignUpCode({ username: email });
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to resend code";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    try {
      setLoading(true);
      setError(null);
      const { nextStep } = await resetPassword({ username: data.email });
      return { success: true, nextStep };
    } catch (error: any) {
      const errorMessage = error.message || "Password reset failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmResetPassword = async (data: ConfirmResetPasswordData) => {
    try {
      setLoading(true);
      setError(null);
      await confirmResetPassword({
        username: data.email,
        confirmationCode: data.confirmationCode,
        newPassword: data.newPassword,
      });
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Password confirmation failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...authState,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    confirmSignUp: handleConfirmSignUp,
    resendCode: handleResendCode,
    resetPassword: handleResetPassword,
    confirmResetPassword: handleConfirmResetPassword,
    clearError: () => setError(null),
    refreshAuth: checkAuthState,
  };
};
