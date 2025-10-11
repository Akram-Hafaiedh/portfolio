import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">
                    Get In Touch
                </h2>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="animate-slide-up">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Let's Connect</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                            I'm always interested in new opportunities and exciting projects.
                            Feel free to reach out if you'd like to collaborate or just say hello!
                        </p>
                        
                        {/* Enhanced Contact Info */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl" />
                                <div>
                                    <a
                                        href="mailto:hafaiedhakram@gmail.com"
                                        className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                    >
                                        hafaiedhakram@gmail.com
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <FaPhone className="text-green-600 dark:text-green-400 text-xl" />
                                <div>
                                    <a
                                        href="tel:+21650569298"
                                        className="text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
                                    >
                                        +216 50 569 298
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400 text-xl" />
                                <div>
                                    <p className="text-slate-700 dark:text-slate-300 font-medium">Carthage, Tunis, Tunisia</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mb-8">
                            <a
                                href="https://www.linkedin.com/in/akram-hafaiedh-368b3312b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <FaLinkedin />
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/Akram-Hafaiedh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <FaGithub />
                                GitHub
                            </a>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Info</h4>
                            <div className="space-y-2 text-slate-600 dark:text-slate-300">
                                <p>💼 Available for freelance opportunities</p>
                                <p>🚀 Open to full-time positions</p>
                                <p>🌍 Remote work preferred</p>
                                <p>⚡ Quick response time</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="animate-fade-in">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Send a Message</h3>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}