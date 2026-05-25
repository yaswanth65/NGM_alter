import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";



const ServiceSection = ({ title, slug, features, description, imageSrc, reverse }) => {
    return (
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 py-16 px-8 rounded-[40px] bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all duration-500 mb-12`}>
            <div className="w-full lg:w-1/2">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-800 relative">

                    {/* Conditional Image or Fallback */}
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-600 uppercase tracking-widest font-bold text-xl">
                            {title} IMAGE
                        </div>
                    )}

                    {/* Gradient overlay (added pointer-events-none so it doesn't block image interaction) */}
                    {/* <div className=" z-10 absolute inset-0 pointer-events-none bg-gradient-to-tr from-red-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}
                </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold font-outfit uppercase tracking-tight text-white">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-neutral-300 font-medium tracking-wide">
                            <span className="text-red-500">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                            {feature}
                        </div>
                    ))}
                </div>

                <p className="text-neutral-400 text-lg leading-relaxed font-light max-w-xl">
                    {description}
                </p>

                <Link to={`/services/${slug}`} className="inline-block group relative px-8 py-3 rounded-full border border-white/20 overflow-hidden transition-all duration-300 hover:border-red-500">
                    <span className="relative z-10 text-white font-bold tracking-widest text-xs uppercase">Know More</span>
                    <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
            </div>
        </div>
    );
};

export default function ServicesPage() {
    const services = [
        {
            title: "Photography",
            slug: "photography",
            features: ["Portrait Photography", "Product Photography", "Event Coverage", "Editorial"],
            description: "Professional photography for brands, events, and products. High-quality visuals that resonate with your audience.",
            imageSrc: "/services/Photography 2.jpg",
            reverse: false
        },
        {
            title: "Web & App Development",
            slug: "web-app-development",
            features: ["Custom Web Design", "Mobile App Development", "E-commerce Solutions", "Performance Optimization"],
            description: "Responsive websites and intuitive mobile applications. We code for performance, scalability, and seamless user experiences.",
            imageSrc: "/services/Web and App Development.jpg",
            reverse: true
        },
        {
            title: "Digital Marketing",
            slug: "digital-marketing",
            features: ["SEO & SEM", "Social Media Management", "Content Strategy", "Performance Marketing"],
            description: "Data-driven strategies across SEO, social media, and performance marketing to scale your presence and generate leads.",
            imageSrc: "/services/Digital Marketing 2.jpg",
            reverse: false
        },
        {
            title: "Video Production",
            slug: "video-production",
            features: ["DVCs & TVCs", "Corporate Films", "Drone Cinematography", "Post-Production"],
            description: "From conceptualization to post-production, we create impactful videos including DVCs, corporate films, and drone cinematography.",
            imageSrc: "/services/Video Production 1.jpg",
            reverse: true
        },
        {
            title: "Graphic Designing",
            slug: "graphic-design",
            features: ["Brand Identity", "UI/UX Design", "Social Media Creatives", "Logo Design"],
            description: "Creative visual communication: logos, brand identities, and marketing assets that define your brand's unique voice.",
            imageSrc: "/services/Designing 2.jpg",
            reverse: false
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <SEO
            title="Digital Marketing, Production & Development Services | Nitty Gritty Labz"
        description="Explore digital marketing, video production, photography, graphic design, branding, and web & app development services tailored for modern brands and businesses."
        keywords="Digital Marketing Agency Mumbai, Video Production Agency, Web Development Mumbai, Graphic Design Agency, Branding Agency"
        canonical="https://nittygrittylabz.com/services"
            />
            {/* Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] -z-10 pointer-events-none"></div>

            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 pt-15">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-24 text-center">
                    <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
                        SERVICES
                    </h1>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm tracking-widest uppercase font-medium">
                        <Link to="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-white">Services</span>
                    </div>
                </div>

                {/* Services List */}
                <div className="space-y-4">
                    {services.map((service, index) => (
                        <ServiceSection key={index} {...service} />
                    ))}
                </div>
            </div>
        </div>
    );
}
