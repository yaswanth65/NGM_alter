
import React from 'react';



const ClientCategorySection = ({ title, logos }) => {
    return (
        <div className="mb-16 last:mb-0">
            <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
                <h2 className="text-xl md:text-2xl font-bold font-outfit text-red-600 uppercase tracking-wide">
                    {title}
                </h2>
            </div>

            <div className="bg-neutral-900/50 border border-white/10 rounded-[2rem] p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {logos.map((logo, index) => {
                        const isObject = typeof logo === 'object' && logo !== null;
                        const logoSrc = isObject ? logo.src : null;
                        const logoName = isObject ? logo.name : logo;

                        return (
                            <div key={index} className="flex items-center justify-center aspect-[4/3] group">
                                <div className="w-full h-full bg-white/5 rounded-xl border border-white/5 flex items-center justify-center p-1 transition-all duration-300 group-hover:bg-white group-hover:border-white/20 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] overflow-hidden">
                                    {logoSrc ? (
                                        <>
                                            <style>{`
                                                .logo-ctrl-${index} { width: ${logo.mwidth}px; height: ${logo.mheight}px; }
                                                @media (min-width: 768px) { .logo-ctrl-${index} { width: ${logo.width}px; height: ${logo.height}px; } }
                                            `}</style>
                                            <img
                                                src={logoSrc}
                                                alt={logoName}
                                                className={`logo-ctrl-${index} object-contain transition-all duration-500`}
                                            />
                                        </>
                                    ) : (
                                        <span className="text-neutral-500 font-medium text-center text-sm group-hover:text-white transition-colors">
                                            {logoName}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ClientCategorySection;
