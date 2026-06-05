import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SEO from "../components/common/SEO";

const openings = [
    { id: "01", title: "SEO EXECUTIVE", location: "Mumbai" },
    { id: "02", title: "GROWTH & CLIENT PARTNERSHIPS EXECUTIVE", location: "Mumbai" },
    { id: "03", title: "SR. GRAPHIC DESIGNER & VISUALISER", location: "Mumbai" },
    { id: "04", title: "MOTION GRAPHICS DESIGNER", location: "Mumbai" },
    { id: "05", title: "SOCIAL MEDIA ACCOUNT MANAGER", location: "Mumbai" },
    { id: "06", title: "BUSINESS DEVELOPMENT MANAGER", location: "Mumbai" },
    { id: "07", title: "BUSINESS DEVELOPMENT EXECUTIVE", location: "Mumbai" },
    { id: "08", title: "SOCIAL MEDIA EXECUTIVE", location: "Mumbai" }
];

const brands = [
    "Brand Equity", "Social Samosa", "e4m", "afaqs!", "MediaBrief", "Financial Express",
    "Medianews4u", "Storyboard", "Roastbrief", "Digital Agency Network", "TVW News India", "Campaign",
    "Best Media Info", "Adgully", "Social Media Dissect", "Marketech APAC", "Agency Masala", "MAM"
];

export default function CareersPage() {
    const navigate = useNavigate();
    const [openItem, setOpenItem] = useState(null);

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
            <SEO
                title="Careers"
                description="Join the Nitty Gritty Media team. Explore career opportunities in video production, digital marketing, design, and more."
                keywords="Nitty Gritty careers, jobs at Nitty Gritty, creative agency jobs Mumbai, media production careers"
                canonical="https://nittygrittylabz.com/careers"
            />
            {/* Red Glow */}
            <div className="absolute top-[-100px] right-0 w-[600px] h-[600px] bg-red-600/10 blur-[150px] -z-10 pointer-events-none"></div>
            <div className="absolute top-[20%] left-[-100px] w-[400px] h-[400px] bg-red-600/5 blur-[120px] -z-10 pointer-events-none"></div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 mb-24 text-center pt-15">
                <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
                    CAREER
                </h1>
                <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm tracking-widest uppercase font-medium">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-white">Career</span>
                </div>
            </div>

            {/* GROW WITH US Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-8 uppercase tracking-wider">
                    GROW WITH US
                </h2>
                <div className="max-w-4xl space-y-6 text-neutral-400 text-sm md:text-base leading-relaxed">
                    <p>
                        At Nitty Gritty, ideas are meant to be shared and brought to life to make an impact. It's where curiosity gets noticed, efforts turned into opportunity. You'll work with people who care about doing work, asking the right questions, and getting better together. Be it your first role or your next step, there's space to do something and to enjoy the process while you're at it.
                    </p>
                    <p>
                        The work is fast-paced, and so is the energy around it. Ideas move quickly, feedback is thoughtful, and your input is always part of the process. We thrive on teamwork, support, and the kind of creative energy that makes work feel a little less like work. From small wins to shared goals, there's always something to break the usual routine. Often, the most meaningful conversations come from the moments you don't plan for.
                    </p>
                </div>
            </section>

            {/* CURRENT OPENINGS Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <h2 className="text-2xl font-bold font-outfit mb-12 uppercase tracking-widest text-white">
                    CURRENT OPENINGS
                </h2>
                <div className="border-t border-white/10">
                    {openings.map((job) => (
                        <div key={job.id} className={`border-b border-white/10 transition-all duration-300 ${openItem === job.id ? 'bg-[#0a0a0a]' : 'bg-transparent'}`}>
                            <div className="relative">
                                <button
                                    onClick={() => setOpenItem(openItem === job.id ? null : job.id)}
                                    className="w-full py-10 flex items-center justify-between group px-4 z-10 relative"
                                >
                                    <div className="flex items-center gap-8 md:gap-16">
                                        <span className={`text-xs font-bold font-mono transition-colors ${openItem === job.id ? 'text-red-600' : 'text-neutral-500'}`}>{job.id}</span>
                                        <span className={`text-2xl md:text-5xl font-bold font-outfit uppercase tracking-tight transition-colors text-left leading-none ${openItem === job.id ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                            {job.title}
                                        </span>
                                    </div>
                                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${openItem === job.id ? 'rotate-180 text-red-600' : 'text-neutral-500 group-hover:text-white'}`} />
                                </button>

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openItem === job.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pb-12 pl-24 md:pl-40 pr-8">
                                        <div className="mb-6">
                                            <p className="text-neutral-400 text-sm mb-4">Location : {job.location}</p>
                                            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-4xl">
                                                We're looking for a detail-oriented and execution-focused {job.title} who is passionate about driving organic growth and improving search visibility. You will work on multiple client websites in a fast-paced agency environment, implementing {job.title.includes('SEO') ? 'SEO' : 'effective'} strategies and tracking performance to deliver measurable results.
                                            </p>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/careers/${job.id}`);
                                                }}
                                                className="px-10 py-2.5 rounded-full border border-white/40 text-white font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-black transition-all bg-transparent relative group/btn overflow-hidden"
                                            >
                                                <span className="relative z-10">Apply Now</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                                <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-red-600 to-red-500 blur-sm opacity-50 group-hover/btn:opacity-100 transition-opacity -z-10"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            
         
        </div>
    );
}
