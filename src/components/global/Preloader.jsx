"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const words = ["Create", "Capture", "Grow"];

export default function Preloader() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const textRef = useRef(null);

    const [index, setIndex] = useState(0);
    const [showPreloader, setShowPreloader] = useState(false);

    // Check sessionStorage on mount to determine if we should show the preloader
    useEffect(() => {
        try {
            const hasRun = sessionStorage.getItem("preloader-run");
            if (!hasRun) {
                setShowPreloader(true);
            }
        } catch (e) {
            // Fail-safe: if sessionStorage is disabled or throws an error (e.g. Safari Private Mode), show preloader
            setShowPreloader(true);
        }
    }, []);

    useEffect(() => {
        if (!showPreloader) return;

        // Lock body scrolling while preloader is active
        document.body.style.overflow = "hidden";

        // Try to play video immediately
        if (videoRef.current) {
            videoRef.current.play().catch(e => {
                console.log("Video autoplay blocked or delayed:", e);
            });
        }

        const tl = gsap.timeline({
            onComplete: () => {
                handleComplete();
            }
        });

        const transitionDuration = 0.15;
        const holdDuration = 0.65;

        // Initial text animation
        tl.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
        );

        // Sequence through words
        words.forEach((word, idx) => {
            if (idx === 0) return;

            tl.to(textRef.current, {
                opacity: 0,
                y: -15,
                duration: transitionDuration,
                delay: holdDuration,
                onComplete: () => setIndex(idx),
            }).fromTo(
                textRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: transitionDuration }
            );
        });

        // Exit animations
        tl.to(textRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            delay: holdDuration,
            ease: "power2.inOut",
        }).to(containerRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: "power3.inOut",
        }, "-=0.1");

        // Failsafe timer to force dismiss preloader after 4.5s
        const failsafeTimer = setTimeout(() => {
            console.warn("Preloader failsafe triggered");
            handleComplete();
        }, 4500);

        function handleComplete() {
            clearTimeout(failsafeTimer);
            if (containerRef.current) {
                containerRef.current.style.display = "none";
            }
            document.body.style.overflow = "auto";

            try {
                sessionStorage.setItem("preloader-run", "true");
            } catch (e) {
                console.warn("Could not set sessionStorage:", e);
            }

            // Register ScrollTrigger and refresh to ensure page animations align properly
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.refresh();
        }

        return () => {
            clearTimeout(failsafeTimer);
            tl.kill();
            document.body.style.overflow = "auto";
        };
    }, [showPreloader]);

    if (!showPreloader) return null;

    return (
        <div
            id="preloader-overlay"
            ref={containerRef}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden"
            style={{ touchAction: 'none' }}
        >
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
                src="/assets/banner.mp4"
            />

            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_10%,rgba(0,0,0,0.9)_100%)]"></div>

            <div
                ref={textRef}
                className="relative z-10 text-4xl md:text-6xl font-bold font-sans text-white tracking-tighter opacity-0"
            >
                {words[index]}
            </div>
        </div>
    );
}