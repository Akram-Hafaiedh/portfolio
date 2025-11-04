export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-slate-950 text-center">
            <div className="max-w-6xl mx-auto">
                {/* Developer Credits */}
                <div className="">
                    <div className="px-4 py-4">
                        <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-2 text-sm">
                            {/* Copyright */}
                            <div className="text-gray-400 order-3 lg:order-1">
                                © {currentYear} Akram Hafaiedh. All rights reserved.
                            </div>
                            {/* Terms and Privacy Links */}
                            <div className="flex items-center gap-4 text-gray-400 order-2 lg:order-2">
                                <a
                                    href="/terms"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms
                                </a>
                                <span>•</span>
                                <a
                                    href="/policy"
                                    className="hover:text-white transition-colors"
                                >
                                    Policy
                                </a>
                            </div>
                            {/* Developer Credit – wraps nicely on small screens */}
                            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-gray-400 order-1 lg:order-3">
                                <span>Developed with</span>
                                <div className="flex items-center gap-1 text-red-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>by</span>
                                </div>
                                <a
                                    href="https://portfolio-six-mu-c3zpt9l3gd.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium bg-blue-500/10 px-3 py-1 rounded-full hover:bg-blue-500/20"
                                >
                                    Akram Hafaiedh
                                </a>
                                <span className="hidden lg:inline">•</span>
                                <a
                                    href="https://github.com/Akram-Hafaiedh/e-commerce"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.337-3.369-1.337-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.58 9.58 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                        />
                                    </svg>
                                    Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}