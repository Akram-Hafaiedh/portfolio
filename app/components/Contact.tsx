import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
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
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                                <a
                                    href="mailto:hafaiedhakram@gmail.com"
                                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    hafaiedhakram@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaLinkedin className="text-blue-600 dark:text-blue-400" />
                                <a
                                    href="https://www.linkedin.com/in/akram-hafaiedh-368b3312b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    LinkedIn Profile
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaGithub className="text-slate-600 dark:text-slate-400" />
                                <a
                                    href="https://github.com/akramhafaiedh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    GitHub Profile
                                </a>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Info</h4>
                            <div className="space-y-2 text-slate-600 dark:text-slate-300">
                                <p>📍 Carthage Salammbô, Tunis, Tunisia</p>
                                <p>📱 +216 50 569 298</p>
                                <p>💼 Available for freelance opportunities</p>
                                <p>🚀 Open to full-time positions</p>
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
