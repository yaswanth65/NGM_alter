"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const words = ["Creative", "Photography", "Shoot", "Media", "Video"];

export default function Preloader() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const videoRef = useRef(null); // 1. Added ref for the video

    const [index, setIndex] = useState(0);
    const [isVideoReady, setIsVideoReady] = useState(false); // 2. State to track video loading

    // 3. Edge Case: Check if video is already cached and ready instantly
    useEffect(() => {
        if (videoRef.current && videoRef.current.readyState >= 3) {
            setIsVideoReady(true);
        }
    }, []);

    useLayoutEffect(() => {
        // Check if preloader has already run in this session
        const hasRun = sessionStorage.getItem("preloader-run");
        if (hasRun) {
            if (containerRef.current) containerRef.current.style.display = "none";
            return;
        }

        // 4. Halt the animation until the video is ready
        if (!isVideoReady) return;

        // Lock scroll immediately
        document.body.style.overflow = "hidden";

        // 5. Programmatically play the video exactly when GSAP starts
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Video autoplay blocked:", e));
        }

        const tl = gsap.timeline();

        // Math for perfect sync: ~5 seconds total / 5 words = 0.9s per word cycle
        const transitionDuration = 0.1;
        const holdDuration = 0.9 - (transitionDuration * 2);

        // Initial word appearance
        tl.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }
        );

        // Sequence for words
        words.forEach((word, idx) => {
            if (idx === 0) return;

            tl.to(textRef.current, {
                opacity: 0,
                y: -15,
                duration: transitionDuration,
                delay: idx === 1 ? holdDuration - 0.2 : holdDuration,
                onComplete: () => setIndex(idx),
            }).fromTo(
                textRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: transitionDuration }
            );
        });

        // Final exit animation
        tl.to(textRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.15,
            delay: holdDuration,
            ease: "power2.inOut",
        }).to(containerRef.current, {
            yPercent: -100,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
                if (containerRef.current) containerRef.current.style.display = "none";
                document.body.style.overflow = "auto";
                sessionStorage.setItem("preloader-run", "true");

                gsap.registerPlugin(ScrollTrigger);
                ScrollTrigger.refresh();
            },
        }, "-=0.1");

        return () => {
            tl.kill();
            document.body.style.overflow = "auto";
        };
    }, [isVideoReady]); // 6. Added isVideoReady to the dependency array

    return (
        <div
            id="preloader-overlay"
            ref={containerRef}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden"
            style={{ touchAction: 'none' }}
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                // autoPlay removed -> controlled by JS now
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
                // src="https://7aop7sgroelxkagz.public.blob.vercel-storage.com/Website%20Loader%20Video.mp4"
                src="https://7aop7sgroelxkagz.public.blob.vercel-storage.com/Banner%20Video.mp4"
                onCanPlayThrough={() => setIsVideoReady(true)} // 7. Triggers the GSAP animation when buffered
                onError={() => setIsVideoReady(true)} // 8. Fallback: play animation anyway if video totally fails to load
            />

            {/* Radial Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_10%,rgba(0,0,0,0.9)_100%)]"></div>

            {/* Foreground Text */}
            <div
                ref={textRef}
                // Added opacity-0 by default so the first word hides until GSAP fades it in
                className="relative z-10 text-4xl md:text-6xl font-bold font-sans text-white tracking-tighter opacity-0"
            >
                {words[index]}
            </div>
        </div>
    );
}