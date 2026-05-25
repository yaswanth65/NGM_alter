"use client";

import { Link, useParams, Navigate } from "react-router-dom";
import { servicesData } from "../data/serviceData"; // Adjust path as needed
import ContactSection from "@/components/global/ContactSection"; // Assuming you want this at the bottom
import SEO from "../components/common/SEO";

const ServiceDetails = () => {
    const { id } = useParams();
    
    // Find the specific service data based on the URL parameter
    const service = servicesData.find((s) => s.id === id);

    // If the ID doesn't match any service, redirect to the main services page
    if (!service) {
        return <Navigate to="/services" replace />;
    }

    return (
        <main className="bg-black min-h-screen text-white pt-32">
            <SEO
                title={service.seo?.title || service.title}
                description={service.seo?.description || service.intro.tagline}
                keywords={service.seo?.keywords || `${service.title.toLowerCase()}, Nitty Gritty, ${service.title.toLowerCase()} services Mumbai`}
                canonical={`https://nittygrittylabz.com/services/${id}`}
            />
            
            {/* 1. Hero / Breadcrumb Section */}
            <div className="max-w-7xl mx-auto px-6 mb-24 text-center pt-15">
                <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
                    {service.title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm tracking-widest uppercase font-medium">
                    <Link to="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link to="/services" className="hover:text-white transition-colors">
                        Services
                    </Link>
                    <span>/</span>
                    <span className="text-white">{service.title}</span>
                </div>
            </div>

            {/* 2. Intro Section (Taglines & Philosophy) */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="gap-16 items-start">
                    <div>
                        {/* Split the tagline to highlight the second part in red, if desired, or just render it */}
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit uppercase mb-8 tracking-wide text-white leading-tight">
                            {service.intro.tagline.split('.')[0]}. <span className="text-red-600">{service.intro.tagline.split('.').slice(1).join('.')}</span>
                        </h2>
                        <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-semibold max-w-5xl justify-evenly">
                            {service.intro.paragraphs.map((para, index) => (
                                <p key={index}>{para}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. What We Create / Do Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Left Side: Heading */}
                    <div className="space-y-6 lg:sticky lg:top-32">
                        <div className="flex items-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                            <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                            {service.whatWeCreate.sectionTitle}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase leading-tight text-white">
                            {service.whatWeCreate.subtitle.split('and')[0]} <span className="text-red-600 italic font-medium">and {service.whatWeCreate.subtitle.split('and')[1]}</span>
                        </h2>
                    </div>

                    {/* Right Side: List & Conclusion */}
                    <div className="space-y-8 lg:border-l border-white/10 lg:pl-10">
                        <ul className="space-y-4">
                            {service.whatWeCreate.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-4 text-xl font-light text-neutral-300">
                                    <span className="text-red-600 mt-1.5 text-xs">■</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-8 border-t border-white/10">
                            <p className="text-white font-medium text-lg italic">
                                "{service.whatWeCreate.conclusion}"
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. Our Approach Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="max-w-4xl mx-auto space-y-12">
                    
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                            <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                            {service.approach.sectionTitle}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase leading-tight text-white">
                            {service.approach.tagline}
                        </h2>
                    </div>

                    {/* Approach Blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 bg-neutral-900/30 p-8 md:p-12 rounded-3xl border border-white/5">
                        {service.approach.blocks.map((block, index) => (
                            <div key={index} className="space-y-6">
                                {block.heading && (
                                    <h3 className="text-2xl font-outfit font-bold text-white uppercase tracking-wide">
                                        {block.heading}
                                    </h3>
                                )}
                                <ul className="space-y-4">
                                    {block.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-neutral-400 text-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="text-center pt-8">
                        <p className="text-xl md:text-2xl font-outfit font-bold uppercase text-red-500">
                            {service.approach.conclusion}
                        </p>
                    </div>

                </div>
            </section>

            {/* 5. Why Nitty Gritty Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="flex items-center justify-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold">
                        <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                        {service.whyUs.sectionTitle}
                    </div>

                    <div className="text-neutral-400 text-xl leading-relaxed font-light md:px-10 space-y-6">
                        {service.whyUs.paragraphs.map((para, index) => (
                            <p key={index} className={index === 0 ? "text-3xl font-bold font-outfit uppercase text-white mb-8" : ""}>
                                {para}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Closing Line (CTA) */}
            <section className="bg-neutral-900/10 py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit max-w-5xl leading-tight uppercase">
                            {service.cta.split(',')[0]}, <br className="hidden md:block"/>
                            <span className="text-red-600 italic font-medium">{service.cta.split(',')[1]}</span>
                        </h2>
                    </div>
                </div>
            </section>

            {/* Optional: Include your standard contact footer here */}
            {/* <ContactSection /> */}
        </main>
    );
}

export default ServiceDetails;