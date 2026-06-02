"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const words = ["Create", "Capture", "Grow"];

export default function Preloader() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const textRef = useRef(null);

    const [index, setIndex] = useState(0);
    const [isVideoReady, setIsVideoReady] = useState(false);

    useEffect(() => {
        if (videoRef.current && videoRef.current.readyState >= 3) {
            setIsVideoReady(true);
        }
    }, []);

    useLayoutEffect(() => {
        const hasRun = sessionStorage.getItem("preloader-run");
        if (hasRun) {
            if (containerRef.current) containerRef.current.style.display = "none";
            return;
        }

        if (!isVideoReady) return;

        document.body.style.overflow = "hidden";

        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Video autoplay blocked:", e));
        }

        const tl = gsap.timeline();
        const transitionDuration = 0.1;
        const holdDuration = 1 - (transitionDuration * 2);

        tl.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }
        );

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
    }, [isVideoReady]);

    return (
        <div
            id="preloader-overlay"
            ref={containerRef}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden"
            style={{ touchAction: 'none' }}
        >
            <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
                src="/assets/Banner%20Video(H1)%20(1).mp4"
                onCanPlayThrough={() => setIsVideoReady(true)}
                onError={() => setIsVideoReady(true)}
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