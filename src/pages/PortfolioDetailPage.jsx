"use client";

import { useParams, Link } from "react-router-dom";
import { useRef } from "react";
import { projects } from "@/data/projects";
import ContactSection from "@/components/global/ContactSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../components/common/SEO";

export default function PortfolioDetailPage() {
    const { id } = useParams();
    const project = projects.find((p) => p.id === parseInt(id));
    const carouselRef = useRef(null);

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <Link to="/portfolio" className="text-red-500 hover:underline">Back to Portfolio</Link>
            </div>
        );
    }

    const otherProjects = projects
        .filter((p) => p.id !== project.id)
        .slice(0, 3);

    return (
        <main className="bg-black min-h-screen text-white pt-32">
            <SEO
                title={project.title}
                description={project.description}
                keywords={`${project.title}, ${project.category}, ${project.service}, Nitty Gritty portfolio`}
                canonical={`https://nittygrittylabz.com/portfolio/${id}`}
            />
            {/* Hero Section - Centered Title and Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h1 className="text-5xl md:text-8xl font-bold font-outfit uppercase tracking-tight mb-6">
                    {project.title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm tracking-widest font-medium uppercase">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/portfolio" className="hover:text-white transition-colors">{project.category}</Link>
                    <span>/</span>
                    <span className="text-neutral-500">{project.client}</span>
                    <span>/</span>
                    <span className="text-white">{project.service}</span>
                </div>
            </div>

            {/* Video Hero Section */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
                    <iframe
                        className="w-full h-full"
                        src={project.videoUrl}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Description Area */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <p className="text-neutral-300 text-xl md:text-2xl leading-relaxed font-light max-w-5xl">
                    {project.description}
                </p>
            </div>

            {/* Project Details Grid with Red Borders */}
            <div className="max-w-7xl mx-auto px-6 mb-32 pt-12 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="border-l-4 border-red-600 pl-6 py-2">
                        <div className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-2">Client Name</div>
                        <div className="text-neutral-400 uppercase tracking-wide font-medium">{project.client}</div>
                    </div>
                    <div className="border-l-4 border-red-600 pl-6 py-2">
                        <div className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-2">Project Year</div>
                        <div className="text-neutral-400 uppercase tracking-wide font-medium">{project.year}</div>
                    </div>
                    <div className="border-l-4 border-red-600 pl-6 py-2">
                        <div className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-2">Service Provided</div>
                        <div className="text-neutral-400 uppercase tracking-wide font-medium">{project.service}</div>
                    </div>
                    <div className="border-l-4 border-red-600 pl-6 py-2">
                        <div className="text-xs uppercase tracking-[0.2em] text-white font-bold mb-2">Category</div>
                        <div className="text-neutral-400 uppercase tracking-wide font-medium">{project.category}</div>
                    </div>
                </div>
            </div>

            {/* Related Work Section */}
            <section className="max-w-7xl mx-auto px-6 mb-40">
                <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase tracking-tight">
                        Related Work
                    </h2>
                    <div className="flex gap-4">
                        <button onClick={() => carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} className="p-3 rounded-full border border-white/10 text-white hover:bg-neutral-800 transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} className="p-3 rounded-full border border-white/10 text-white hover:bg-neutral-800 transition-all">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div ref={carouselRef} className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar">
                    {otherProjects.map((proj) => (
                        <Link to={`/portfolio/${proj.id}`} key={proj.id} className="group block min-w-[300px] md:min-w-[350px] snap-start">
                            <div className="aspect-[16/10] bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                                {proj.videoUrl && (
                                    <>
                                        <img
                                            src={`https://img.youtube.com/vi/${proj.videoUrl.split('/').pop()}/hqdefault.jpg`}
                                            alt={proj.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                                    </>
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="text-xs text-red-600 uppercase font-bold tracking-[0.2em]">{proj.subCategory}</div>
                                <h4 className="text-xl font-bold font-outfit group-hover:text-red-500 transition-colors uppercase tracking-tight">
                                    {proj.title}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <ContactSection />
        </main>
    );
}
