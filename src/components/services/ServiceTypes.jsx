
import React from 'react';
const ServiceTypes = ({ serviceTypes }) => {
    return (
        <section className="py-20 px-6 bg-black relative">
            <div className="max-w-4xl mx-auto space-y-24">
                {serviceTypes.map((type, index) => (
                    <div key={index} className="flex flex-col gap-6">
                        <h3 className="text-3xl md:text-4xl font-bold font-outfit uppercase text-white tracking-wide">
                            {type.title}
                        </h3>
                        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
                            {type.description}
                        </p>
                        <button className="w-fit px-6 py-2 rounded-full border border-white/20 text-sm uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white transition-all duration-300">
                            Know More
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceTypes;
