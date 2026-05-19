"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

const WEB3FORMS_KEY = "6a43d236-7387-4a4a-83a6-4d9b2dfcd235";

export default function ContactPage() {
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
                    subject: "New Contact Enquiry from Nitty Gritty Website",
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
        <div className="min-h-screen bg-black text-white pt-32">
            <SEO
                title="Contact Us"
                description="Get in touch with Nitty Gritty Media. Let's discuss your next project — video production, digital marketing, web development, and more."
                keywords="contact Nitty Gritty, Mumbai creative agency, video production inquiry, digital marketing consultation"
                canonical="https://nittygrittylabz.com/contact"
            />
            {/* Hero Section */}
            <div className="relative mb-24">
                {/* Red Glow */}
                <div className="absolute top-[-100px] right-0 w-[600px] h-[600px] bg-red-600/20 blur-[150px] -z-10 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 text-center pt-15">
                    <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
                        CONTACT US
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm tracking-widest uppercase font-medium">
                        <Link to="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-white">Contact Us</span>
                    </div>
                </div>
            </div>

            {/* Get In Touch Section */}
            <div className="max-w-7xl mx-auto px-6 mb-24 relative">
                <div className="mb-8">
                    <h2 className="text-2xl font-light text-white uppercase tracking-[0.3em] mb-2 font-outfit">
                        GET IN
                    </h2>
                    <h1 className="text-[80px] md:text-[120px] font-black font-outfit uppercase text-white leading-[0.8] tracking-tight">
                        TOUCH
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left side: Form */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Name*"
                                    className="w-full bg-[#111111] border border-white/5 rounded-md px-6 py-4 text-sm focus:outline-none focus:border-red-600 transition-colors text-white placeholder-neutral-500"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number*"
                                    className="w-full bg-[#111111] border border-white/5 rounded-md px-6 py-4 text-sm focus:outline-none focus:border-red-600 transition-colors text-white placeholder-neutral-500"
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email ID*"
                                className="w-full bg-[#111111] border border-white/5 rounded-md px-6 py-4 text-sm focus:outline-none focus:border-red-600 transition-colors text-white placeholder-neutral-500"
                            />
                            <textarea
                                name="message"
                                required
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Message*"
                                rows={8}
                                className="w-full bg-[#111111] border border-white/5 rounded-md px-6 py-4 text-sm focus:outline-none focus:border-red-600 transition-colors resize-none text-white placeholder-neutral-500"
                            ></textarea>

                            {status === "success" && (
                                <p className="text-green-400 text-sm font-medium">✓ Message sent! We'll be in touch soon.</p>
                            )}
                            {status === "error" && (
                                <p className="text-red-400 text-sm font-medium">Something went wrong. Please try again.</p>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="px-12 py-3 rounded-full border border-white/40 text-white font-bold tracking-widest text-sm uppercase hover:bg-white hover:text-black transition-all bg-transparent relative group overflow-hidden disabled:opacity-60"
                                >
                                    <span className="relative z-10">{status === "loading" ? "Sending..." : "Submit"}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-red-500 to-red-700 blur-sm opacity-50 group-hover:opacity-100 transition-opacity -z-10"></div>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right side: Contact Details */}
                    <div className="lg:col-span-4 flex flex-col justify-start pt-4">
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-xl font-bold mb-2 text-white">Sales</h4>
                                <a href="mailto:business@nittygrittymedia.com" className="text-neutral-400 hover:text-white transition-colors text-lg">
                                    business@nittygrittymedia.com
                                </a>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold mb-2 text-white">Careers</h4>
                                <a href="mailto:info@nittygrittymedia.com" className="text-neutral-400 hover:text-white transition-colors text-lg">
                                    info@nittygrittymedia.com
                                </a>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold mb-6 text-white">Social Links</h4>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        {
                                            name: "Youtube",
                                            url: "https://www.youtube.com/@nittygrittymedia",
                                            icon: (
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                            )
                                        },
                                        {
                                            name: "LinkedIn",
                                            url: "https://www.linkedin.com/company/nittygrittymedia/",
                                            icon: (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                            )
                                        },
                                        {
                                            name: "Instagram",
                                            url: "https://www.instagram.com/nitty_gritty_media/",
                                            icon: (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                            )
                                        },
                                        {
                                            name: "X",
                                            url: "https://x.com/nittygrittymedia",
                                            icon: (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                            )
                                        },
                                        {
                                            name: "Facebook",
                                            url: "https://www.facebook.com/NGMAdvertising2020",
                                            icon: (
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                            )
                                        }
                                    ].map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url || "#"}
                                            target={social.url ? "_blank" : undefined}
                                            rel={social.url ? "noopener noreferrer" : undefined}
                                            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors"
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-[500px] mb-0 relative overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0046469852045!2d72.94333757544419!3d19.19499938203423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9006b3febdb%3A0x62673843b2869185!2sCentura%20Square%20IT%20Park!5e0!3m2!1sen!2sin!4v1772260935606!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(100%) hue-rotate(180deg) brightness(0.6) contrast(1.5)" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-black/40"></div>
            </div>
        </div>
    );
}
