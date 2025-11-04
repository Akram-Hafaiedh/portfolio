// app/privacy/page.tsx
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { FaShieldAlt, FaUserShield, FaDatabase, FaCookie, FaEye } from "react-icons/fa";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float pointer-events-none"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center">
                        {/* Animated Icon/Badge */}
                        <div className="relative inline-block mb-8">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-in shadow-lg">
                                <FaShieldAlt className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                Your Privacy Matters
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
                            Privacy Policy
                        </h1>

                        {/* Enhanced Subtitle */}
                        <div className="relative inline-block max-w-3xl mx-auto">
                            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 animate-slide-up">
                                How I protect and handle your personal information
                                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                    Transparency and security are my priorities.
                                </span>
                            </p>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow"></div>
                        </div>

                        {/* Last Updated */}
                        <div className="mt-8 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg inline-block">
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {/* Introduction */}
                        <div className="mb-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaUserShield className="text-green-600" />
                                Your Privacy is Important
                            </h2>
                            <p className="text-slate-700 dark:text-slate-300">
                                I am committed to protecting your privacy and being transparent about how I handle
                                your personal information. This policy explains what data I collect and how I use it.
                            </p>
                        </div>

                        {/* Privacy Sections */}
                        <div className="space-y-12">
                            {/* Information Collection */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    1. Information I Collect
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                                            <FaDatabase className="text-blue-600" />
                                            Directly Provided Information
                                        </h4>
                                        <ul className="text-blue-700 dark:text-blue-400 space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1">•</span>
                                                <span>Name and contact details from contact forms</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1">•</span>
                                                <span>Email address for communication</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1">•</span>
                                                <span>Message content and meeting preferences</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1">•</span>
                                                <span>Resume/CV if you choose to share it</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                                            <FaEye className="text-purple-600" />
                                            Automatically Collected Information
                                        </h4>
                                        <ul className="text-purple-700 dark:text-purple-400 space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1">•</span>
                                                <span>IP address and browser type</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1">•</span>
                                                <span>Pages visited and time spent</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1">•</span>
                                                <span>Referring website information</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1">•</span>
                                                <span>Device information</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* How I Use Information */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    2. How I Use Your Information
                                </h2>

                                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Primary Purposes:</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-green-600 font-bold">1</span>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-slate-900 dark:text-white">Communication</h5>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                                    Respond to your inquiries and schedule meetings
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-blue-600 font-bold">2</span>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-slate-900 dark:text-white">Service Improvement</h5>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                                    Analyze website usage to enhance user experience
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-600 font-bold">3</span>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-slate-900 dark:text-white">Professional Services</h5>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                                    Provide freelance or employment services as requested
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-orange-600 font-bold">4</span>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-slate-900 dark:text-white">Legal Compliance</h5>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                                    Meet legal obligations and protect my rights
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Data Sharing */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    3. Data Sharing and Disclosure
                                </h2>

                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500 mb-6">
                                    <p className="text-slate-700 dark:text-slate-300">
                                        <strong>I do not sell your personal information to third parties.</strong>
                                        I only share your data in the following limited circumstances:
                                    </p>
                                </div>

                                <div className="space-y-4 text-slate-600 dark:text-slate-300">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 text-sm">✓</span>
                                        </div>
                                        <div>
                                            <strong>Service Providers:</strong> I may share information with trusted
                                            third-party services (like email providers) that help me operate my website
                                            and communicate with you.
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 text-sm">✓</span>
                                        </div>
                                        <div>
                                            <strong>Legal Requirements:</strong> I may disclose information if required
                                            by law or to protect my rights, safety, or property.
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 text-sm">✓</span>
                                        </div>
                                        <div>
                                            <strong>Business Transfers:</strong> In the event of a merger, acquisition,
                                            or sale of assets, your information may be transferred.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Cookies */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    4. Cookies and Tracking
                                </h2>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaCookie className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-slate-600 dark:text-slate-300 mb-3">
                                            This website uses cookies and similar tracking technologies to enhance
                                            your browsing experience and analyze website traffic.
                                        </p>
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Types of Cookies Used:</h4>
                                            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                                                <li>• <strong>Essential:</strong> Required for basic website functionality</li>
                                                <li>• <strong>Analytical:</strong> Help me understand how visitors use the site</li>
                                                <li>• <strong>Preference:</strong> Remember your settings and preferences</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Data Security */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    5. Data Security
                                </h2>

                                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                                        I implement appropriate technical and organizational security measures to
                                        protect your personal information against unauthorized access, alteration,
                                        disclosure, or destruction.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>Secure HTTPS connections</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>Regular security updates</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>Limited data access</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>Secure data storage</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Your Rights */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    6. Your Rights
                                </h2>

                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    You have certain rights regarding your personal information:
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Access & Correction</h4>
                                        <p className="text-blue-700 dark:text-blue-400 text-sm">
                                            You can request access to your personal data and ask me to correct
                                            inaccurate information.
                                        </p>
                                    </div>
                                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Data Deletion</h4>
                                        <p className="text-purple-700 dark:text-purple-400 text-sm">
                                            You can request deletion of your personal data, subject to certain
                                            legal obligations.
                                        </p>
                                    </div>
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Opt-Out</h4>
                                        <p className="text-green-700 dark:text-green-400 text-sm">
                                            You can opt out of marketing communications at any time by
                                            contacting me directly.
                                        </p>
                                    </div>
                                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                        <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Complaints</h4>
                                        <p className="text-orange-700 dark:text-orange-400 text-sm">
                                            You have the right to lodge a complaint with relevant data
                                            protection authorities.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Contact Information */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    7. Contact Me
                                </h2>

                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                                        If you have any questions about this Privacy Policy or how I handle your
                                        personal information, please don't hesitate to contact me:
                                    </p>
                                    <div className="space-y-2 text-slate-600 dark:text-slate-300">
                                        <p>📧 <strong>Email:</strong> hafaiedhakram@gmail.com</p>
                                        <p>📱 <strong>Phone:</strong> +216 50 569 298</p>
                                        <p>📍 <strong>Location:</strong> Carthage Salammbô, Tunis, Tunisia</p>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                                        I will respond to your privacy-related inquiries within a reasonable timeframe.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </div>
    );
}