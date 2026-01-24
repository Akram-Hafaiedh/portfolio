import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaCheckCircle } from "react-icons/fa";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { Video } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-4">
                        <FaEnvelope className="text-xs" />
                        Get In Touch
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Ready to start your project? Choose how you'd like to connect
                    </p>
                </div>

                {/* Contact Methods & Info */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Email */}
                    <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                        <a
                            href="mailto:hafaiedhakram@gmail.com"
                            className="relative block p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-blue-500/50 transition-all h-full"
                        >
                            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaEnvelope className="text-blue-400 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                Email Me
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Send me a detailed message about your project
                            </p>
                            <p className="text-slate-300 font-medium break-all">
                                hafaiedhakram@gmail.com
                            </p>
                        </a>
                    </div>

                    {/* Phone */}
                    <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                        <a
                            href="tel:+21650569298"
                            className="relative block p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-green-500/50 transition-all h-full"
                        >
                            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaPhone className="text-green-400 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                Call Me
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Prefer to talk? Give me a call directly
                            </p>
                            <p className="text-slate-300 font-medium">
                                +216 50 569 298
                            </p>
                        </a>
                    </div>

                    {/* Location */}
                    <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                        <div className="relative block p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl h-full">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                                <FaMapMarkerAlt className="text-purple-400 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Location
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Based in Tunisia, working globally
                            </p>
                            <p className="text-slate-300 font-medium">
                                Carthage, Tunis, Tunisia
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Form & Additional Info */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left - Form (2 columns) */}
                    <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
                            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Send a Message
                                </h3>
                                <p className="text-slate-400 mb-8">
                                    Fill out the form and I'll get back to you within 24 hours
                                </p>
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                    {/* Right - Additional Info (1 column) */}
                    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        {/* Meeting CTA Card */}
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
                            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                                        <Video className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">
                                            Free Consultation
                                        </h4>
                                        <p className="text-green-50 text-sm">
                                            30-min video call to discuss your project
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/booking"
                                    className="flex items-center justify-center gap-2 w-full bg-white hover:bg-green-50 text-green-600 px-4 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                                >
                                    <FaCalendar className="text-sm" />
                                    Book a Meeting
                                </Link>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl">
                            <h4 className="font-bold text-white mb-4">Connect With Me</h4>
                            <div className="space-y-3">
                                <a
                                    href="https://www.linkedin.com/in/akram-hafaiedh-368b3312b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-blue-400 font-medium transition-all hover:scale-105 group"
                                >
                                    <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
                                    LinkedIn
                                </a>
                                <a
                                    href="https://github.com/Akram-Hafaiedh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white font-medium transition-all hover:scale-105 group"
                                >
                                    <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                                    GitHub
                                </a>
                            </div>
                        </div>

                        {/* Availability Info */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl">
                            <h4 className="font-bold text-white mb-4">Availability</h4>
                            <div className="space-y-3">
                                {[
                                    { icon: FaCheckCircle, text: 'Freelance projects', color: 'text-green-400' },
                                    { icon: FaCheckCircle, text: 'Full-time roles', color: 'text-blue-400' },
                                    { icon: FaCheckCircle, text: 'Remote work', color: 'text-purple-400' },
                                    { icon: FaCheckCircle, text: '24h response', color: 'text-orange-400' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <item.icon className={`${item.color} flex-shrink-0`} />
                                        <span className="text-slate-300 text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}