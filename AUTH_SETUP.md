# Authentication Setup Guide

This guide will help you set up AWS Cognito authentication for Vibecoder Pal, including Google and GitHub OAuth integration.

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI configured (optional but recommended)

### Step 1: Create AWS Cognito User Pool

1. **Navigate to AWS Cognito Console**
   - Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
   - Click "Create user pool"

2. **Configure Sign-in Experience**
   - Choose "Email" as the sign-in option
   - Uncheck "Username" if you only want email-based login
   - Click "Next"

3. **Configure Security Requirements**
   - Set password policy (recommended: minimum 8 characters, mixed case, numbers, symbols)
   - Configure MFA if desired (optional for basic setup)
   - Click "Next"

4. **Configure Sign-up Experience**
   - Choose "Send email with Cognito" for email delivery
   - Required attributes: `email` and `name`
   - Click "Next"

5. **Configure Message Delivery**
   - Use "Send email with Cognito" for development
   - For production, consider configuring SES
   - Click "Next"

6. **Integrate Your App**
   - User pool name: `vibecoder-pal-users`
   - App client name: `vibecoder-pal-client`
   - Client secret: **Do NOT generate** (uncheck this box)
   - Authentication flows: Check "ALLOW_USER_SRP_AUTH" and "ALLOW_REFRESH_TOKEN_AUTH"
   - Click "Next"

7. **Review and Create**
   - Review all settings
   - Click "Create user pool"
