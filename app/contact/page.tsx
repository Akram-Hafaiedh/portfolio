import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ContactForm from "../components/ContactForm";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaGlobe } from "react-icons/fa";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4 animate-fade-in">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto animate-slide-up">
                            I'm always interested in new opportunities and exciting projects.
                            Let's discuss how we can work together!
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <div className="animate-slide-up">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Let's Connect</h2>

                            <div className="space-y-8">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                                        <a
                                            href="mailto:hafaiedhakram@gmail.com"
                                            className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            hafaiedhakram@gmail.com
                                        </a>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            I typically respond within 24 hours
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaPhone className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Phone</h3>
                                        <a
                                            href="tel:+21650569298"
                                            className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                        >
                                            +216 50 569 298
                                        </a>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            Available for calls during business hours
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Location</h3>
                                        <p className="text-slate-600 dark:text-slate-300">
                                            Carthage Salammbô, Tunis, Tunisia
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            Available for remote work worldwide
                                        </p>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaGlobe className="text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Social & Professional</h3>
                                        <div className="space-y-2">
                                            <a
                                                href="https://www.linkedin.com/in/akram-hafaiedh-368b3312b/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            >
                                                <FaLinkedin />
                                                LinkedIn Profile
                                            </a>
                                            <a
                                                href="https://github.com/akramhafaiedh"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                                            >
                                                <FaGithub />
                                                GitHub Profile
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Info Card */}
                            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Info</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 dark:text-green-400">✓</span>
                                        <span className="text-slate-600 dark:text-slate-300">Available for freelance opportunities</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 dark:text-green-400">✓</span>
                                        <span className="text-slate-600 dark:text-slate-300">Open to full-time positions</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 dark:text-green-400">✓</span>
                                        <span className="text-slate-600 dark:text-slate-300">Remote work preferred</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 dark:text-green-400">✓</span>
                                        <span className="text-slate-600 dark:text-slate-300">Quick response time</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Send a Message</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm animate-slide-up">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">What types of projects do you work on?</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                I specialize in full-stack web development, including e-commerce platforms, business management systems,
                                mobile applications, and custom web solutions. I work with both startups and established companies.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm animate-slide-up">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Do you work remotely?</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Yes, I primarily work remotely and have experience collaborating with international teams.
                                I'm available for both remote and on-site projects depending on requirements.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm animate-slide-up">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">What's your typical project timeline?</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Project timelines vary depending on complexity. Small projects typically take 2-4 weeks,
                                medium projects 1-3 months, and large projects 3-6 months. I always provide detailed timelines during project planning.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm animate-slide-up">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Do you provide ongoing support?</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Yes, I offer ongoing maintenance, updates, and support for all projects I develop.
                                I can also provide training and documentation to help your team manage the system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </div>
    );
}
