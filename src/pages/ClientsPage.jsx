
import { Link } from "react-router-dom";
import ClientCategorySection from '@/components/clients/ClientCategorySection';
import { clientsList } from '@/data/clients-list';
import SEO from "../components/common/SEO";

export default function ClientsPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <SEO
            title="Brands & Clients We've Worked With | Nitty Gritty Labz"
        description="Explore the brands and clients associated with Nitty Gritty Labz across digital marketing, branding, video production, photography, and creative campaigns."
        keywords="Brands We Work With, Client List, Creative Campaigns Mumbai, Digital Marketing Clients, Branding Agency Clients"
        canonical="https://nittygrittylabz.com/clients"
            />
            {/* Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] -z-10 pointer-events-none"></div>


            <div className="max-w-7xl mx-auto px-6 pt-15">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-20 text-center">
                    <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.1] text-white uppercase mb-[clamp(1.5rem,4vw,2rem)]">
                        CLIENTS

                    </h1>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm tracking-widest uppercase font-medium">
                        <Link to="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-white">Clients</span>
                    </div>
                </div>

                {/* Clients List */}
                <div className="space-y-12">
                    {clientsList.map((category, index) => (
                        <ClientCategorySection
                            key={index}
                            title={category.title}
                            logos={category.logos}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
