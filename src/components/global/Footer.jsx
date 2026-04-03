import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative z-20 bg-black text-white py-[clamp(3rem,8vw,5rem)] border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-[clamp(1.5rem,4vw,3rem)]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[clamp(3rem,8vw,4rem)] md:gap-x-[clamp(1.5rem,3vw,2rem)] mb-[clamp(3rem,8vw,5rem)]">

                    {/* COLUMN 1: OFFICES (Span 4) */}
                    <div className="md:col-span-4 flex flex-col gap-[clamp(1.5rem,4vw,3rem)]">
                        <div>
                            <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold mb-[clamp(1rem,3vw,1.5rem)] text-white">Corporate Office</h3>
                            <p className="text-neutral-400 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed max-w-xs mb-10">
                                Office no. 733, Centura Square, Rd Number 27,<br />
                                opp. Lanxess, Wagle Industrial Estate,<br />
                                Thane West, Thane, Maharashtra 400604
                            </p>

                            <div className="text-red-600 hover:text-red-500 transition-colors font-bold tracking-[0.5em] uppercase text-sm">
                            <a href="/about/studio">
                                Explore our Studio
                            </a>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2: SERVICES & PARTNERS (Span 5) */}
                    <div className="md:col-span-5 flex flex-col gap-[clamp(2rem,6vw,3rem)]">
                        <div>
                            <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold mb-[clamp(1rem,3vw,1.5rem)] text-white">Services</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[clamp(1.5rem,4vw,2rem)] gap-y-[1rem]">
                                <ul className="space-y-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)] text-neutral-400">
                                    <li><Link to="/services" className="hover:text-white transition-colors">Film & Photography</Link></li>
                                    <li><Link to="/services" className="hover:text-white transition-colors">Websites and Apps</Link></li>
                                    <li><Link to="/services" className="hover:text-white transition-colors">Social Media Marketing</Link></li>
                                </ul>
                                <ul className="space-y-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)] text-neutral-400">
                                    <li><Link to="/services" className="hover:text-white transition-colors">Digital Marketing</Link></li>
                                    <li><Link to="/services" className="hover:text-white transition-colors">Graphic Designing</Link></li>
                                    <li><Link to="/services" className="hover:text-white transition-colors">Search Engine Optimization</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold mb-[clamp(1rem,3vw,1.5rem)] text-white">Official Partners</h3>
                            {/* Added flex-wrap so partners stack cleanly on very small screens instead of overflowing */}
                            <div className="flex flex-wrap items-center gap-[clamp(1.5rem,4vw,3rem)]">

                                {/* Meta Partner Logo */}
                                <div className="flex items-center gap-[0.75rem]">
                                    <div className="bg-[#0064E0] p-[0.375rem] rounded-sm">
                                        <svg className="w-[clamp(1.5rem,3vw,1.75rem)] h-[clamp(1.5rem,3vw,1.75rem)] text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16.924 10.662c-1.396 0-2.31.656-2.587 1.254l-.053.116-.053-.116c-.277-.598-1.191-1.254-2.587-1.254-1.928 0-3.321 1.543-3.321 3.254 0 1.954 1.543 3.321 3.254 3.321 1.464 0 2.222-.89 2.502-1.383l.205-.361.205.361c.28.493 1.038 1.383 2.502 1.383 1.711 0 3.254-1.367 3.254-3.321 0-1.711-1.393-3.254-3.321-3.254m0-1.896c2.81 0 5.217 2.158 5.217 5.15s-2.407 5.15-5.217 5.15c-1.63 0-2.903-1.026-3.708-2.618-.805 1.592-2.078 2.618-3.708 2.618-2.81 0-5.217-2.158-5.217-5.15s2.407-5.15 5.217-5.15c1.63 0 2.903 1.026 3.708 2.618.805-1.592 2.078-2.618 3.708-2.618Z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className="font-black text-[clamp(1.25rem,3vw,1.5rem)] tracking-tighter text-white">Meta</span>
                                        <span className="text-[clamp(0.5rem,1vw,0.55rem)] uppercase tracking-[0.2em] text-neutral-500 font-bold -mt-1">Business Partner</span>
                                    </div>
                                </div>

                                {/* Google Partner Logo */}
                                <div className="flex items-center gap-[0.75rem]">
                                    <div className="flex flex-col items-center">
                                        <div className="flex gap-[0.125rem] mb-[0.25rem]">
                                            <span className="text-[#4285F4] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)]">G</span>
                                            <span className="text-[#EA4335] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)]">o</span>
                                            <span className="text-[#FBBC05] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)]">o</span>
                                            <span className="text-[#4285F4] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)]">g</span>
                                            <span className="text-[#34A853] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)]">l</span>
                                            <span className="text-[#EA4335] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)]">e</span>
                                        </div>
                                        <span className="text-[clamp(0.5rem,1vw,0.55rem)] uppercase tracking-[0.2em] text-neutral-500 font-bold border-t border-neutral-800 pt-[0.25rem] w-full text-center">Partner</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 3: CONTACT INFO (Span 3) */}
                    <div className="md:col-span-3 flex flex-col gap-[clamp(1.5rem,4vw,2rem)] md:pl-[2rem]">
                        <div>
                            <h3 className="font-bold mb-[clamp(0.5rem,2vw,1rem)] text-[clamp(1.125rem,2vw,1.25rem)] text-white">Phone</h3>
                            <p className="text-neutral-400 text-[clamp(0.875rem,1.5vw,1rem)] break-words">
                                +91 9833401634 / +91 9773636203
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-[clamp(0.5rem,2vw,1rem)] text-[clamp(1.125rem,2vw,1.25rem)] text-white">Business</h3>
                            {/* break-all ensures long emails wrap cleanly on tiny screens */}
                            <a href="mailto:business@nittygrittyverse.com" className="text-neutral-400 text-[clamp(0.875rem,1.5vw,1rem)] hover:text-white transition-colors break-all">
                                business@nittygrittyverse.com
                            </a>
                        </div>
                        <div>
                            <h3 className="font-bold mb-[clamp(0.5rem,2vw,1rem)] text-[clamp(1.125rem,2vw,1.25rem)] text-white">Careers</h3>
                            {/* break-all ensures long emails wrap cleanly on tiny screens */}
                            <a href="mailto:careers@nittygrittyverse.com" className="text-neutral-400 text-[clamp(0.875rem,1.5vw,1rem)] hover:text-white transition-colors break-all">
                                careers@nittygrittyverse.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-[clamp(1.5rem,4vw,2rem)] border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-[clamp(1rem,3vw,1.5rem)] text-[clamp(0.7rem,1.5vw,0.75rem)] text-neutral-500">
                    <div className="text-center md:text-left">
                        &copy; 2016-{new Date().getFullYear()} | All rights reserved by : Nitty Gritty
                    </div>
                    {/* flex-wrap allows links to jump to the next line on mobile instead of forcing horizontal scrolling */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-[clamp(1rem,3vw,1.5rem)] gap-y-[0.5rem] uppercase tracking-wider font-medium text-white">
                        <Link to="#" className="hover:text-red-500 transition-colors">Youtube</Link>
                        <a href="https://www.linkedin.com/company/nittygrittymedia/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">LinkedIn</a>
                        <a href="https://www.instagram.com/nitty_gritty_media/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Instagram</a>
                        <a href="https://www.facebook.com/NGMAdvertising2020" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}