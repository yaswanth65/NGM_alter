"use client";

import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { projects } from "@/data/projects";
import { photography } from '../data/photography';

const mainCategories = ["Videos", "Websites", "Social Media", "SEO", "Photography"];
const subCategories = [
    "All",
    "Brand Documentaries",
    "Corporate Films",
    "Podcast",
    "Advertisement",
    "Promos",
    "Business Explainer",
    "Testimonial",
];

export default function PortfolioPage() {
    const [activeMainCategory, setActiveMainCategory] = useState("Videos");
    const [activeSubCategory, setActiveSubCategory] = useState("All");


    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const mainMatch = project.category === activeMainCategory;
            const subMatch =
                activeSubCategory === "All" || project.subCategory === activeSubCategory;
            return mainMatch && subMatch;
        });
    }, [activeMainCategory, activeSubCategory]);

    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openLightbox = (index) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);

    const showNext = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % photography.length);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + photography.length) % photography.length);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6 pt-15">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 text-center">
                    <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
                        PORTFOLIO
                    </h1>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm tracking-wide">
                        <Link to="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-white">Portfolio</span>
                    </div>
                </div>

                {/* Main Categories */}
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {mainCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveMainCategory(category)}
                            className={`px-8 py-2 rounded-full border transition-all duration-300 ${activeMainCategory === category
                                ? "border-red-500 bg-red-500/10 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                                : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Sub Categories */}
                <div className="flex justify-center flex-wrap gap-3 mb-16">
                    {subCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveSubCategory(category)}
                            className={`px-6 py-2 rounded-full border text-sm transition-all duration-300 ${activeSubCategory === category
                                ? "border-white bg-white text-black"
                                : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <Link to={`/portfolio/${project.id}`} key={project.id}>
                            <div className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-video cursor-pointer">
                                {/* Image Placeholder */}
                                {project.videoUrl && (
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={`https://img.youtube.com/vi/${project.videoUrl.split('/').pop()}/hqdefault.jpg`}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                                    </div>
                                )}

                                {/* Overlay Content */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-between">
                                    <div className="self-end">
                                        {/* Optional: Add an icon or logo here if needed */}
                                    </div>

                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium mb-3 border border-white/10">
                                            {project.subCategory}
                                        </div>
                                        <h3 className="text-lg font-bold font-outfit leading-tight group-hover:text-red-400 transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Top Left Badge (Optional based on design) */}
                                <div className="absolute top-4 left-4">
                                    <div className="px-3 py-1 bg-neutral-900/80 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider font-bold border border-white/10">
                                        Brand Documentary
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {activeMainCategory === "Photography" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                        {photography.map((item, index) => (
                            <div
                                key={item.id}
                                className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square bg-neutral-900"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={item.image}
                                    alt={`Gallery ${item.id}`}
                                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
                                />
                                {/* Minimalist Premium Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="text-sm tracking-[0.5em] uppercase font-semibold text-white border-b-2 border-white/30 pb-1">
                                        View Frame
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedImageIndex !== null && (
                    <div
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 transition-opacity duration-500 pt-20"
                        onClick={closeLightbox}
                    >
                        {/* Refined Rotating Close Button */}
                        {/* THE REFACTORED PREMIUM CLOSE BUTTON */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeLightbox();
                            }}
                            className="absolute top-20 right-10 z-101 p-4 group cursor-pointer"
                            aria-label="Close"
                        >
                            <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90">
                                {/* h-[3px] gives that bold, premium look you're after */}
                                <span className="absolute w-full h-[3px] bg-white rounded-full rotate-45 transition-all duration-300 group-hover:bg-red-500"></span>
                                <span className="absolute w-full h-[3px] bg-white rounded-full -rotate-45 transition-all duration-300 group-hover:bg-red-500"></span>
                            </div>
                        </button>

                        {/* Navigation: Left */}
                        <button
                            onClick={showPrev}
                            className="absolute left-8 text-white/30 hover:text-white text-7xl z-[10000] transition-all duration-300 hover:scale-110 active:scale-95 p-4"
                        >
                            &#8249;
                        </button>

                        {/* Main Image Container */}
                        <div
                            className="relative max-w-5xl max-h-[85vh] flex items-center justify-center select-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={photography[selectedImageIndex].image}
                                className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm animate-in fade-in zoom-in duration-500 ease-out"
                                alt="Enlarged gallery view"
                            />

                            {/* Index Counter */}
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/40 tracking-widest text-sm uppercase mt-[-10]">
                                {selectedImageIndex + 1} <span className="mx-2">/</span> {photography.length}
                            </div>
                        </div>

                        {/* Navigation: Right */}
                        <button
                            onClick={showNext}
                            className="absolute right-8 text-white/30 hover:text-white text-7xl z-[10000] transition-all duration-300 hover:scale-110 active:scale-95 p-4"
                        >
                            &#8250;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
