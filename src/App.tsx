import { useState, useRef, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AdvertisingSection } from './components/AdvertisingSection';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { InquiryForm } from './components/InquiryForm';
import { Chatbot, ChatButton } from './components/Chatbot';
import { AdminLogin, isAdminAuthenticated, adminLogout } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

function MainContent() {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  
  const homeRef = useRef<HTMLDivElement>(null);
  const advertisingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if admin is already authenticated
    setIsAdminAuth(isAdminAuthenticated());
  }, []);

  const handleNavigate = (section: string) => {
    let ref;
    switch (section) {
      case 'home':
        ref = homeRef;
        break;
      case 'advertising':
        ref = advertisingRef;
        break;
      case 'services':
        ref = servicesRef;
        break;
      case 'about':
        ref = aboutRef;
        break;
      case 'contact':
        ref = contactRef;
        break;
      default:
        return;
    }

    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuth(true);
  };

  const handleAdminLogout = () => {
    adminLogout();
    setIsAdminAuth(false);
  };

  // If accessing admin panel
  if (window.location.pathname === '/admin') {
    if (!isAdminAuth) {
      return <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />;
    }
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} />

      <div ref={homeRef}>
        <Hero onGetStarted={() => setShowInquiryForm(true)} />
      </div>

      <div ref={advertisingRef}>
        <AdvertisingSection />
      </div>

      <div ref={servicesRef}>
        <Services />
      </div>

      <div ref={aboutRef}>
        <About />
      </div>

      <div ref={contactRef}>
        <Contact onConsultationClick={() => setShowInquiryForm(true)} />
      </div>

      <footer className="bg-black text-white py-8 border-t border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src="/logo.png" alt="Moshi Moshi Nippon" className="h-12 w-auto" />
              <div>
                <p className="font-semibold">Moshi Moshi Nippon</p>
                <p className="text-sm text-gray-400">もしもし にっぽん</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} Moshi Moshi Nippon. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">Design and implementation credits to MJ Technology Solutions</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Inquiry Form Modal */}
      {showInquiryForm && <InquiryForm onClose={() => setShowInquiryForm(false)} />}

      {/* AI Chatbot */}
      <Chatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
      
      {/* Floating Chat Button - Only show when chatbot is closed */}
      {!showChatbot && <ChatButton onClick={() => setShowChatbot(true)} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;