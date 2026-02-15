import React, { useState, useRef, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AdvertisingSection } from './components/AdvertisingSection';
import { Services as MainServices } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { InquiryForm } from './components/InquiryForm';
import { Chatbot, ChatButton } from './components/Chatbot';
import { LanguageSelector } from './components/LanguageSelector';
import { AdminLogin, isAdminAuthenticated, adminLogout } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import TourBuilder from './components/TourBuilder';

function MainContent() {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  
  const homeRef = useRef<HTMLDivElement>(null);
  const advertisingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if admin is already authenticated
    setIsAdminAuth(isAdminAuthenticated());
    
    // Check URL for routing
    const path = window.location.pathname;
    if (path === '/services') {
      setCurrentView('services');
    } else if (path === '/tours') {
      setCurrentView('tours');
    }
    
    // Handle browser back/forward buttons
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/services') {
        setCurrentView('services');
      } else if (path === '/tours') {
        setCurrentView('tours');
      } else {
        setCurrentView('main');
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToView = (view: string) => {
    setCurrentView(view);
    if (view === 'services') {
      window.history.pushState(null, '', '/services');
    } else if (view === 'tours') {
      window.history.pushState(null, '', '/tours');
    } else {
      window.history.pushState(null, '', '/');
    }
  };

  const handleNavigate = (section: string) => {
    // Handle special navigation to new views
    if (section === 'visa-services') {
      navigateToView('services');
      return;
    }
    if (section === 'tour-builder') {
      navigateToView('tours');
      return;
    }
    
    // Ensure we're on the main view for section navigation
    if (currentView !== 'main') {
      navigateToView('main');
      // Wait for the view to change before scrolling
      setTimeout(() => {
        handleSectionScroll(section);
      }, 100);
      return;
    }
    
    handleSectionScroll(section);
  };

  const handleSectionScroll = (section: string) => {
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

    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
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

  // Render different views based on current view
  if (currentView === 'services') {
    return (
      <div className="min-h-screen">
        {/* Language Selector */}
        <LanguageSelector />
        
        <div className="bg-gradient-to-r from-black via-red-950 to-black shadow-lg sticky top-0 z-50 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateToView('main')}
                className="flex items-center space-x-3 text-white hover:text-red-200 transition-colors"
              >
                <img src="/logo.png" alt="Moshi Moshi Nippon" className="h-10 w-auto" />
                <div>
                  <h1 className="text-lg font-bold">Moshi Moshi Nippon</h1>
                  <p className="text-xs text-red-200">もしもし にっぽん</p>
                </div>
              </button>
              <button
                onClick={() => navigateToView('tours')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Tour Builder
              </button>
            </div>
          </div>
        </div>
        <Services />
      </div>
    );
  }

  if (currentView === 'tours') {
    return (
      <div className="min-h-screen">
        {/* Language Selector */}
        <LanguageSelector />
        
        <div className="bg-gradient-to-r from-black via-red-950 to-black shadow-lg sticky top-0 z-50 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateToView('main')}
                className="flex items-center space-x-3 text-white hover:text-red-200 transition-colors"
              >
                <img src="/logo.png" alt="Moshi Moshi Nippon" className="h-10 w-auto" />
                <div>
                  <h1 className="text-lg font-bold">Moshi Moshi Nippon</h1>
                  <p className="text-xs text-red-200">もしもし にっぽん</p>
                </div>
              </button>
              <button
                onClick={() => navigateToView('services')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Visa Services
              </button>
            </div>
          </div>
        </div>
        <TourBuilder />
      </div>
    );
  }

  // Main view (default)
  return (
    <div className="min-h-screen bg-white">
      {/* Language Selector - Shows on all pages */}
      <LanguageSelector />
      
      <Navbar 
        onNavigate={handleNavigate}
        onVisaServices={() => navigateToView('services')}
        onTourBuilder={() => navigateToView('tours')}
      />

      <div ref={homeRef}>
        <Hero 
          onGetStarted={() => setShowInquiryForm(true)}
          onVisaServices={() => navigateToView('services')}
          onTourBuilder={() => navigateToView('tours')}
        />
      </div>

      <div ref={advertisingRef}>
        <AdvertisingSection />
      </div>

      <div ref={servicesRef}>
        <MainServices />
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