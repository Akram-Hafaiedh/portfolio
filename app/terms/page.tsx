// app/terms/page.tsx
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { FaGavel, FaExclamationTriangle, FaFileContract } from "react-icons/fa";

export default function TermsPage() {
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
                                <FaGavel className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                Last Updated
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
                            Terms of Use
                        </h1>

                        {/* Enhanced Subtitle */}
                        <div className="relative inline-block max-w-3xl mx-auto">
                            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 animate-slide-up">
                                Understanding how you can use my portfolio and services
                                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                    Please read these terms carefully.
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

            {/* Terms Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {/* Introduction */}
                        <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaFileContract className="text-blue-600" />
                                Welcome
                            </h2>
                            <p className="text-slate-700 dark:text-slate-300">
                                These Terms of Use govern your use of my portfolio website and services.
                                By accessing or using my website, you agree to be bound by these terms.
                            </p>
                        </div>

                        {/* Terms Sections */}
                        <div className="space-y-12">
                            {/* Acceptance of Terms */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    1. Acceptance of Terms
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    By accessing and using this website, you accept and agree to be bound by the terms
                                    and provision of this agreement.
                                </p>
                                <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-6">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>You must be at least 18 years old to use this website</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>You agree not to use the website for any illegal purpose</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>You agree to provide accurate information when contacting me</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Use of Services */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    2. Use of Services
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    My portfolio website provides information about my services, skills, and allows
                                    potential clients to contact me for opportunities.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            Permitted Uses
                                        </h4>
                                        <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                                            <li>• Viewing portfolio content</li>
                                            <li>• Contacting for opportunities</li>
                                            <li>• Downloading resume/CV</li>
                                            <li>• Scheduling meetings</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                        <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                                            <FaExclamationTriangle className="text-red-500" />
                                            Prohibited Uses
                                        </h4>
                                        <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                                            <li>• Automated scraping</li>
                                            <li>• Spamming contact forms</li>
                                            <li>• Misrepresentation</li>
                                            <li>• Illegal activities</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Intellectual Property */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    3. Intellectual Property
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    All content on this website, including but not limited to text, graphics, logos,
                                    and code, is my property and is protected by copyright laws.
                                </p>
                                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">You May:</h4>
                                    <ul className="text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span>View and display content for personal, non-commercial use</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span>Share links to my portfolio</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span>Reference my work in professional contexts</span>
                                        </li>
                                    </ul>

                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">You May Not:</h4>
                                    <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span>Copy, modify, or distribute content without permission</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span>Use my work for commercial purposes without agreement</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span>Claim my work as your own</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Contact & Communication */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    4. Contact & Communication
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    When you contact me through this website, you agree to:
                                </p>
                                <ul className="text-slate-600 dark:text-slate-300 space-y-3 ml-6">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Provide accurate and truthful information</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Use professional and respectful communication</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Understand that I may store your contact information for response purposes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Not send spam, unsolicited commercial emails, or malicious content</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Limitation of Liability */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    5. Limitation of Liability
                                </h2>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
                                    <p className="text-slate-700 dark:text-slate-300">
                                        <strong>Important:</strong> I strive to keep the website running smoothly and the information accurate.
                                        However, I cannot guarantee that the website will be available without interruptions
                                        or that all information will always be completely accurate and up to date.
                                    </p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mt-4">
                                    To the fullest extent permitted by law, I shall not be liable for any indirect,
                                    incidental, special, consequential, or punitive damages resulting from your use
                                    of or inability to use the website.
                                </p>
                            </section>

                            {/* Changes to Terms */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    6. Changes to Terms
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300">
                                    I reserve the right to modify these terms at any time. I will notify users of
                                    any changes by updating the "Last Updated" date at the top of this page.
                                    Your continued use of the website after any changes constitutes your acceptance
                                    of the new terms.
                                </p>
                            </section>

                            {/* Contact Information */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    7. Contact Information
                                </h2>
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                                        If you have any questions about these Terms of Use, please contact me:
                                    </p>
                                    <div className="space-y-2 text-slate-600 dark:text-slate-300">
                                        <p>📧 <strong>Email:</strong> hafaiedhakram@gmail.com</p>
                                        <p>📱 <strong>Phone:</strong> +216 50 569 298</p>
                                        <p>📍 <strong>Location:</strong> Carthage Salammbô, Tunis, Tunisia</p>
                                    </div>
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