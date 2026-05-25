import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronDown, Play, Search, Target, Rocket, BarChart3, Settings2, FileText, Globe } from 'lucide-react';

const serviceData = {
    "digital-marketing": {
        title: "DIGITAL MARKETING",
        stats: [
            { label: "CAMPAIGNS", value: "500+" },
            { label: "LEADS", value: "1M+" },
            { label: "ROI", value: "5x" },
            { label: "CLIENTS", value: "150+" }
        ],
        caseStudies: [
            { label: "SMM Case Study", slug: "smm-case-study" },
            { label: "SEO Case Study", slug: "seo-case-study" }
        ],
        testimonials: [
            { id: 1, name: "Nitty Gritty Testimonial", videoThumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800" },
            { id: 2, name: "True North Nitty Gritty Testimonial", videoThumbnail: "https://images.unsplash.com/photo-1522071823991-00156c36b0ce?auto=format&fit=crop&q=80&w=800" }
        ],
        brands: [
            "Brand Equity", "Social Samosa", "e4m", "afaqs!", "MediaBrief", "Financial Express",
            "Medianews4u", "Storyboard", "Roastbrief", "Digital Agency Network", "TVW News India", "Campaign",
            "Best Media Info", "Adgully", "Social Media Dissect", "Marketech APAC", "Agency Masala", "MAM"
        ],
        process: [
            { icon: Search, title: "Audit & Align", desc: "We dig deep into your data, brand, and competitors." },
            { icon: Target, title: "Strategy Sprint", desc: "Channel mapping + KPI-driven goals." },
            { icon: Rocket, title: "Launch", desc: "Smart execution with agile testing." },
            { icon: Settings2, title: "Optimize", desc: "Performance checks, weekly tweaks, and scaling wins." },
            { icon: FileText, title: "Report", desc: "Transparent reporting that speaks business, not just clicks." }
        ],
        faqs: [
            { q: "Is it necessary to hire a digital marketing agency in Mumbai?", a: "Yes, a local agency understands the market nuances and can provide tailored strategies that resonate with the local audience while maintaining global standards." },
            { q: "How are digital marketing services useful for already established businesses?", a: "Established businesses need to maintain their edge, reach new demographics, and adapt to changing algorithms. Digital marketing ensures continued relevance and growth." },
            { q: "Do digital marketing agencies offer customized services for different businesses?", a: "Absolutely. Every business has unique goals. We tailor our SEO, SMM, and SEM strategies to fit your specific industry and target audience." },
            { q: "Can Nitty Gritty help with both short-term campaign goals and long-term brand growth?", a: "Yes, we balance immediate performance wins with long-term brand building to ensure sustainable success." },
            { q: "How can hiring a digital marketing agency benefit my business?", a: "It provides access to a team of experts, advanced tools, and data-driven strategies that lead to better ROI and brand visibility." },
            { q: "Can digital marketing agencies handle performance marketing too?", a: "Yes, performance marketing is a core part of our digital marketing services, focusing on measurable results and conversions." }
        ]
    }
};

const defaultData = serviceData["digital-marketing"];

const Counter = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
        let startTime;
        let animationFrame;

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function (easeOutExpo)
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(Math.floor(easedProgress * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateCount);
            }
        };

        animationFrame = requestAnimationFrame(updateCount);
        return () => cancelAnimationFrame(animationFrame);
    }, [target, duration]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
};

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const data = serviceData[slug] || { ...defaultData, title: slug?.replace(/-/g, ' ').toUpperCase() || defaultData.title };
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-100px] right-0 w-[600px] h-[600px] bg-red-600/10 blur-[150px] -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumbs (Moved to top) */}
                <div className="flex items-center gap-2 text-neutral-500 text-[10px] tracking-widest uppercase font-medium mb-10 ml-2">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                    <span>/</span>
                    <span className="text-white">{data.title}</span>
                </div>

                {/* Rearranged Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                    {/* Left Title Block */}
                    <div className="lg:col-span-7 bg-[#0a0a0a] rounded-[2rem] p-10 md:p-16 flex flex-col justify-center min-h-[400px]">
                        <h1 className="text-5xl md:text-7xl font-black font-outfit leading-[0.9] tracking-tighter uppercase text-white">
                            POWERING <br />
                            <span className="text-red-600">DIGITAL <br /> GROWTH</span> <br />
                            FOR BRANDS <br />
                            THAT ARE READY <br />
                            TO SCALE
                        </h1>
                    </div>

                    {/* Right Info Card */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-[#111111] rounded-[2rem] p-10 md:p-12 h-full flex flex-col justify-between border border-white/5">
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold font-outfit text-white uppercase tracking-widest">DIGITAL MARKETING AGENCY</h2>
                                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                                    We craft digital strategies that are clear, creative, and backed by data — making performance measurable, content attention-worthy, and campaigns effective beyond just reach.
                                </p>
                            </div>
                            <div className="pt-8">
                                <button className="px-10 py-3 rounded-full border border-white/20 text-white font-bold tracking-widest text-[10px] uppercase hover:bg-white hover:text-black transition-all">
                                    TALK TO US
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Row (Merged into one box) */}
                <div className="bg-[#0a0a0a] rounded-[2rem] p-10 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    <div>
                        <div className="text-4xl md:text-6xl font-light font-outfit text-white mb-2">
                            <Counter value={data.stats[0].value} />
                        </div>
                        <div className="text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase">{data.stats[0].label}</div>
                        <div className="h-[1px] w-full bg-white/5 mt-4"></div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-6xl font-light font-outfit text-white mb-2">
                            <Counter value={data.stats[1].value} />
                        </div>
                        <div className="text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase">{data.stats[1].label}</div>
                        <div className="h-[1px] w-full bg-white/5 mt-4"></div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-6xl font-light font-outfit text-white mb-2">
                            <Counter value={data.stats[2].value} />
                        </div>
                        <div className="text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase">{data.stats[2].label}</div>
                        <div className="h-[1px] w-full bg-white/5 mt-4"></div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-6xl font-light font-outfit text-white mb-2">
                            <Counter value={data.stats[3].value} />
                        </div>
                        <div className="text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase">{data.stats[3].label}</div>
                        <div className="h-[1px] w-full bg-white/5 mt-4"></div>
                    </div>
                </div>


                {/* Case Studies Section */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold font-outfit mb-8 uppercase tracking-wider">CASE STUDIES</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                                Digital marketing should do more than just look good — it should drive real, measurable growth. Our focus? Doing digital marketing in the right way — with the right mix of strategy, content, media, and performance. We help businesses find their voice online, grow with purpose, and connect with the audiences that matter.
                            </p>
                            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                                We craft digital strategies that are clear, creative, and backed by data — making performance measurable, content attention-worthy, and campaigns effective beyond just reach. We're driven by curiosity and backed by experience. We solve real problems, scale smart ideas, and turn digital confusion into clarity. Every brand has a starting point. Some need to cut through the noise and be seen. Others want to convert interest into business. Our job is to plug in with sharp thinking and creative storytelling, but more than that, we offer strategy, partnership, and execution that aligns with your goals, not just the algorithm.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                {data.caseStudies.map((cs, i) => (
                                    <button key={i} className="px-8 py-3 rounded-full border border-white/40 text-white font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-black transition-all">
                                        {cs.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6 text-neutral-400 text-sm md:text-base leading-relaxed">
                            <p>
                                Since 2016, we've worked with over 100 brands across industries — building digital ecosystems, unlocking growth opportunities, and sharpening performance along the way. Our strength lies in understanding what each brand needs, and showing up with clarity, creativity, and impact where it matters most.
                            </p>
                            <p>
                                As a Mumbai-based team, we thrive in the same fast-paced, always-on culture you do. We're here to help you navigate it and win.
                            </p>
                            <p className="font-bold text-white italic">
                                We're not just your agency. We're your unfair advantage.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold font-outfit mb-12 uppercase tracking-wider">TESTIMONIALS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.testimonials.map((t) => (
                            <div key={t.id} className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer border border-white/5">
                                <img src={t.videoThumbnail} alt={t.name} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 fill-current ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Industries & Clients */}
                <section className="mb-32">
                    <h2 className="text-2xl font-bold font-outfit mb-4 uppercase tracking-widest text-white">INDUSTRIES & CLIENTS (B2B, B2C, FMCG PRODUCTS)</h2>
                    <p className="text-neutral-400 text-sm mb-12 max-w-4xl">
                        As a leading digital marketing agency in Mumbai, we've partnered with 100+ clients across industries including finance, fashion, real estate, technology, education, and beyond. Our digital marketing expertise has helped both emerging businesses and global brands grow their presence, engage their audience, and drive real results.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-t border-white/5">
                        {data.brands.map((brand, index) => (
                            <div key={index} className="aspect-[3/2] border-r border-b border-white/5 flex items-center justify-center p-6 bg-[#050505] group hover:bg-white/5 transition-all grayscale hover:grayscale-0">
                                <span className="text-neutral-500 group-hover:text-white font-bold text-[10px] uppercase text-center">{brand}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Types of Services */}
                <section className="mb-32">
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold font-outfit mb-4 uppercase tracking-widest text-white">TYPES OF SERVICES</h2>
                        <p className="text-neutral-400 text-sm uppercase tracking-[0.2em]">End-to-End Digital Marketing. No Guesswork.</p>
                    </div>

                    <div className="space-y-24">
                        <div>
                            <h2 className="text-4xl font-bold font-outfit mb-8 uppercase tracking-wider">DIGITAL MARKETING SERVICES AT NITTY GRITTY</h2>
                            <div className="space-y-6 text-neutral-400 text-sm md:text-base max-w-5xl leading-relaxed">
                                <p>A lot is happening online, but what really matters is how close your brand can get to the right audience. We help businesses navigate this space with digital strategies that are thoughtful, creative, and built to drive growth.</p>
                                <p>With expertise across social media, SEO, performance marketing, and web development, we ensure every touchpoint moves the brand forward — bringing clarity, consistency, and real business outcomes.</p>
                                <p>We're a digital marketing agency in Mumbai that helps you connect with audiences across platforms, generate quality leads, and grow online — all with measurable impact.</p>
                            </div>
                        </div>

                        {/* Specific Service Breakdowns */}
                        <div className="space-y-16">
                            {[
                                {
                                    title: "SOCIAL MEDIA MARKETING",
                                    desc: "Visibility is easy. Being remembered takes more. We make digital strategies that spark interest, drive action, and build long-term engagement — turning casual scrollers into loyal customers. We manage your end-to-end presence on:",
                                    points: ["Facebook - Drive engagement and community through posts, ads, and campaigns.", "Instagram - Visual storytelling, reels, and creative campaigns to elevate brand identity.", "X (Twitter) - Real-time conversations and trends to keep your brand relevant.", "LinkedIn - Build industry credibility and generate B2B leads through professional content.", "YouTube - Long-form video content and ads to build visibility and trust."]
                                },
                                {
                                    title: "SEARCH ENGINE OPTIMIZATION (SEO)",
                                    desc: "Ranking higher on search engines isn't just about keywords — it's about strategy. We help your website show up right where your customers are searching, using smart, data-led SEO practices:",
                                    points: ["On-Page SEO - Optimizing your content, meta tags, headings, and site speed for better visibility.", "Off-Page SEO - Link-building, directory submissions, and content outreach to build authority.", "Result? More organic traffic, higher quality leads, and better search rankings that stick."]
                                },
                                {
                                    title: "SEARCH ENGINE MARKETING (SEM)",
                                    desc: "Need immediate visibility? Paid search campaigns can put your brand right at the top. Our SEM experts create performance-focused campaigns that are built to convert — across platforms like:",
                                    points: ["Google Search Ads - Appear for high-intent search queries with laser-targeted campaigns.", "Google Shopping Ads - Boost e-commerce sales with product-based listings that show up first.", "Facebook Ads - Reach your ideal audience through interest, behavior, and location-based targeting.", "Instagram Ads - Build awareness and drive traffic through stories, reels, and carousel ads."]
                                }
                            ].map((s, idx) => (
                                <div key={idx} className="border-t border-white/10 pt-12">
                                    <h3 className="text-3xl font-bold font-outfit mb-8 uppercase tracking-wider">{s.title}</h3>
                                    <p className="text-neutral-400 text-sm md:text-base mb-8 max-w-4xl leading-relaxed">{s.desc}</p>
                                    <ul className="space-y-4 mb-10">
                                        {s.points.map((p, i) => (
                                            <li key={i} className="flex gap-4 text-neutral-400 text-sm">
                                                <span className="text-white mt-1">•</span>
                                                <span className="font-bold text-white">{p.split(' - ')[0]}</span>
                                                <span>{p.split(' - ')[1]}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="px-8 py-3 rounded-full border border-white/20 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">KNOW MORE</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Process */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold font-outfit mb-4 uppercase tracking-wider">OUR PROCESS</h2>
                    <p className="text-neutral-400 text-xs uppercase tracking-widest mb-12">What It's Like To Work With Us. We don't do fluff. We do frameworks.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
                        {data.process.map((step, i) => (
                            <div key={i} className="space-y-6 group">
                                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-red-600/50 transition-colors">
                                    <step.icon className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold font-outfit mb-3 text-white uppercase">{step.title}</h4>
                                    <p className="text-neutral-500 text-xs leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer sections */}
                <section className="mb-32 space-y-24">
                    <div>
                        <h2 className="text-3xl font-bold font-outfit mb-8 uppercase tracking-wider">WHY OPT FOR DIGITAL MARKETING?</h2>
                        <div className="text-neutral-400 text-sm md:text-base space-y-6 max-w-5xl leading-relaxed">
                            <p>Digital marketing is one of the most dynamic, measurable, and effective ways to build brand visibility and long-term business growth. It gives brands the tools to reach the right people, at the right time, with messaging that resonates and drives action.</p>
                            <p>It helps you connect with your audience where they already are — online — and builds a system that works around the clock to grow your visibility, reputation, and revenue.</p>
                            <p>It gives your brand control — helping you get discovered on search engines, spark meaningful conversations on social media, and stay top-of-mind across the digital landscape. The best part? It's measurable. You don't have to rely on guesswork or gut feelings. You get real numbers, real-time feedback, and real insights that help you improve constantly.</p>
                            <p>But great digital marketing goes beyond platforms and performance. It's about building relevance, consistency, and momentum — and knowing how to adjust when the market shifts. That's where the right strategy makes all the difference.</p>
                            <p>We bring together creative thinking, sharp execution, and data-backed insight to help your brand not just compete — but lead. If you're serious about growth, digital is where it begins.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold font-outfit mb-8 uppercase tracking-wider">WHY CHOOSE NITTY GRITTY, A DIGITAL MARKETING AGENCY IN MUMBAI?</h2>
                        <div className="text-neutral-400 text-sm md:text-base space-y-6 max-w-5xl leading-relaxed">
                            <p>At Nitty Gritty, we bring together strategy, creativity, and execution under one roof — delivering digital marketing solutions that are not only integrated but truly aligned with your business goals.</p>
                            <p>We're a diverse team that works like a unit — combining expertise in SEO, social media, design, performance marketing, and development to craft campaigns that drive measurable growth. Every brief we take on is handled with care, clarity, and attention to detail — because that's how we work.</p>
                            <p>We know what it's like to pour energy into something and not see the traction you hoped for. That's why we build your digital marketing strategies in a way that actually moves the needle — the kind that makes people stop mid-scroll, click out of curiosity, and come back for more.</p>
                            <p>We look at digital marketing as more than campaigns and click-through rates. It's your brand's voice and visibility — all coming together to leave a real impression in a crowded digital space. Need more traffic? We'll optimize until your SEO sings. Need better engagement? Let's fix the content and spark the right conversations. Want to scale ads? We'll test, tweak, and scale until it works.</p>
                            <p>Our job isn't just to run campaigns. It's to help you make smart decisions in a space that changes every day. So, why opt for digital marketing services? Because your business deserves to be seen, heard, and remembered in the right way. With Nitty Gritty, you don't just get an agency — you get a partner that understands both the numbers and the nuance.</p>
                            <p className="font-bold text-white italic pt-4">Let's build something that cuts through the noise — together.</p>
                            <button className="px-8 py-3 rounded-full border border-white/40 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all mt-6">GET IN TOUCH</button>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section>
                    <h2 className="text-3xl font-bold font-outfit mb-12 uppercase tracking-wider">FAQS</h2>
                    <div className="border-t border-white/10">
                        {data.faqs.map((faq, i) => (
                            <div key={i} className="border-b border-white/10">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full py-8 flex items-center justify-between group hover:bg-white/5 transition-colors px-4 text-left"
                                >
                                    <span className="text-sm md:text-lg font-bold text-neutral-300 group-hover:text-white transition-colors">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-neutral-500 group-hover:text-white transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-8 pt-0 text-neutral-400 text-sm md:text-base leading-relaxed">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
