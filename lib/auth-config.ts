import { Amplify } from "aws-amplify";

export const authConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!,
      loginWith: {
        email: true,
        username: false,
      },
    },
  },
};

// Configure Amplify
export const configureAmplify = () => {
  Amplify.configure(authConfig);
};

// Environment variables validation
export const validateAuthConfig = () => {
  const requiredEnvVars = [
    "NEXT_PUBLIC_COGNITO_USER_POOL_ID",
    "NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName],
  );

  if (missingVars.length > 0) {
    console.warn(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
    return false;
  }

  return true;
};
