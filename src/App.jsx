import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ScrollToTop from './components/global/ScrollToTop';
import RootLayout from './layouts/RootLayout';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const PortfolioDetailPage = lazy(() => import('./pages/PortfolioDetailPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const CareerDetailPage = lazy(() => import('./pages/CareerDetailPage'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const StudioPage = lazy(() => import('./pages/StudioPage'));

// Simple loading fallback
const PageLoader = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <Router>
            <ScrollToTop />
            <RootLayout>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/studio" element={<StudioPage />}/>
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/services/:id" element={<ServiceDetails />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/portfolio" element={<PortfolioPage />} />
                        <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
                        <Route path="/clients" element={<ClientsPage />} />
                        <Route path="/careers" element={<CareersPage />} />
                        <Route path="/careers/:id" element={<CareerDetailPage />} />
                    </Routes>
                </Suspense>
            </RootLayout>
        </Router>
    );
}

export default App;
