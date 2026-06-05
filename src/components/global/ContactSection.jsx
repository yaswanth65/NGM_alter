import { useState } from "react";
import { Link } from "react-router-dom";

const WEB3FORMS_KEY = "6a43d236-7387-4a4a-83a6-4d9b2dfcd235";

export default function ContactSection({ email: customEmail }) {
    const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    ...form,
                    subject: "New Enquiry from Nitty Gritty Website",
                }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setForm({ name: "", phone: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        // Replaced static padding with a clamp function for smooth vertical scaling
        <section className="py-[clamp(3rem,8vw,5rem)] border-t border-white/10 bg-black text-white">
            <div className="max-w-7xl mx-auto px-[clamp(1.5rem,4vw,2rem)]">
                <div className="mb-[clamp(2.5rem,6vw,4rem)] uppercase">
                    {/* Fluid subheading */}
                    <h3 className="text-[clamp(0.875rem,2vw,1.25rem)] font-light tracking-widest text-neutral-400 mb-[clamp(0.5rem,2vw,1rem)]">
                        Lets Work
                    </h3>
                    {/* Fluid main heading: scales from 3.5rem on mobile to 6rem on desktop */}
                    <h2 className="text-[clamp(2.5rem,8vw,6rem)] leading-tight font-bold font-outfit text-white">
                        Together
                    </h2>
                </div>

                {/* Fluid gap between form and contact info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(3rem,8vw,5rem)]">
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-[clamp(1.25rem,3vw,1.5rem)]">
                        {/* Changed to sm:grid-cols-2 so inputs side-by-side sooner on tablets */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(1rem,3vw,1.5rem)]">
                            <div className="space-y-[0.5rem]">
                                <label htmlFor="cs-name" className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-neutral-400">Name*</label>
                                <input
                                    type="text"
                                    id="cs-name"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-[1rem] py-[0.75rem] text-[clamp(0.875rem,1.5vw,1rem)] text-white focus:outline-none focus:border-red-600 transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-[0.5rem]">
                                <label htmlFor="cs-phone" className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-neutral-400">Phone Number*</label>
                                <input
                                    type="tel"
                                    id="cs-phone"
                                    name="phone"
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-[1rem] py-[0.75rem] text-[clamp(0.875rem,1.5vw,1rem)] text-white focus:outline-none focus:border-red-600 transition-colors"
                                    placeholder="Enter your number"
                                />
                            </div>
                        </div>
                        <div className="space-y-[0.5rem]">
                            <label htmlFor="cs-email" className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-neutral-400">Email ID*</label>
                            <input
                                type="email"
                                id="cs-email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-[1rem] py-[0.75rem] text-[clamp(0.875rem,1.5vw,1rem)] text-white focus:outline-none focus:border-red-600 transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="space-y-[0.5rem]">
                            <label htmlFor="cs-message" className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-neutral-400">Message*</label>
                            <textarea
                                id="cs-message"
                                name="message"
                                required
                                rows={6}
                                value={form.message}
                                onChange={handleChange}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-[1rem] py-[0.75rem] text-[clamp(0.875rem,1.5vw,1rem)] text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
                                placeholder="Tell us about your project"
                            ></textarea>
                        </div>

                        {status === "success" && (
                            <p className="text-green-400 text-[clamp(0.875rem,1.5vw,1rem)] font-medium">✓ Message sent! We'll be in touch soon.</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-400 text-[clamp(0.875rem,1.5vw,1rem)] font-medium">Something went wrong. Please try again.</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-white text-black font-bold py-[1rem] px-[2rem] rounded-lg hover:bg-neutral-200 transition-colors w-full md:w-auto disabled:opacity-60 text-[clamp(0.875rem,1.5vw,1rem)]"
                        >
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </button>
                    </form>

                    {/* Contact Details */}
                    <div className="flex flex-col justify-start space-y-[clamp(2rem,5vw,3rem)]">
                        <div className="space-y-[0.5rem]">
                            <h4 className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold font-outfit">Email</h4>
                            <a
                                href={`mailto:${customEmail || 'business@nittygrittylabz.com'}`}
                                className="text-neutral-400 hover:text-white transition-colors text-[clamp(1rem,2vw,1.125rem)] break-all"
                            >
                                {customEmail || 'business@nittygrittylabz.com'}
                            </a>
                        </div>

                        <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
                            <h4 className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold font-outfit">Social Links</h4>
                            <div className="flex flex-wrap gap-[1rem]">
                                {/* Social Icons kept their fixed sizes as vectors scale best with explicit width/height containers, but the gap is standard 1rem */}
                                <a href="https://youtube.com/@nittygrittylabz" target="_blank" rel="noopener noreferrer" className="bg-white text-black w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                </a>
                                <a href="https://www.linkedin.com/company/nittygrittymedia/" target="_blank" rel="noopener noreferrer" className="bg-white text-black w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                                <a href="https://www.instagram.com/nitty_gritty_labz/" target="_blank" rel="noopener noreferrer" className="bg-white text-black w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://www.instagram.com/nitty_gritty_studio/" target="_blank" rel="noopener noreferrer" className="bg-white text-black w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://www.facebook.com/NGMAdvertising2020" target="_blank" rel="noopener noreferrer" className="bg-white text-black w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                                    <svg width="10" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}