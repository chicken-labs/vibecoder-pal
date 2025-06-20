import React from "react";
import Link from "next/link";

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with AI-assisted learning",
      features: [
        "Basic AI code generation",
        "5 projects per month",
        "Community support",
        "Basic VSCode extension",
        "Learning guides library",
        "Progress tracking",
      ],
      notIncluded: [
        "Advanced AI models",
        "Unlimited projects",
        "Priority support",
        "Custom integrations",
      ],
      buttonText: "Get Started Free",
      buttonStyle:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description:
        "For serious developers who want to accelerate their learning",
      features: [
        "Advanced AI code generation",
        "Unlimited projects",
        "Priority email support",
        "Advanced VSCode/Cursor extension",
        "Custom learning paths",
        "Detailed analytics",
        "Code review assistance",
        "Best practices suggestions",
        "Multiple programming languages",
        "Export project templates",
      ],
      notIncluded: [
        "Dedicated account manager",
        "Custom integrations",
        "Team collaboration",
        "Enterprise security",
      ],
      buttonText: "Start Pro Trial",
      buttonStyle:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams and organizations with advanced requirements",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom AI model training",
        "Advanced security & compliance",
        "SSO integration",
        "Custom integrations",
        "Team collaboration tools",
        "Advanced analytics dashboard",
        "Priority phone support",
        "Custom deployment options",
        "SLA guarantees",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      buttonStyle:
        "border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VP</span>
            </div>
            <span className="text-white text-xl font-bold">Vibecoder Pal</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link href="/pricing" className="text-white font-semibold">
              Pricing
            </Link>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Learning Journey
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Start free and upgrade as you grow. Every plan includes our core
            AI-powered learning features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 ${
                plan.popular
                  ? "border-purple-400 transform scale-105 shadow-2xl"
                  : "border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}

                {plan.notIncluded.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-start opacity-50"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-gray-500 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Can I upgrade or downgrade my plan anytime?
              </h3>
              <p className="text-gray-300">
                Yes, you can change your plan at any time. When upgrading,
                you'll get immediate access to new features. When downgrading,
                changes take effect at your next billing cycle.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Do you offer a free trial for Pro plan?
              </h3>
              <p className="text-gray-300">
                Yes! We offer a 14-day free trial for the Pro plan. No credit
                card required. You can cancel anytime during the trial period.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                What programming languages are supported?
              </h3>
              <p className="text-gray-300">
                We support all major programming languages including JavaScript,
                Python, TypeScript, Java, C++, Go, Rust, and many more. Our AI
                is continuously learning new languages and frameworks.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Is my code secure and private?
              </h3>
              <p className="text-gray-300">
                Absolutely. We use enterprise-grade encryption and never store
                your code permanently. All processing happens in secure,
                isolated environments, and we never use your code to train our
                models without explicit consent.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                How does the VSCode extension work?
              </h3>
              <p className="text-gray-300">
                Our extension integrates seamlessly with VSCode and Cursor. It
                analyzes your current project, provides contextual learning
                suggestions, generates custom guides based on your code, and
                offers real-time best practice recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already learning faster with
            Vibecoder Pal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-2xl">
              Start Free Trial
            </button>
            <button className="border-2 border-purple-400 text-purple-400 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-white transition-all duration-200">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="text-white text-xl font-bold">
                Vibecoder Pal
              </span>
            </Link>
            <p className="text-gray-400">
              Empowering developers to learn while AI handles the coding.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Extensions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Vibecoder Pal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
