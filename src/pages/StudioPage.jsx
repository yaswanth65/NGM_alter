"use client";

import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../components/common/SEO";

import {
    Mic,
    Smartphone,
    User,
    Box,
    TrendingUp,
    Video,
    Zap,
    ArrowRight,
    Layers,
    Layout,
    Maximize,
    ShieldCheck,
    BarChart3,
    Repeat
} from "lucide-react";


const StudioPage = () => {

    return (
        <main className="bg-black min-h-screen text-white pt-32">
            <SEO
                title="Studio"
                description="Explore Nitty Gritty Studio — our creative space for video production, photography, and digital content creation."
                keywords="Nitty Gritty studio, creative studio Mumbai, video production studio, photography studio"
                canonical="https://nittygrittylabz.com/studio"
            />
            {/* 1. Breadcrumb & Hero Title */}
            <div className="max-w-7xl mx-auto px-6 mb-24 text-center pt-15">
                <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
                    Studio By <span className="text-red-600">Nitty Gritty</span>
                </h1>

                <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm tracking-widest uppercase font-medium">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    <span>/</span>
                    <span className="text-white">Studio</span>
                </div>
            </div>

            {/* 2. Innovative Intro Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32 relative">
                {/* Premium Background Element: Subtle Red Glow */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -z-10" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Side: The "Intent" Statement */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="flex items-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                            </svg>
                            The Purpose-Built Space
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold font-outfit uppercase leading-[1.1] text-white">
                            Where Content Gets <br />
                            <span className="text-red-600 italic font-medium">Created with Intent.</span>
                        </h2>

                        <div className="h-1 w-20 bg-red-600 rounded-full"></div>

                        <p className="text-neutral-400 text-xl md:text-2xl leading-relaxed font-light max-w-2xl">
                            We’ve helped brands grow through strategy, content, and execution.
                            Now, we bring the entire process <span className="text-white font-medium italic">under one roof.</span>
                        </p>
                    </div>

                    {/* Right Side: The "Introducing" Card (Premium Element) */}
                    <div className="lg:col-span-5 lg:mt-20">
                        <div className="relative p-8 md:p-10 rounded-[32px] bg-neutral-900/50 border border-white/10 backdrop-blur-xl group hover:border-red-600/40 transition-all duration-700">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 p-4">
                                <div className="w-8 h-8 border-t-2 border-r-2 border-red-600/50 group-hover:border-red-600 transition-colors" />
                            </div>

                            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-6">Introducing</p>

                            <h3 className="text-2xl md:text-3xl font-bold text-white font-outfit mb-6 leading-snug">
                                Our In-House Studio
                            </h3>

                            <p className="text-neutral-400 text-lg leading-relaxed font-light">
                                A space designed for brands, creators, and businesses who want to create
                                <span className="text-white font-normal block mt-2">
                                    • Consistently <br />
                                    • Efficiently <br />
                                    • With Purpose
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Why This Studio Exists Section */}
            <section className="max-w-7xl mx-auto px-6 mb-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Side: Sticky Heading (Desktop) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                        <div className="flex items-center gap-2 text-red-600 uppercase tracking-widest text-md font-bold mb-6">
                            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                            The Problem
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase leading-tight mb-8">
                            Content today isn’t a <br />
                            <span className="text-red-600 italic font-medium">one-time effort.</span>
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed font-light">
                            It’s a continuous process. Most brands struggle to stay consistent because their
                            creative environment isn't optimized for the speed of modern digital growth.
                        </p>
                    </div>

                    {/* Right Side: The Struggles vs. The Solution */}
                    <div className="lg:col-span-7 space-y-12">

                        {/* The Struggles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: "Unplanned", label: "Shoots are often reactive, not proactive." },
                                { title: "Inconsistent", label: "Spaces change, lighting varies, quality drops." },
                                { title: "Directionless", label: "Output lacks a clear strategic 'why'." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-red-600/20 transition-all duration-500">
                                    <div className="text-red-600 text-sm font-bold uppercase tracking-tighter mb-4 opacity-50">Issue 0{i + 1}</div>
                                    <h4 className="text-white font-bold uppercase mb-2 tracking-wide">{item.title}</h4>
                                    <p className="text-neutral-500 text-md leading-snug">{item.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* The BIG Solution: The "Studio" Reveal */}
                        <div className="relative mt-20 group">
                            {/* Decorative Viewfinder Corners */}
                            <div className="absolute -top-5 -left-5 w-12 h-12 border-t-3 border-l-3 border-white/20 group-hover:border-red-600 transition-colors duration-500" />
                            <div className="absolute -bottom-5 -right-5 w-12 h-12  border-b-3 border-r-3 border-white/20 group-hover:border-red-600 transition-colors duration-500" />

                            <div className="bg-neutral-900 border border-white/10 p-8 md:p-12 rounded-[40px] overflow-hidden relative">
                                {/* Background "Intent" Watermark */}
                                <div className="absolute right-0 bottom-5 text-[120px] font-bold text-white/[0.1] leading-none select-none pointer-events-none translate-y-1/4">
                                    INTENT
                                </div>

                                <div className="relative z-10 max-w-2xl">
                                    <h3 className="text-3xl md:text-4xl font-bold font-outfit uppercase mb-6">
                                        Our studio <span className="text-red-600">solves that.</span>
                                    </h3>
                                    <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed mb-8">
                                        A dedicated environment where your content is
                                        <span className="text-white font-medium"> not just shot — </span>
                                        it’s created with <span className="text-red-600 italic">clarity, structure, and intent.</span>
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <span className="px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-500 text-xs font-bold uppercase tracking-widest">
                                            Strategy-First
                                        </span>
                                        <span className="px-4 py-2 bg-white/15 border border-white/10 rounded-full text-white/60 text-xs font-bold uppercase tracking-widest">
                                            Scalable Output
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. What You Can Create Section */}
            <section className="max-w-7xl mx-auto px-6 mb-40">
                <div className="text-center mb-20 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                        Capabilities
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase">
                        What You Can <span className="text-red-600 italic font-medium">Create Here</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light">
                        A flexible, fully equipped space designed to bridge the gap between
                        <span className="text-white font-medium"> raw ideas </span> and <span className="text-white font-medium"> premium output.</span>
                    </p>
                </div>

                {/* The Interactive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Podcast Shoots", desc: "Multi-cam setups with professional acoustic treatment.", icon: Mic },
                        { title: "Reels & Short-Form", desc: "Fast-paced vertical content optimized for social algorithms.", icon: Smartphone },
                        { title: "Personal Branding", desc: "Curated visuals for founders and thought leaders.", icon: User },
                        { title: "Product Shoots", desc: "Precision lighting to make your physical goods stand out.", icon: Box },
                        { title: "Ad Creatives", desc: "High-conversion visuals designed for performance marketing.", icon: TrendingUp },
                        { title: "Interviews", desc: "Clean, professional talking-head videos with depth.", icon: Video },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-[32px] bg-neutral-900 border border-white/5 transition-all duration-500 hover:border-red-600/30 overflow-hidden"
                        >
                            {/* Hover Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="mb-6 inline-block">
                                    <item.icon
                                        strokeWidth={1.5}
                                        className="w-10 h-10 text-white transition-all duration-500 
                                       group-hover:text-red-600 
                                       group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] 
                                       group-hover:scale-110 group-hover:-rotate-6"
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-white font-outfit mb-3 uppercase tracking-wide group-hover:text-red-500 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-neutral-400 text-md leading-relaxed font-medium opacity-80 group-hover:opacity-100">
                                    {item.desc}
                                </p>

                                {/* Minimal Arrow Indicator */}
                                <div className="mt-8 flex items-center gap-2 text-white/20 group-hover:text-red-600 transition-colors duration-500">
                                    <div className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final Callout */}
                <div className="mt-20 pt-12 border-t border-white/5 text-center">
                    <p className="text-neutral-500 text-xl italic">
                        Whether you’re a <span className="text-white">brand</span>, <span className="text-white">founder</span>, or <span className="text-white">creator</span> —
                        this is where your content <span className="text-red-600 font-bold not-italic">comes to life.</span>
                    </p>
                </div>
            </section>

            {/* 6. A Space That Adapts Section */}
            <section className="max-w-7xl mx-auto px-6 mb-40 relative group">

                {/* --- 3D GRADIENT & GLASS ELEMENT (THE ROOM) --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
                    {/* Subtle background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-red-600/5 blur-[120px] rounded-full" />

                    {/* The Adapting Cube Structure */}
                    <div className="hidden lg:block absolute right-0 top-1/4 perspective-[1200px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                        <div className="relative w-96 h-96 preserve-3d animate-[spin_30s_linear_infinite]">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-sm"
                                    style={{ transform: `translateZ(${i * 60}px)` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="max-w-3xl mb-20 space-y-6">
                        <div className="flex items-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                            <Maximize className="w-4 h-4" />
                            Adaptive Environment
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold font-outfit uppercase leading-tight">
                            A Space That<br></br> <span className="text-red-600 italic font-medium">Adapts To You</span>
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl leading-[1.5em] tracking-wide font-light">
                            Not every brand needs the same level of support — and we understand that.
                            <span className="text-white block mt-2">Choose the workflow that fits your vision.</span>
                        </p>
                    </div>

                    {/* Tiers Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Studio Only",
                                desc: "For creators and teams who just need a professional space.",
                                features: ["Full Studio Access", "Acoustic Treatment", "High-speed Internet"],
                                icon: Layout,
                                tag: "Space"
                            },
                            {
                                title: "Studio + Support",
                                desc: "For smooth execution with the right technical setup.",
                                features: ["Lighting & Camera Setup", "Technical Assistant", "Equipment Access"],
                                icon: Layers,
                                tag: "Execution",
                                popular: true
                            },
                            {
                                title: "End-to-End Content",
                                desc: "Strategy, shoot, and final output — all aligned with your brand.",
                                features: ["Content Strategy", "Professional Editing", "Brand Alignment"],
                                icon: Zap,
                                tag: "Full Service"
                            }
                        ].map((tier, i) => (
                            <div
                                key={i}
                                className={`relative p-8 md:p-10 rounded-[40px] border transition-all duration-700 overflow-hidden flex flex-col h-full
                        ${tier.popular ? 'bg-white/10 border-red-600/50 shadow-[0_0_40px_rgba(220,38,38,0.1)]' : 'bg-neutral-900/50 border-white/10 hover:border-white/30'}`}
                            >
                                {tier.popular && (
                                    <div className="absolute top-6 right-8 bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest">
                                        Most Flexible
                                    </div>
                                )}

                                <div className="mb-8 p-4 w-fit rounded-2xl bg-white/5 border border-white/10 text-white group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <tier.icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-2xl font-bold font-outfit text-white uppercase mb-4 tracking-tight">
                                    {tier.title}
                                </h3>

                                <p className="text-neutral-600 text-md leading-relaxed font-medium mb-8 flex-1">
                                    {tier.desc}
                                </p>

                                <ul className="space-y-4 mb-5">
                                    {tier.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-neutral-200 tracking-wide text-sm uppercase leading-3.5">
                                            <div className="w-1 h-1 rounded-full bg-red-600" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                {/* <button className="group mt-auto flex items-center justify-between w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 font-bold uppercase text-xs tracking-widest">
                                    Choose {tier.tag}
                                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                                </button> */}
                            </div>
                        ))}
                    </div>

                    {/* Closing text from your prompt */}
                    <div className="mt-16 text-center">
                        <p className="text-neutral-500 text-xl font-light italic">
                            Flexible, simple, and built around <span className="text-white">your workflow.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* 7. Strategic Difference Section*/}
            <section className="max-w-7xl mx-auto px-6 mb-32 relative py-16">
                {/* Subtle Background Glow - Creates a focal point without being an "animation" */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* LEFT SIDE: The Statement */}
                    <div className="lg:col-span-5 sticky top-32">
                        <div className="flex items-center gap-3 text-red-600 uppercase tracking-[0.5em] text-sm font-bold mb-6">
                            <div className="w-10 h-[1px] bg-red-600" />
                            The Difference
                        </div>

                        <h2 className="text-5xl md:text-6xl font-bold font-outfit uppercase leading-[1.1] text-white mb-8">
                            More Than <br />
                            <span className="text-red-600 italic font-medium">Just a Studio.</span>
                        </h2>

                        <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-light mb-10">
                            You can use it your way — but what makes it different is the
                            <span className="text-white font-medium italic"> strategic engine </span>
                            that backs every frame we capture.
                        </p>

                        <div className="p-8 rounded-[32px] bg-neutral-900 border border-white/5 border-l-red-600 border-l-4">
                            <p className="text-white text-xl md:text-2xl font-outfit uppercase font-bold leading-tight">
                                Because content without direction <br />
                                <span className="text-red-600">is just output.</span>
                            </p>
                            <p className="text-neutral-500 mt-3 text-sm italic tracking-wide">
                                We make sure it has purpose.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Feature Cards (The "Why") */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Performance",
                                desc: "A team that understands content performance and digital growth.",
                                num: "01"
                            },
                            {
                                title: "Guidance",
                                desc: "Expert direction to ensure your vision translates to results.",
                                num: "02"
                            },
                            {
                                title: "Consistency",
                                desc: "A standardized setup designed for recurring content loops.",
                                num: "03"
                            },
                            {
                                title: "Integration",
                                desc: "Seamless alignment with your overall digital and brand strategy.",
                                num: "04"
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-10 rounded-[40px] bg-neutral-900/50 border border-white/5 hover:border-red-600/30 transition-all duration-500">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600 transition-colors duration-500">
                                        <span className="text-white font-bold font-outfit">NG</span>
                                    </div>
                                    <span className="text-neutral-700 font-black text-4xl group-hover:text-red-600/20 transition-colors">
                                        {item.num}
                                    </span>
                                </div>

                                <h4 className="text-2xl font-bold font-outfit text-white uppercase mb-4 tracking-tight">
                                    {item.title}
                                </h4>

                                <p className="text-neutral-400 text-md leading-relaxed font-medium tracking-wide group-hover:text-neutral-300 transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Who This Is For Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32 relative py-20 border-y border-white/5">
                {/* Subtle Background Text - Aesthetic Watermark */}
                <div className="absolute top-0 right-10 text-[12vw] font-black text-white/[0.02] uppercase pointer-events-none select-none tracking-tighter">
                    For You
                </div>

                <div className="relative z-10">
                    {/* Header Area */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                        <div className="max-w-2xl space-y-6">
                            <div className="flex items-center gap-3 text-red-600 uppercase tracking-[0.5em] text-sm font-bold">
                                <div className="w-10 h-[1px] bg-red-600" />
                                Target Audience
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold font-outfit uppercase leading-[0.95] text-white">
                                Who This <br />
                                <span className="text-red-600 italic font-medium">Is Built For.</span>
                            </h2>
                        </div>
                        <div className="md:text-right">
                            <p className="text-neutral-500 text-lg md:text-xl font-light italic max-w-sm">
                                If content is part of your growth — <br />
                                <span className="text-white not-italic font-medium">this space is built for you.</span>
                            </p>
                        </div>
                    </div>

                    {/* Audience Grid - 4 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
                        {[
                            {
                                title: "Brands",
                                subtitle: "Digital Presence",
                                desc: "Building a strong, consistent identity that resonates across every digital touchpoint.",
                                icon: "◈"
                            },
                            {
                                title: "Founders",
                                subtitle: "Personal Brands",
                                desc: "Founders growing personal authority through high-impact, thought-leadership content.",
                                icon: "◇"
                            },
                            {
                                title: "Businesses",
                                subtitle: "Performance",
                                desc: "Running aggressive performance campaigns that require data-backed, high-converting visuals.",
                                icon: "◬"
                            },
                            {
                                title: "Creators",
                                subtitle: "Consistency",
                                desc: "Creators who need a reliable, professional environment to maintain a high-volume output.",
                                icon: "⬡"
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-10 md:p-8 lg:p-10 h-full flex flex-col bg-neutral-900/30 border border-white/5 hover:bg-neutral-900 transition-all duration-700 hover:border-red-600/40 last:rounded-b-[40px] md:last:rounded-bl-none"
                            >
                                {/* Hover Red Spotlight Effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <div className="mb-12">
                                    <span className="text-red-600 text-2xl font-light opacity-50 group-hover:opacity-100 transition-opacity">
                                        {item.icon}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <p className="text-red-600 text-sm uppercase tracking-[0.25em] font-bold mb-4">
                                        {item.subtitle}
                                    </p>
                                    <h4 className="text-4xl font-bold font-outfit text-white uppercase mb-6 tracking-tight">
                                        {item.title}
                                    </h4>
                                    <p className="text-neutral-400 text-md leading-relaxed font-light group-hover:text-neutral-200 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-neutral-700 text-sm font-bold group-hover:text-red-600/50 transition-colors">
                                        PHASE_0{i + 1}
                                    </span>
                                    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-red-600 transition-colors shadow-[0_0_10px_transparent] group-hover:shadow-red-600/50" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Why Nitty Gritty Studio (Dual-Core) */}
            <section className="max-w-7xl mx-auto px-6 mb-32 relative py-20">

                {/* Background Decorative Element: The "Bridge" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-linear-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

                <div className="relative z-10 text-center mb-24 space-y-6">
                    <div className="flex items-center justify-center gap-3 text-red-600 uppercase tracking-[0.5em] text-sm font-bold">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        The Competitive Edge
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold font-outfit uppercase leading-tight">
                        Why <span className="text-red-600">Nitty Gritty</span> Studio
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 rounded-[60px] overflow-hidden bg-neutral-900/20 backdrop-blur-3xl">

                    {/* Left Side: Creation */}
                    <div className="p-12 md:p-20 border-b lg:border-b-0 lg:border-r border-white/5 group hover:bg-neutral-900/40 transition-colors duration-700">
                        <div className="space-y-8">
                            <span className="text-6xl opacity-20 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-500 font-outfit font-black">01</span>
                            <h3 className="text-3xl md:text-4xl font-bold font-outfit uppercase text-white">
                                Premium <br /><span className="text-red-600 italic">Creation</span>
                            </h3>
                            <p className="text-neutral-400 text-lg font-light leading-relaxed">
                                It’s about the aesthetic. We provide the environment where your content doesn't just "get made"—it looks <span className="text-white font-medium">world-class.</span>
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Performance */}
                    <div className="p-12 md:p-20 group hover:bg-neutral-900/40 transition-colors duration-700">
                        <div className="space-y-8 lg:text-right">
                            <span className="text-6xl opacity-20 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-500 font-outfit font-black block">02</span>
                            <h3 className="text-3xl md:text-4xl font-bold font-outfit uppercase text-white">
                                Data-Driven <br /><span className="text-red-600 italic">Performance</span>
                            </h3>
                            <p className="text-neutral-400 text-lg font-light leading-relaxed lg:ml-auto lg:max-w-xs">
                                It’s about the results. We understand the metrics, the algorithms, and what actually <span className="text-white font-medium">converts.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* The "Strategy" Intersection - The Bridge */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="relative p-10 md:p-14 rounded-[40px] bg-black border border-red-600/30 text-center overflow-hidden group">
                        {/* Inner Glow */}
                        <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 space-y-6">
                            <h4 className="text-2xl md:text-3xl font-bold font-outfit uppercase text-white tracking-tight">
                                The <span className="text-red-600">Strategy</span> Intersection
                            </h4>
                            <p className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed italic">
                                "What you shoot here doesn’t just look good — it fits into a bigger strategy that <span className="text-white font-bold not-italic">actually works.</span>"
                            </p>
                            <div className="flex justify-center gap-4 pt-4">
                                <div className="h-[2px] w-12 bg-red-600/20" />
                                <div className="h-[2px] w-12 bg-red-600" />
                                <div className="h-[2px] w-12 bg-red-600/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 mb-32 md:mb-40">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit uppercase leading-tight text-white">
                        "However you create &mdash; we make sure you have the <span className="text-red-600 italic font-medium"> right space to do it better."</span>
                    </h2>
                </div>
            </section>
        </main>
    );
}

export default StudioPage;