# Vibecoder Pal

A cutting-edge platform for vibecoders to learn programming while AI agents write their code. Built with Next.js, React, TypeScript, Tailwind CSS, and AWS Cognito authentication.

## 🚀 Features

- **AI-Powered Code Generation**: Watch as AI agents write production-ready code while you learn
- **VSCode/Cursor Integration**: Seamless extension for contextual learning and best practices
- **Custom Learning Paths**: Personalized guides based on your coding patterns
- **Email/Password Authentication**: Secure user authentication with AWS Cognito
- **Responsive Design**: Beautiful, modern interface that works on all devices
- **Real-time Learning**: Get suggestions and best practices as you code

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: AWS Cognito with AWS Amplify
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vibecoder-pal.git
   cd vibecoder-pal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure AWS Cognito** (see [Authentication Setup](#authentication-setup))

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Setup

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

### Step 2: Configure Environment Variables

1. **Copy the template**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your AWS Cognito values**
   ```env
   # Required: Your Cognito User Pool ID
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_aBcDeFgHi

   # Required: Your Cognito User Pool Client ID
   NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m

   # Optional: Identity Pool ID (for advanced features)
   NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID=us-east-1:12345678-1234-1234-1234-123456789012
   ```

3. **Find your values in AWS Console**
   - **User Pool ID**: Found in the "User pool overview" section
   - **Client ID**: Go to "App integration" → "App clients and analytics" → Click your client

## 🎯 Usage

### Authentication Flow

1. **Registration**
   - Visit `/auth/register`
   - Fill in name, email, and password
   - Verify email with confirmation code
   - Automatically redirected to dashboard

2. **Login**
   - Visit `/auth/login`
   - Enter email and password
   - Redirected to dashboard on success

3. **Password Reset**
   - Visit `/auth/forgot-password`
   - Enter email to receive reset code
   - Enter code and new password

### Protected Routes

All routes under `/dashboard` are protected and require authentication. The app uses:

- **Higher-Order Component**: `withAuth()` for page-level protection
- **Auth Context**: `useAuthContext()` for accessing user state
- **Automatic Redirects**: Unauthenticated users are redirected to login

### User Management

```typescript
import { useAuthContext } from '@/lib/auth-context';

const MyComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    signOut, 
    error 
  } = useAuthContext();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;

  return (
    <div>
      <p>Welcome, {user?.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

## 🏗 Project Structure

```
vibecoder-pal/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── login/page.tsx        # Login page
│   │   ├── register/page.tsx     # Registration page
│   │   ├── confirm-email/page.tsx # Email verification
│   │   └── forgot-password/page.tsx # Password reset
│   ├── dashboard/page.tsx        # Protected dashboard
│   ├── pricing/page.tsx          # Pricing page
│   ├── layout.tsx                # Root layout with AuthProvider
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── lib/                          # Utility libraries
│   ├── auth-config.ts            # AWS Cognito configuration
│   └── auth-context.tsx          # Authentication context provider
├── hooks/                        # Custom React hooks
│   └── useAuth.ts                # Authentication hook
├── .env.example                  # Environment variables template
├── AUTH_SETUP.md                 # Detailed auth setup guide
└── README.md                     # This file
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Update AWS Cognito (if needed)**
   - Update redirect URLs for production domain
   - Configure custom domain if desired

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Authentication testing
npm run test:auth    # Test authentication flow (coming soon)
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_COGNITO_USER_POOL_ID` | Yes | AWS Cognito User Pool ID |
| `NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID` | Yes | AWS Cognito App Client ID |
| `NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID` | No | AWS Cognito Identity Pool ID |

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with authentication errors**
   - Ensure all required environment variables are set
   - Check that client secret is NOT generated in Cognito

2. **Email verification not working**
   - Check AWS Cognito email settings
   - Verify email templates are configured
   - For production, consider using AWS SES

3. **Redirect loops**
   - Ensure authentication context is properly configured
   - Check that protected routes use `withAuth` HOC

4. **TypeScript errors**
   - Ensure AWS Amplify packages are up to date
   - Check that all imports are correct

### Debug Mode

Enable debug logging by setting:
```typescript
// In auth-config.ts
Amplify.configure(authConfig, {
  Auth: {
    Cognito: {
      debug: true
    }
  }
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- AWS Amplify team for excellent authentication libraries
- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling
- The open-source community for inspiration

## 📞 Support

- 📧 Email: support@vibecoderpal.com
- 💬 Discord: [Join our community](https://discord.gg/vibecoderpal)
- 📖 Documentation: [docs.vibecoderpal.com](https://docs.vibecoderpal.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/vibecoder-pal/issues)

---

**Ready to start your AI-powered coding journey? [Get started now!](http://localhost:3000/auth/register)**