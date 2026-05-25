'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Image from '../components/common/Image'; // Ensure this path is correct in your setup
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/common/SEO';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const mainRef = useRef(null);
  const showreelSectionRef = useRef(null);
  const videoBoxRef = useRef(null);
  const showreelTitleRef = useRef(null);
  const verveTextRef = useRef(null);
  const heroRef = useRef(null);

  // Custom Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedFraction, setPlayedFraction] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // NEW STATE: Tracks if video is allowed to be interacted with/played
  const [isExpandComplete, setIsExpandComplete] = useState(false);

  // Raw YouTube API Refs
  const playerDivRef = useRef(null);
  const ytPlayerRef = useRef(null);

  // 1. YouTube API Logic
  // 1. YouTube API Logic
  useEffect(() => {
    let player;
    let isUnmounted = false;

    const initPlayer = () => {
      if (!playerDivRef.current || isUnmounted) return;

      player = new window.YT.Player(playerDivRef.current, {
        videoId: 'bipYaBqAnsY',
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : ''
        },
        events: {
          onReady: (event) => {
            if (isUnmounted) return;
            ytPlayerRef.current = event.target;
            setIsReady(true);
            setTimeout(() => event.target.setVolume(80), 100);
          },
          onStateChange: (event) => {
            if (isUnmounted) return;
            setIsReady(true); // FAILSAFE 1: Unlock skeleton the second the video state changes
            const state = event.data;
            if (state === 1 || state === 3) {
              setIsPlaying(true);
            } else if (state === 2 || state === 0) {
              setIsPlaying(false);
            }
          }
        }
      });

      // FAILSAFE 2: If the YT API is totally frozen, destroy the black skeleton after 2 seconds anyway
      setTimeout(() => {
        if (!isUnmounted) setIsReady(true);
      }, 2000);
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else if (!document.getElementById('youtube-iframe-api')) {
      const script = document.createElement('script');
      script.id = 'youtube-iframe-api';
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);

      const previousOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousOnReady) previousOnReady();
        initPlayer();
      };
    } else {
      // THE ROUTER BUG FIX: The script exists, but window.YT isn't attached yet. 
      // We manually poll for it every 100ms instead of waiting for a dead event.
      const checkYT = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkYT);
          initPlayer();
        }
      }, 100);
      // Safety clear
      setTimeout(() => clearInterval(checkYT), 5000);
    }

    return () => {
      isUnmounted = true;
      if (ytPlayerRef.current && ytPlayerRef.current.destroy) {
        ytPlayerRef.current.destroy();
      }
    };
  }, []);

  // 2. Custom Progress Tracker
  useEffect(() => {
    let interval;
    if (isPlaying && !isSeeking && ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
      interval = setInterval(() => {
        const currentTime = ytPlayerRef.current.getCurrentTime();
        const duration = ytPlayerRef.current.getDuration();
        if (duration > 0) {
          setPlayedFraction(currentTime / duration);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isSeeking]);

  // 3. Control Handlers
  const handlePlayPause = () => {
    if (isTransitioning || !ytPlayerRef.current) return;

    setIsTransitioning(true);
    if (isPlaying) {
      ytPlayerRef.current.pauseVideo();
      setIsPlaying(false); // FORCE UI UPDATE: Instantly show play button / hide controls
    } else {
      ytPlayerRef.current.playVideo();
      setIsPlaying(true);  // FORCE UI UPDATE: Instantly hide play button / show controls
    }
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleSeekMouseDown = () => setIsSeeking(true);
  const handleSeekChange = (e) => setPlayedFraction(parseFloat(e.target.value));
  const handleSeekMouseUp = (e) => {
    setIsSeeking(false);
    if (ytPlayerRef.current && ytPlayerRef.current.getDuration) {
      const duration = ytPlayerRef.current.getDuration();
      const seekTime = parseFloat(e.target.value) * duration;
      ytPlayerRef.current.seekTo(seekTime, true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0) setIsMuted(false);
    if (ytPlayerRef.current && ytPlayerRef.current.setVolume) {
      ytPlayerRef.current.setVolume(newVol * 100);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (ytPlayerRef.current) {
      if (nextMuted) {
        ytPlayerRef.current.mute();
      } else {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(volume * 100);
      }
    }
  };

  // 4. GSAP Animations with MatchMedia
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      let wasFullyExpanded = false; // Local tracker to prevent firing API repeatedly

      // DESKTOP: Apply scroll animation
      mm.add("(min-width: 768px)", () => {
        setIsExpandComplete(false); // Reset on mount/resize

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: showreelSectionRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: true,
            anticipatePin: 0,
            onUpdate: (self) => {
              const isCurrentlyExpanded = self.progress === 1;

              if (isCurrentlyExpanded && !wasFullyExpanded) {
                wasFullyExpanded = true;
                // Autoplay completely removed. User must click to play.
              }
              else if (!isCurrentlyExpanded && wasFullyExpanded) {
                wasFullyExpanded = false;
                if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
                  ytPlayerRef.current.pauseVideo(); // Keeps the auto-pause if user scrolls away
                }
              }
            }
          }
        });

        tl.to(videoBoxRef.current, {
          width: "85vw",
          height: "85vh",
          top: "10vh",
          borderRadius: "0px",
          ease: "none",
          autoRound: false, // CRITICAL FIX: Stops width/height sub-pixel jittering
          force3D: true,
        }, 0);

        tl.to(showreelTitleRef.current, {
          y: -100,
          opacity: 0.5,
          ease: "none",
        }, 0);

        if (verveTextRef.current) {
          tl.to(verveTextRef.current, { scale: 1.5, opacity: 0, ease: "none" }, 0);
        }

        if (heroRef.current) {
          gsap.to(heroRef.current, {
            scrollTrigger: {
              trigger: showreelSectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
            opacity: 0,
            visibility: "hidden",
            ease: "none"
          });
        }
      });

      // MOBILE: No scroll animation, just allow interaction immediately
      // MOBILE: No scroll animation, just allow interaction immediately
      mm.add("(max-width: 767px)", () => {
        setIsExpandComplete(true); // Unlock controls

        // Hide hero quickly on mobile since section won't pin
        if (heroRef.current) {
          gsap.to(heroRef.current, {
            scrollTrigger: {
              trigger: showreelSectionRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: true,
            },
            opacity: 0,
            ease: "none"
          });
        }

        // NEW: Smoothly hide the "SHOWREEL" text as user scrolls down
        if (showreelTitleRef.current) {
          gsap.to(showreelTitleRef.current, {
            scrollTrigger: {
              trigger: showreelSectionRef.current,
              start: "top 60%", // Starts fading when section moves up
              end: "top 30%",   // Fully invisible by the time video takes focus
              scrub: true,
            },
            opacity: 0,
            y: -50,
            ease: "none"
          });
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative bg-black min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
      <SEO
            title="Creative Digital Marketing Agency in Mumbai & Thane | Nitty Gritty Labz"
        description="Nitty Gritty Labz is a creative digital marketing agency offering Videography, Photography, social media management, branding, content creation, performance marketing, website solutions, and studio production services for modern businesses."
        keywords="Digital Marketing Agency Mumbai, Social Media Management Thane, Performance Marketing Agency, SEO Services Mumbai, Creative Digital Marketing, Branding Agency Mumbai"
        canonical="https://nittygrittylabz.com"
      />
      {/* HERO SECTION */}
      <section ref={heroRef} className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden z-0 bg-black">

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://7aop7sgroelxkagz.public.blob.vercel-storage.com/Website%20Loader%20Video.mp4" type="video/mp4" />
        </video>

        {/* Black Radial Overlay (Clearer in the center, darker at the edges) */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.8)_100%)]"></div>

        {/* Existing Red Corner Gradient */}
        <div className="absolute bottom-0 right-0 w-[40vw] h-[60vh] pointer-events-none origin-bottom-right opacity-60 blur-[100px] z-0" style={{ background: 'linear-gradient(to top left, #a30800 0%, #ff1a1a 20%, transparent 60%)' }}></div>

        {/* Text Content */}
        <div className="relative z-10 text-center px-[clamp(1.5rem,4vw,3rem)] max-w-7xl mx-auto pt-10">
          <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
            Explore the true potential <br />
            <span className="text-white">of your brand</span>
          </h1>
          <p className="text-[clamp(0.875rem,2vw,1.125rem)] text-neutral-400 max-w-2xl mx-auto mb-[clamp(2rem,5vw,3rem)] font-medium leading-relaxed">
            We help brands grow through video-led marketing that turns attention into engagement, leads, and revenue.
          </p>
          <Link to="/contact" className="inline-block px-[clamp(2rem,5vw,2.5rem)] py-[clamp(0.75rem,2vw,1rem)] rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 group">
            <span className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-bold tracking-widest uppercase">Contact Us</span>
          </Link>
        </div>
      </section>

      {/* SCROLLABLE CONTENT WRAPPER */}
      <div className="relative z-10 mt-[100vh] bg-black shadow-[0_-50px_100px_rgba(0,0,0,1)]">

        {/* SHOWREEL ANIMATION SECTION */}
        <section ref={showreelSectionRef} className="md:h-screen w-full relative bg-black overflow-hidden group/section py-20 md:py-0">
          {/* Removed 'hidden md:block' and nudged the mobile top position slightly so it clears the video */}
          <h2 ref={showreelTitleRef} className="absolute top-[5%] md:top-[15%] left-1/2 -translate-x-1/2 text-[clamp(3.5rem,14vw,18rem)] font-bold text-white uppercase tracking-tighter leading-none whitespace-nowrap z-30 select-none pointer-events-none mix-blend-difference">
            Showreel
          </h2>

          <div
            ref={videoBoxRef}
            className="md:absolute md:top-[55%] inset-x-0 mx-auto w-[90vw] md:w-[60vw] lg:w-[50vw] h-[40vh] md:h-[35vh] lg:h-[45vh] z-30 bg-neutral-900 overflow-hidden rounded-[clamp(1rem,3vw,2rem)] flex items-center justify-center shadow-2xl relative group/player"
            style={{
              willChange: 'width, height, top, transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Raw YouTube Wrapper */}
            <div className="absolute inset-0 w-full h-full pointer-events-none bg-black">
              <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2">
                <div ref={playerDivRef} className="w-full h-full pointer-events-none" />
              </div>
            </div>

            {/* Subtle Overlay */}
            <div className={`absolute inset-0 bg-black/50 pointer-events-none transition-opacity duration-500 z-10 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}></div>

            {/* Click-Anywhere Hit Area */}
            <div
              className="absolute inset-0 z-15 cursor-pointer"
              onClick={handlePlayPause}
            ></div>

            {/* Big Play Button */}
            {/* Big Play Button */}
            <div className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-none'}`}>
              <button
                onClick={handlePlayPause}
                disabled={!isReady || isTransitioning}
                className={`relative z-30 w-[clamp(3rem,8vw,4rem)] h-[clamp(3rem,8vw,4rem)] rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-300 ${isReady && !isPlaying ? 'hover:bg-white/20 hover:scale-110 pointer-events-auto cursor-pointer' : 'pointer-events-none'}`}
              >
                <div className="w-0 h-0 border-t-[clamp(4px,1vw,8px)] border-t-transparent border-l-[clamp(8px,2vw,14px)] border-l-white border-b-[clamp(4px,1vw,8px)] border-b-transparent ml-1"></div>
              </button>
            </div>

            {/* Custom Bottom Media Controls */}
            {/* Custom Bottom Media Controls */}
            <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-[clamp(1rem,2vw,1.5rem)] flex items-center gap-[clamp(0.75rem,2vw,1.5rem)] z-40 transition-all duration-500 ${isPlaying ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <button onClick={handlePlayPause} disabled={isTransitioning} className="text-white hover:text-red-500 transition-colors cursor-pointer flex-shrink-0">
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={playedFraction}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                onTouchStart={handleSeekMouseDown}
                onTouchEnd={handleSeekMouseUp}
                className="flex-grow h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
              />

              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors hidden sm:block cursor-pointer">
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-red-600 hidden sm:block focus:outline-none focus:ring-2 focus:ring-red-600/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections */}

        <AboutUsSection />

        {/* Rotating Marquee Strip */}
        <MarqueeStrip />

        <ServicesSection />
        {/* <StatsBarSection /> */}
        <TrustedBySection />

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// TRUSTED BY SECTION
// ----------------------------------------------------------------------
const trustedPeople = [
  "/homeLogos/Bellezza Logo.png",
  "/homeLogos/Dr. batra Logo.png",
  "/homeLogos/Intellarc Communications Logo.png",
  "/homeLogos/Muthoot Exim Logo.png",
  "/homeLogos/Unboxing Real Estate Logo.png",
];

function TrustedBySection() {
  return (
    <section className="w-full bg-black py-[clamp(4rem,10vw,6rem)] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-[clamp(1.5rem,4vw,3rem)] mb-[clamp(3rem,8vw,4rem)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-[clamp(2rem,5vw,3rem)]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-[clamp(1rem,3vw,1.5rem)]">
              <svg className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-red-600 fill-current" viewBox="0 0 24 24">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <span className="text-neutral-400 uppercase tracking-widest text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium">Clients</span>
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1.1]">
              <span className="text-red-600 italic font-serif pr-3 relative inline-block">
                Trusted
                <svg className="absolute -bottom-[clamp(0.25rem,1vw,0.5rem)] left-0 w-full h-[clamp(0.25rem,1vw,0.5rem)] text-red-600/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
              by Clients <br /> from various industries
            </h2>
          </div>
          <div className="max-w-md text-neutral-400 text-[clamp(1rem,2vw,1.125rem)] leading-relaxed mb-2">
            Meet our clients who didn’t just partner with us they grew with us. From different industries to common ambitions, these voices show what trust can truly build.
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden pb-4">
        <div className="flex animate-trusted-marquee gap-[clamp(1.5rem,3vw,2rem)] pl-[clamp(1.5rem,4vw,3rem)]">
          {[...trustedPeople, ...trustedPeople].map((src, i) => (
            // Adjusted container to Landscape (Wider than Height) and added a subtle bg
            <div key={i} className="relative flex items-center justify-center p-[clamp(1rem,2vw,1.5rem)] w-[clamp(14rem,35vw,20rem)] h-[clamp(9rem,12vw,14rem)] flex-shrink-0 rounded-[clamp(1rem,3vw,1.5rem)] overflow-hidden border border-white/10 bg-white/[0.02] grayscale-0 md:grayscale hover:grayscale-0 transition-all duration-500 group cursor-pointer">
              <Image
                src={src}
                alt="Client Logo"
                className="relative w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes trusted-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-trusted-marquee {
            animation: trusted-marquee 40s linear infinite;
        }
        .animate-trusted-marquee:hover {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// ----------------------------------------------------------------------
// ABOUT US SECTION (Static Version)
// ----------------------------------------------------------------------
function AboutUsSection() {
  const sectionRef = useRef(null);
  const numRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numRefs.current.forEach((el) => {
        if (!el) return;
        const targetVal = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: targetVal,
            duration: 2.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%", // Triggers when the section is well within the screen
              once: true, // Animates only once per page load
            },
            snap: { innerText: 1 }, // Ensures smooth integer counting
            onUpdate: function () {
              el.innerText = Math.round(this.targets()[0].innerText) + suffix;
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-[clamp(1.5rem,4vw,3rem)] py-[clamp(4rem,10vw,6rem)] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-[clamp(3rem,8vw,4rem)]">
        <div className="md:w-5/12 max-w-2xl flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-[clamp(1.5rem,4vw,2rem)]">
            <svg className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-red-600 fill-current" viewBox="0 0 24 24">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <span className="text-neutral-400 uppercase tracking-widest text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium">About Us</span>
          </div>

          <div className="mb-[clamp(2rem,5vw,3rem)]">
            {/* <h4 className="text-[clamp(1.75rem,4vw,2.5rem)] mb-[clamp(1.5rem,4vw,2rem)] leading-tight font-bold">
              Get Nitty Gritty: Where Vision Meets Results.
            </h4> */}
            <p className="text-[clamp(1.75rem,4vw,2.5rem)] mb-[clamp(1.5rem,4vw,2rem)] leading-tight font-bold">
              Get Nitty Gritty: Where Vision Meets Results.
            </p>
            <div className="space-y-[clamp(1rem,3vw,1.5rem)]">
              <p className="text-[clamp(1rem,2vw,1.25rem)] text-neutral-400 leading-relaxed font-light">
                We combine creative storytelling with strategic production and digital expertise to help brands build visibility, generate leads, and sustain growth.
              </p>
              <p className="text-[clamp(1rem,2vw,1.25rem)] text-neutral-400 leading-relaxed font-light">
                We strengthen your digital presence via strategic social media, targeted campaigns, lead generation, and audience engagement—turning interest into loyalty and sustained growth.
              </p>
            </div>
          </div>

          <div>
            <Link to="/about" className="inline-block px-[clamp(2rem,5vw,2.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-full border border-white/20 text-[clamp(0.7rem,1vw,0.75rem)] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300">
              Know More
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 grid grid-cols-2 gap-x-[clamp(1rem,4vw,2rem)] gap-y-[clamp(2rem,6vw,4rem)] content-center">
          <div>
            <span
              ref={(el) => (numRefs.current[0] = el)}
              data-target="500"
              data-suffix="+"
              className="block text-[clamp(3rem,6vw,4.5rem)] font-bold text-white mb-[clamp(0.25rem,1vw,0.75rem)]"
            >
              0+
            </span>
            <span className="text-[clamp(0.65rem,1vw,0.75rem)] text-neutral-500 uppercase tracking-[0.2em] font-medium">Shoots</span>
          </div>
          <div>
            <span
              ref={(el) => (numRefs.current[1] = el)}
              data-target="50"
              data-suffix="+"
              className="block text-[clamp(3rem,6vw,4.5rem)] font-bold text-white mb-[clamp(0.25rem,1vw,0.75rem)]"
            >
              0+
            </span>
            <span className="text-[clamp(0.65rem,1vw,0.75rem)] text-neutral-500 uppercase tracking-[0.2em] font-medium">Brands</span>
          </div>
          <div>
            <span
              ref={(el) => (numRefs.current[2] = el)}
              data-target="80"
              data-suffix="+"
              className="block text-[clamp(3rem,6vw,4.5rem)] font-bold text-white mb-[clamp(0.25rem,1vw,0.75rem)]"
            >
              0+
            </span>
            <span className="text-[clamp(0.65rem,1vw,0.75rem)] text-neutral-500 uppercase tracking-[0.2em] font-medium">Websites</span>
          </div>
          <div>
            <span
              ref={(el) => (numRefs.current[3] = el)}
              data-target="10"
              data-suffix="L+"
              className="block text-[clamp(3rem,6vw,4.5rem)] font-bold text-white mb-[clamp(0.25rem,1vw,0.75rem)]"
            >
              0L+
            </span>
            <span className="text-[clamp(0.65rem,1vw,0.75rem)] text-neutral-500 uppercase tracking-[0.2em] font-medium">Marketing Spends</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// STATS BAR SECTION
// ----------------------------------------------------------------------
function StatsBarSection() {
  const stats = [
    { icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />, value: '300+', label: 'Films Produced' },
    { icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />, value: '250+', label: 'Brands Served' },
    { icon: <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z" />, value: '100+', label: 'Websites Built' },
    { icon: <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />, value: '10+', label: 'Awards Won' },
  ];
  return (
    <section className="w-full bg-black border-t border-white/10 py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(2rem,4vw,0rem)] md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-[clamp(0.5rem,2vw,1rem)] px-[clamp(1rem,2vw,2rem)]">
              <svg className="w-[clamp(2rem,4vw,2.5rem)] h-[clamp(2rem,4vw,2.5rem)] text-white opacity-70" viewBox="0 0 24 24" fill="currentColor">
                {s.icon}
              </svg>
              <div className="text-center">
                <p className="text-[clamp(2rem,5vw,3rem)] font-black font-outfit text-white">{s.value.replace('+', '')}<span className="text-red-600">+</span></p>
                <p className="text-[clamp(0.65rem,1vw,0.75rem)] uppercase tracking-widest text-neutral-400 mt-[clamp(0.25rem,1vw,0.5rem)] font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MarqueeStrip = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let pos = 0;
    let running = true;
    let raf;

    const frame = () => {
      if (!running) return;
      pos += 0.7;
      const half = el.scrollWidth / 2;
      if (pos >= half) pos -= half;
      el.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { running = false; cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-r from-black via-neutral-900/80 to-black border-y border-red-600/20 py-6 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:via-transparent before:to-black before:z-10 before:pointer-events-none">
      <div ref={ref} className="flex whitespace-nowrap" style={{ willChange: 'transform' }}>
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i} className="text-[clamp(1.125rem,3vw,1.75rem)] font-black tracking-[0.15em] uppercase bg-gradient-to-r from-white via-red-400 to-white bg-clip-text text-transparent mx-6 flex items-center gap-6 shrink-0">
            We build brands that people remember and businesses that grow
            <span className="text-red-600/60 text-[clamp(0.75rem,2vw,1rem)]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// OUR SERVICES SECTION
// ----------------------------------------------------------------------
const services = [
  {
    id: "01",
    title: "PHOTOGRAPHY",
    slug: "photography",
    tagline: "Capturing moments that tell a story.",
    description: "Professional photography for brands, events, and products. High-quality visuals that resonate with your audience.",
    buttonText: "Learn More",
    icon: (
      <svg className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    )
  },
  {
    id: "02",
    title: "WEB & APP DEVELOPMENT",
    slug: "web-app-development",
    tagline: "Building digital ecosystems for growth.",
    description: "Responsive websites and intuitive mobile applications. We code for performance, scalability, and seamless user experiences.",
    buttonText: "Learn More",
    icon: (
      <svg className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] text-neutral-400 group-hover:text-red-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
        <polyline points="16 18 22 12 16 6" className="opacity-0 group-hover:opacity-100 transition-opacity" />
        <polyline points="8 6 2 12 8 18" className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </svg>
    )
  },
  {
    id: "03",
    title: "DIGITAL MARKETING",
    slug: "digital-marketing",
    tagline: "Connecting your brand to the right audience.",
    description: "Data-driven strategies across SEO, social media, and performance marketing to scale your presence and generate leads.",
    buttonText: "Learn More",
    icon: (
      <svg className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] text-neutral-400 group-hover:text-red-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </svg>
    )
  },
  {
    id: "04",
    title: "VIDEO PRODUCTION",
    slug: "video-production",
    tagline: "Dynamic visual storytelling designed to engage.",
    description: "From conceptualization to post-production, we create impactful videos including DVCs, corporate films, and drone cinematography.",
    buttonText: "Learn More",
    icon: (
      <svg className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] text-neutral-400 group-hover:text-red-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    )
  },
  {
    id: "05",
    title: "GRAPHIC DESIGNING",
    slug: "graphic-design",
    tagline: "Identity in every pixel.",
    description: "Creative visual communication: logos, brand identities, and marketing assets that define your brand's unique voice.",
    buttonText: "Learn More",
    icon: (
      <svg className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] text-neutral-400 group-hover:text-red-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l4 14.5L13 18l5-5z" />
        <path d="M2 2l1.5 1.5" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
];

function ServicesSection() {
  const [activeService, setActiveService] = useState("01");

  return (
    <section className="w-full bg-black py-[clamp(4rem,10vw,6rem)] px-[clamp(1.5rem,4vw,3rem)] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-[clamp(2rem,5vw,3rem)]">
          <svg className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-red-600 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <span className="text-neutral-400 uppercase tracking-widest text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium">Our Services</span>
        </div>

        <div className="border-t border-white/10">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative border-b border-white/10 cursor-pointer transition-all duration-500 hover:bg-white/[0.02] ${activeService === service.id ? 'bg-white/[0.03]' : ''}`}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
            >
              {activeService === service.id && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-full h-[150%] bg-red-600/10 blur-[120px] rounded-full"></div>
                </div>
              )}

              <div className="relative z-10 py-[clamp(1.5rem,4vw,2.5rem)] flex flex-col">
                <div className="flex items-center justify-between gap-[clamp(0.75rem,3vw,2rem)]">
                  {/* CRITICAL FIX: Added min-w-0 so Flexbox allows the text to wrap, preventing icon push-out */}
                  {/* Changed to items-start on mobile so the number aligns cleanly when the title wraps */}
                  <div className="flex items-start md:items-baseline gap-[clamp(0.75rem,3vw,3rem)] min-w-0">
                    <span className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-neutral-600 font-mono tracking-widest flex-shrink-0 mt-[0.35rem] md:mt-0">
                      {service.id}
                    </span>
                    {/* CRITICAL FIX: Dropped the minimum clamp size significantly for mobile, enforced leading, and ensured breaking words */}
                    <h3 className="text-[clamp(1.2rem,5vw,3.75rem)] font-bold tracking-tight text-white/90 leading-[1.1] break-words">
                      {service.title}
                    </h3>
                  </div>

                  {/* flex-shrink-0 ensures the icon button never gets crushed by the text */}
                  <div className={`p-[clamp(0.5rem,1vw,0.75rem)] rounded-lg border transition-all duration-300 flex-shrink-0 ${activeService === service.id ? 'border-red-600/50 bg-red-600/10' : 'border-white/5 bg-white/5'}`}>
                    {service.icon}
                  </div>
                </div>

                <div className={`grid transition-all duration-500 ease-in-out ${activeService === service.id ? 'grid-rows-[1fr] opacity-100 mt-[clamp(1.5rem,4vw,2.5rem)]' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-[clamp(1.5rem,4vw,6rem)] pl-0 md:pl-[clamp(2rem,6vw,6rem)]">
                      <div className="max-w-xl">
                        <p className="text-[clamp(1rem,2vw,1.125rem)] text-white mb-[clamp(0.5rem,2vw,1rem)] italic font-light">{service.tagline}</p>
                        <p className="text-neutral-500 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed mb-[clamp(1.5rem,4vw,2rem)]">
                          {service.description}
                        </p>
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-3 px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-full border border-red-600/30 bg-red-600/5 text-[clamp(0.7rem,1vw,0.75rem)] uppercase tracking-widest text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 group/btn"
                        >
                          {service.buttonText}
                          <svg className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}