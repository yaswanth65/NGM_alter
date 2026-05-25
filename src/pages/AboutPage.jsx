"use client";

import { Link } from "react-router-dom";
import TimelineSlider from "@/components/about/TimelineSlider";
import ContactSection from "@/components/global/ContactSection";
import SEO from "../components/common/SEO";

export default function AboutPage() {
    const stats = [
        { label: "FILMS", value: "300+" },
        { label: "BRANDS", value: "250+" },
        { label: "WEBSITES", value: "100+" },
        { label: "AWARDS", value: "10+" },
    ];


  const team = [
    {
        name: "Pratik Jambhale",
        role: "Founder",
        image: "/profiles/Pratik Jambhale1.jpg",
        linkedin: "https://www.linkedin.com/in/pratik-jambhale-64b85270/",
        description: "A dynamic visual storyteller with 10+ years of media experience. He crafts impactful content across film, digital, and branded formats."
    },
    {
        name: "Sonal Rane",
        role: "Senior Executive Digital Marketing",
        image: "/profiles/Sonal Jain1.jpg",
        linkedin: "https://www.linkedin.com/",
        description: "Digital marketing professional with 5 years of experience in social media strategy, content creation, and campaign management, delivering measurable growth and scalable results."
    },
    {
        name: "Anoop Pawar",
        role: "Post-Production Supervisor",
        image: "/profiles/Anoop Pawar1.jpg",
        linkedin: "https://www.linkedin.com/in/anooppawar/",
        description: "Managing end-to-end post production and transforming raw footage into polished and engaging visual stories with expertise in editing, color grading, sound design, and motion graphics."
    },
    {
        name: "Abhishek Patankar",
        role: "Content Head",
        image: "/profiles/Abhishek Patankar.png",
        linkedin: "https://www.linkedin.com/in/abhishek-patankar-246a98290/",
        description: "L&D professional with 12+ years of experience, now an actor, voiceover artist, scriptwriter, and content strategist, with a natural flair for storytelling across film, media, and brand content."
    }
];

    return (
        <main className="bg-black min-h-screen text-white pt-32">
            <SEO
            title="About Nitty Gritty Labz | Creative Marketing & Branding Agency"
        description="Learn more about Nitty Gritty Labz, a creative marketing and branding agency focused on content, strategy, design, and digital growth for brands across industries."
        keywords="Branding Agency Mumbai, Creative Marketing Agency, Digital Growth, Content Strategy, Brand Identity Design"
        canonical="https://nittygrittylabz.com/about"
            />
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 mb-24 text-center pt-15">
                <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
                    ABOUT US
                </h1>
                <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm tracking-widest uppercase font-medium">
                    <Link to="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-white">About Us</span>
                </div>
            </div>

            {/* Intro Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold font-outfit mb-8 tracking-wide text-white">
                            Get Nitty Gritty: <span className="text-red-600">Where Vision Meets Results.</span>
                        </h2>
                        <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-semibold max-w-5xl justify-evenly">
                            <p>
                                At Get Nitty Gritty, we believe that great brands aren’t built on visibility alone — they’re built on connection, consistency, and clarity.
                            </p>
                            <p>
                                We started with a simple idea: brands don’t just need content, they need direction. In a digital space full of noise, what truly stands out is strategy backed by purpose and executed with precision.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {/* <div className="grid grid-cols-2 gap-8 md:gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <div className="text-5xl md:text-6xl font-light font-outfit text-white">
                                    {stat.value}
                                </div>
                                <div className="h-px w-full bg-linear-to-r from-white/30 to-transparent my-2"></div>
                                <div className="text-sm tracking-[0.2em] text-neutral-400 uppercase font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* What We Do Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                {/* Removed card styling classes, kept the grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Side: Heading */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                            <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                            What We Do
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase leading-tight text-white">
                            We help brands move beyond just &ldquo;being online&rdquo; to actually <span className="text-red-600 italic font-medium">making an impact.</span>
                        </h2>
                    </div>

                    {/* Right Side: Description */}
                    <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-light lg:border-l border-white/10 lg:pl-10">
                        <p>
                            From crafting meaningful narratives to executing performance-driven campaigns, we bring together creative storytelling and data-backed strategies.
                        </p>
                        <p>
                            Whether it&apos;s social media management, targeted advertising, or lead generation, every step we take is aligned with one goal &mdash; <span className="text-white font-medium">real, measurable growth.</span>
                        </p>
                    </div>

                </div>
            </section>

            {/* How We Work Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between items-start mb-16">
                    {/* Left: Heading */}
                    <div className="md:w-1/2 space-y-6">
                        <div className="flex items-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                            <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                            How We Work
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase leading-tight text-white">
                            We don&apos;t believe in <span className="text-red-600 italic font-medium">one-size-fits-all</span> solutions.
                        </h2>
                    </div>

                    {/* Right: Paragraph */}
                    <div className="md:w-1/2 md:pt-12 text-neutral-400 text-lg leading-relaxed font-light">
                        <p>
                            Every brand has a different story, a different audience, and a different journey. That&apos;s why we take time to understand your business, your challenges, and your goals before building a strategy that actually works for you.
                        </p>
                    </div>
                </div>

                {/* Steps Grid: Line made bold (h-[2px]) and solid white (bg-white) */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12 lg:gap-10 lg:gap-y-6 lg:after:content-[''] lg:after:absolute lg:after:top-1/2 lg:after:left-[10%] lg:after:right-[10%] lg:after:h-[2px] lg:after:bg-white lg:after:-translate-y-1/2 lg:after:z-0">

                    {[
                        { title: "Understand", sub: "deeply", num: "01" },
                        { title: "Plan", sub: "strategically", num: "02" },
                        { title: "Execute", sub: "consistently", num: "03" },
                        { title: "Optimize", sub: "continuously", num: "04" },
                    ].map((step, index) => (
                        <div
                            key={index}
                            // Removed overflow-hidden so the chevron can display outside the card's boundary
                            className="relative z-10 p-6 md:p-5 lg:p-6 rounded-[24px] bg-neutral-900 border border-white/5 transition-all duration-500"
                        >
                            {/* Simplified Step Content */}
                            <div>
                                <div className="text-red-600 font-bold font-outfit text-xl mb-4">
                                    {step.num}.
                                </div>
                                <h3 className="text-xl font-bold text-white font-outfit mb-1 uppercase tracking-wide">
                                    {step.title}
                                </h3>
                                <p className="text-red-500 font-medium italic tracking-wide text-base">
                                    {step.sub}
                                </p>
                            </div>

                            {/* Bold White Chevron Arrow perfectly centered in the gap */}
                            {index < 3 && (
                                <div className="hidden lg:flex absolute top-1/2 -right-[32px] w-6 h-6 -translate-y-1/2 items-center justify-center bg-black text-white z-20 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" className="text-red-500"></polyline>
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}

                </div>
            </section>

            {/* What Sets Us Apart Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    {/* Tag */}
                    <div className="flex items-center justify-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                        <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                        What Sets Us Apart
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase leading-tight text-white">
                        We don&apos;t chase trends &mdash; we build <span className="text-red-600 italic font-medium">systems that last.</span>
                    </h2>

                    {/* Paragraph */}
                    <div className="text-neutral-400 text-lg leading-relaxed font-light md:px-10 space-y-6">
                        <p>
                            While many focus on short-term spikes, we focus on long-term brand value. Our work is rooted in authenticity, backed by insights, and driven by results that matter &mdash; not just vanity metrics.
                        </p>
                    </div>

                </div>
            </section>

            {/* Growth Mission Section */}
            <section className="bg-neutral-900/10 py-24 mb-32 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                            <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                            Our Vision
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold font-outfit max-w-5xl leading-tight">
                            To help brands grow with clarity and confidence in the digital space <span className="text-red-600 italic font-medium">— not by doing more, but by doing what truly works.</span>
                        </h2>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            {/* <TimelineSlider /> */}

            {/* Team Section */}
            <section className="max-w-7xl mx-auto px-6 mb-40">
                <div className="text-center mb-20 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                        <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                        Team
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase">
                        Meet the minds powering bold <span className="text-red-600 italic font-medium">D2C growth</span>
                    </h2>
                </div>

                {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col rounded-4xl overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-500 hover:border-red-600/30"
                        >
                            {/* 2. Top Section: Image Container. Stays exactly 4/5 aspect ratio. */}
                            <div className="relative w-full aspect-4/5 bg-neutral-800 overflow-hidden shrink-0 border-b border-white/5">
                                {/* Inner div for hover scale effect */}
                                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110">

                                    {/* Fallback Text */}
                                    <div className="absolute z-0 text-neutral-700 uppercase tracking-widest font-bold text-sm text-center px-4">
                                        {member.name}
                                    </div>

                                    {/* Image */}
                                    {member.image && (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="relative z-10 w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* 3. Bottom Section: Info Box. Sits below the image. 
                    Changes to solid black on hover to match your premium requirement. */}
                            <div className="relative flex-1 p-6 lg:p-7 bg-neutral-900 transition-colors duration-500 group-hover:bg-black">

                                {/* TOP ROW: Role, Name, and LinkedIn Icon */}
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        {/* Role Tag */}
                                        <span className="inline-block px-3 py-1 bg-white/10 text-neutral-300 text-[10px] md:text-xs font-semibold tracking-wider uppercase rounded-full mb-3 border border-white/5">
                                            {member.role}
                                        </span>

                                        {/* Name */}
                                        <h3 className="text-base font-bold font-outfit text-white mb-1 truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                                            {member.name}
                                        </h3>
                                    </div>

                                    {/* LinkedIn Icon */}
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors mt-1"
                                    >
                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </a>
                                </div>

                                {/* BOTTOM ROW: Expanding Description */}
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out justify-around">
                                    <div className="overflow-hidden">
                                        <p className="text-white text-md sm:text-md mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {member.description || "Passionate about scaling D2C brands through data-driven strategies and innovative customer experiences."}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing Statement Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32 md:mb-40">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit uppercase leading-tight text-white">
                        If you&apos;re looking to build not just presence, but <span className="text-red-600 italic font-medium">real impact</span> &mdash; you&apos;re in the right place.
                    </h2>
                </div>
            </section>

            {/* Contact Section */}
        </main>
    );
}
