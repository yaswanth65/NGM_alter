import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Upload } from 'lucide-react';
import SEO from "../components/common/SEO";

const jobDetails = {
    "01": {
        id: "01",
        title: "SEO EXECUTIVE",
        designation: "SEO Executive",
        location: "Mumbai",
        description: "Nitty Gritty offers a distinctive combination of services in Film, Visual Communication, Digital Marketing, and Website Development. Powered by an energetic and innovative team, Nitty Gritty thrives on experimenting with fresh ideas. The company focuses on understanding client needs and delivering tailored solutions through creative designs, advanced technology, and effective strategies. Their collaborative approach ensures impactful results that align with the unique requirements of each project.",
        roleDescription: "We're looking for a detail-oriented and execution-focused SEO Executive who is passionate about driving organic growth and improving search visibility.",
        rolePoints: [
            "You will work on multiple client websites in a fast-paced agency environment, implementing SEO strategies and tracking performance to deliver measurable results.",
            "Collaboration with creative and tech teams is key to ensuring that SEO best practices are integrated into every project."
        ],
        whatYoullDo: [
            {
                category: "SEO Strategy & Execution",
                points: [
                    "Conduct on-page and off-page SEO audits.",
                    "Perform keyword research to guide content creation.",
                    "Optimize website structure and content for better search rankings.",
                    "Monitor and analyze performance using tools like Search Console and Analytics."
                ]
            }
        ],
        whatWereLookingFor: [
            "Experience with SEO tools (Ahrefs, SEMrush, Google Search Console).",
            "Strong analytical skills and attention to detail.",
            "Ability to stay updated with search engine algorithm changes.",
            "Excellent communication and collaboration skills."
        ],
        whyThisRole: [
            "Opportunity to work with diverse clients across industries.",
            "Exposure to the latest SEO trends and technologies.",
            "A collaborative environment where your ideas take center stage."
        ]
    },
    "02": {
        id: "02",
        title: "GROWTH & CLIENT PARTNERSHIPS EXECUTIVE",
        designation: "Growth & Client Partnerships Executive",
        location: "Mumbai",
        description: "Nitty Gritty offers a distinctive combination of services in Film, Visual Communication, Digital Marketing, and Website Development. Powered by an energetic and innovative team, Nitty Gritty thrives on experimenting with fresh ideas. The company focuses on understanding client needs and delivering tailored solutions through creative designs, advanced technology, and effective strategies. Their collaborative approach ensures impactful results that align with the unique requirements of each project.",
        roleDescription: "We are looking for a street-smart, high-ownership professional who wants to grow by working closely with leadership on business development, client servicing, and account growth.",
        rolePoints: [
            "We are looking for someone eager to learn fast, take responsibility, and understand how an agency actually runs—how creative solutions turn into clients, how clients are retained, and how work gets delivered at speed.",
            "You'll be exposed to sales discussions, proposals, pricing, and client strategy, while being trusted to move things forward independently."
        ],
        whatYoullDo: [
            {
                category: "Growth & New Business",
                points: [
                    "Support active new-business conversations and inbound leads.",
                    "Participate in calls, quickly understand requirements, and help move decisions forward.",
                    "Coordinate proposals, decks, scopes, and commercials efficiently.",
                    "Track leads, follow-ups, and closures with consistency."
                ]
            },
            {
                category: "Client Management & Servicing",
                points: [
                    "Manage day-to-day communication for select clients.",
                    "Keep clients aligned, informed, and confident—especially on tight timelines.",
                    "Translate evolving client inputs into clear internal actions.",
                    "Identify opportunities for upsell, cross-sell, and retainer growth."
                ]
            },
            {
                category: "Execution & Ownership",
                points: [
                    "Coordinate with internal teams to ensure smooth and timely delivery.",
                    "Take the initiative to unblock work instead of waiting for perfect information.",
                    "Maintain trackers, CRM, and documentation to support momentum.",
                    "Flag risks early and help resolve issues proactively."
                ]
            }
        ],
        whatWereLookingFor: [
            "Street-smart: You find practical, efficient ways to get work done.",
            "Comfortable with speed: You thrive in fast-moving environments.",
            "Ownership mindset: You take responsibility and close loops.",
            "Clear communicator: Confident with clients over calls, email, and WhatsApp.",
            "Strong learning mindset: You want to grow, learn, and take on more responsibility.",
            "Prior experience in an agency or client-facing role is a strong plus.",
            "Organised, adaptable, and comfortable handling multiple priorities."
        ],
        whyThisRole: [
            "Direct exposure to leadership and decision-making.",
            "Learn how sales, pricing, retention, and delivery actually work.",
            "High responsibility with a steep learning curve.",
            "Clear path to grow into Account Lead / Growth Manager roles."
        ]
    }
};

// Fallback for other jobs or default view
const defaultDetail = jobDetails["02"];

export default function CareerDetailPage() {
    const { id } = useParams();
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        currentCtc: '',
        expectedCtc: '',
        noticePeriod: '',
        portfolioLinks: '',
        location: '',
        linkedin: '',
        message: '',
        resume: null,
        portfolioFile: null
    });
    const [errors, setErrors] = useState({});

    const [uploadProgress, setUploadProgress] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];

            // Validation
            if (name === 'resume' && file.type !== 'application/pdf') {
                setErrors(prev => ({ ...prev, resume: 'Please upload a PDF file only.' }));
                return;
            }

            // Limit to 5MB
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, [name]: 'File size must be less than 5MB.' }));
                return;
            }

            setFormData(prev => ({ ...prev, [name]: file }));
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
        if (!formData.currentCtc.trim()) newErrors.currentCtc = 'Current CTC is required';
        if (!formData.expectedCtc.trim()) newErrors.expectedCtc = 'Expected CTC is required';
        if (!formData.noticePeriod.trim()) newErrors.noticePeriod = 'Notice period is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.resume) newErrors.resume = 'Resume is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const uploadToCloudinary = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error('Cloudinary configuration missing');
        }

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);

        // Using fetch to track progress is tricky with simple fetch.
        // For actual progress bars, XMLHttpRequest or axios is better.
        // Since we are using standard fetch, we'll simulate a progress step.
        setUploadProgress(30);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Cloudinary upload failed');
        }

        setUploadProgress(100);
        const result = await response.json();
        return result.secure_url;
    };

    const sendEmail = async (resumeUrl, portfolioUrl = '') => {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            throw new Error('EmailJS configuration missing');
        }

        const templateParams = {
            user_name: formData.name,
            user_email: formData.email,
            user_phone: formData.phone,
            experience: formData.experience,
            current_ctc: formData.currentCtc,
            expected_ctc: formData.expectedCtc,
            notice_period: formData.noticePeriod,
            location: formData.location,
            linkedin: formData.linkedin,
            portfolio_links: formData.portfolioLinks,
            message: formData.message,
            resume_link: resumeUrl,
            portfolio_link: portfolioUrl,
            job_title: jobDetails[id]?.title || 'Unknown Role'
        };

        const data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: templateParams
        };

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'EmailJS failed to send');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('loading');
        setUploadProgress(10);

        try {
            // 1. Upload Resume
            console.log('Uploading resume...');
            const resumeUrl = await uploadToCloudinary(formData.resume);

            // 2. Upload Portfolio (if exists)
            let portfolioUrl = '';
            if (formData.portfolioFile) {
                console.log('Uploading portfolio...');
                portfolioUrl = await uploadToCloudinary(formData.portfolioFile);
            }

            // 3. Send Email
            console.log('Sending email...');
            await sendEmail(resumeUrl, portfolioUrl);

            setStatus('success');
            setUploadProgress(0);
            setFormData({
                name: '', email: '', phone: '', experience: '',
                currentCtc: '', expectedCtc: '', noticePeriod: '',
                portfolioLinks: '', location: '', linkedin: '', message: '',
                resume: null, portfolioFile: null
            });

        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setUploadProgress(0);
        }
    };

    // Improved title extraction from URL if specific data is missing
    const getJobTitle = () => {
        if (jobDetails[id]) return jobDetails[id].title;
        // If not in jobDetails, try to make the ID look like a title, 
        // but if it's just a number like "01", use a better fallback.
        if (id && isNaN(id)) return id.replace(/-/g, ' ').toUpperCase();
        return "CAREER OPPORTUNITY";
    };

    const job = jobDetails[id] || { ...defaultDetail, title: getJobTitle() };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
            <SEO
                title={job.title}
                description={`Apply for ${job.title} position at Nitty Gritty Media. Join our team in Mumbai.`}
                keywords={`${job.title.toLowerCase()}, Nitty Gritty careers, job in Mumbai`}
                canonical={`https://nittygrittylabz.com/careers/${id}`}
            />
            {/* Red Glow */}
            <div className="absolute top-[-100px] right-0 w-[600px] h-[600px] bg-red-600/10 blur-[150px] -z-10 pointer-events-none"></div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 tracking-tight uppercase text-white leading-tight max-w-5xl mx-auto">
                    {job.title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm tracking-widest uppercase font-medium">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white truncate max-w-[200px]">{job.title}</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6">
                {/* Job Overiew */}
                <div className="mb-20 space-y-8">
                    <div className="space-y-2">
                        <p className="text-neutral-400 font-medium">Designation : <span className="text-white">{job.designation}</span></p>
                        <p className="text-neutral-400 font-medium">Location : <span className="text-white">{job.location}</span></p>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                        {job.description}
                    </p>
                </div>

                {/* Role Description */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold font-outfit mb-8 text-white">Role Description</h2>
                    <div className="space-y-6 text-neutral-400 text-sm md:text-base leading-relaxed">
                        <p>{job.roleDescription}</p>
                        {job.rolePoints.map((point, i) => (
                            <p key={i}>{point}</p>
                        ))}
                    </div>
                </div>

                {/* What You'll Do */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold font-outfit mb-8 text-white">What You'll Do</h2>
                    <div className="space-y-12">
                        {job.whatYoullDo.map((item, i) => (
                            <div key={i}>
                                <h3 className="text-xl font-bold font-outfit mb-6 text-white">{item.category}</h3>
                                <ul className="space-y-4">
                                    {item.points.map((point, j) => (
                                        <li key={j} className="flex gap-4 text-neutral-400 text-sm md:text-base">
                                            <span className="text-white mt-1.5 flex-shrink-0">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What We're Looking For */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold font-outfit mb-8 text-white">What We're Looking For</h2>
                    <ul className="space-y-4">
                        {job.whatWereLookingFor.map((point, i) => (
                            <li key={i} className="flex gap-4 text-neutral-400 text-sm md:text-base">
                                <span className="text-white mt-1.5 flex-shrink-0">•</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Why This Role */}
                <div className="mb-32">
                    <h2 className="text-2xl font-bold font-outfit mb-8 text-white">Why This Role Is a Strong Growth Opportunity</h2>
                    <ul className="space-y-4">
                        {job.whyThisRole.map((point, i) => (
                            <li key={i} className="flex gap-4 text-neutral-400 text-sm md:text-base">
                                <span className="text-white mt-1.5 flex-shrink-0">•</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Application Form */}
                <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] -z-10 group-hover:bg-red-600/10 transition-colors"></div>

                    <div className="mb-12">
                        <h2 className="text-xl font-light text-neutral-400 uppercase tracking-[0.3em] mb-2 font-outfit">LETS WORK</h2>
                        <h3 className="text-5xl md:text-7xl font-black font-outfit uppercase text-white leading-none tracking-tight">TOGETHER</h3>
                    </div>

                    {status === 'success' ? (
                        <div className="text-center py-12 space-y-6">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold font-outfit">Application Sent!</h3>
                            <p className="text-neutral-400 max-w-md mx-auto">
                                Thank you for applying. Our team will review your application and get back to you soon.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="text-red-500 font-bold tracking-widest text-xs uppercase hover:text-white transition-colors"
                            >
                                Send another application
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                                    Something went wrong. Please try again or contact us directly.
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name *"
                                        className={`w-full bg-[#111111] border ${errors.name ? 'border-red-500/50' : 'border-white/5'} rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500`}
                                    />
                                    {errors.name && <p className="text-[10px] text-red-500 px-2">{errors.name}</p>}
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Contact Number *"
                                        className={`w-full bg-[#111111] border ${errors.phone ? 'border-red-500/50' : 'border-white/5'} rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500`}
                                    />
                                    {errors.phone && <p className="text-[10px] text-red-500 px-2">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email ID *"
                                        className={`w-full bg-[#111111] border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500`}
                                    />
                                    {errors.email && <p className="text-[10px] text-red-500 px-2">{errors.email}</p>}
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="Total Experience (Years) *"
                                        className={`w-full bg-[#111111] border ${errors.experience ? 'border-red-500/50' : 'border-white/5'} rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500`}
                                    />
                                    {errors.experience && <p className="text-[10px] text-red-500 px-2">{errors.experience}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="currentCtc"
                                        value={formData.currentCtc}
                                        onChange={handleChange}
                                        placeholder="Current CTC (In LPA) *"
                                        className={`w-full bg-[#111111] border ${errors.currentCtc ? 'border-red-500/50' : 'border-white/5'} rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500`}
                                    />
                                    {errors.currentCtc && <p className="text-[10px] text-red-500 px-2">{errors.currentCtc}</p>}
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="expectedCtc"
                                        value={formData.expectedCtc}
                                        onChange={handleChange}
                                        placeholder="Expected CTC (In LPA) *"
                                        className={`w-full bg-[#111111] border ${errors.expectedCtc ? 'border-red-500/50' : 'border-white/5'} rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500`}
                                    />
                                    {errors.expectedCtc && <p className="text-[10px] text-red-500 px-2">{errors.expectedCtc}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="noticePeriod"
                                        value={formData.noticePeriod}
                                        onChange={handleChange}
                                        placeholder="Notice Period Days (e.g. 30, 60) *"
                                        className={`w-full bg-[#111111] border ${errors.noticePeriod ? 'border-red-500/50' : 'border-white/5'} rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500`}
                                    />
                                    {errors.noticePeriod && <p className="text-[10px] text-red-500 px-2">{errors.noticePeriod}</p>}
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="portfolioLinks"
                                        value={formData.portfolioLinks}
                                        onChange={handleChange}
                                        placeholder="Portfolio Links"
                                        className="w-full bg-[#111111] border border-white/5 rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Your Location (City) *"
                                        className={`w-full bg-[#111111] border ${errors.location ? 'border-red-500/50' : 'border-white/5'} rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500`}
                                    />
                                    {errors.location && <p className="text-[10px] text-red-500 px-2">{errors.location}</p>}
                                </div>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        placeholder="Linkedin Profile"
                                        className="w-full bg-[#111111] border border-white/5 rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors text-white placeholder-neutral-500"
                                    />
                                </div>
                            </div>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message (optional)"
                                rows={6}
                                className="w-full bg-[#111111] border border-white/5 rounded-md px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors resize-none text-white placeholder-neutral-500"
                            ></textarea>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-2">Upload Resume (PDF ONLY) *</p>
                                    <label className={`flex flex-col items-center justify-center w-full h-24 border border-dashed ${errors.resume ? 'border-red-500/50' : 'border-white/10'} rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/upload relative`}>
                                        <div className="flex flex-col items-center justify-center pt-2 pb-1">
                                            <Upload className={`w-5 h-5 ${formData.resume ? 'text-green-500' : 'text-neutral-500'} group-hover/upload:text-white transition-colors mb-2`} />
                                            <p className="text-[10px] text-neutral-500 group-hover/upload:text-white transition-colors">
                                                {formData.resume ? formData.resume.name : 'Drag & Drop or Click to Upload'}
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name="resume"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {errors.resume && <p className="text-[10px] text-red-500 px-2">{errors.resume}</p>}
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-2">Upload Portfolio (Optional)</p>
                                    <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/upload">
                                        <div className="flex flex-col items-center justify-center pt-2 pb-1">
                                            <Upload className={`w-5 h-5 ${formData.portfolioFile ? 'text-green-500' : 'text-neutral-500'} group-hover/upload:text-white transition-colors mb-2`} />
                                            <p className="text-[10px] text-neutral-500 group-hover/upload:text-white transition-colors">
                                                {formData.portfolioFile ? formData.portfolioFile.name : 'Drag & Drop or Click to Upload'}
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name="portfolioFile"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="pt-8 text-center md:text-left">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="px-12 py-3 rounded-full border border-white/40 text-white font-bold tracking-widest text-sm uppercase hover:bg-white hover:text-black transition-all bg-transparent relative group/btn overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {status === 'loading' ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {uploadProgress < 100 ? `Uploading (${uploadProgress}%)...` : 'Finalizing...'}
                                            </>
                                        ) : 'Submit'}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                    <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-red-600 to-red-500 blur-sm opacity-50 group-hover/btn:opacity-100 transition-opacity -z-10"></div>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
