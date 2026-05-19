import { useLocation } from "react-router-dom";
import ContactSection from '@/components/global/ContactSection';

export default function GlobalContact() {
    const location = useLocation();
    const isContactPage = location.pathname === "/contact";
    const isCareersPage = location.pathname.startsWith("/careers");

    if (isContactPage) return null;

    return <ContactSection email={isCareersPage ? 'careers@nittygrittylabz.com' : undefined} />;
}
