import { useState, useEffect } from 'react';
import { Menu, X, Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

// Floating sparkle component
const FloatingSparkle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomDuration = 3 + Math.random() * 2;
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${randomX}%`,
        top: '50%',
        animation: `sparkleFloat ${randomDuration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <Sparkles size={12} className="text-red-600 opacity-60" />
    </div>
  );
};

export function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = ['home', 'services', 'about', 'advertisements', 'gallery', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
    setActiveSection(id);
  };

  const handleAdminClick = () => {
    window.location.href = '/admin';
  };

  return (
    <>
      <style>{`
        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(-10px) scale(1);
            opacity: 0;
          }
          50% {
            transform: translateY(10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes newYearPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
          transform-origin: left;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .new-year-badge {
          animation: newYearPulse 2s ease-in-out infinite;
        }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-red-600/20 border-b border-red-600/50' 
          : 'bg-black border-b border-red-600'
      }`}>
        {/* Decorative sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <FloatingSparkle key={i} delay={i * 0.5} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section with New Year Badge */}
            <div className="flex items-center space-x-4 group relative">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img 
                  src="/logo.png" 
                  alt="Moshi Moshi Nippon" 
                  className={`w-auto relative transform transition-all duration-500 ${
                    scrolled ? 'h-12' : 'h-16'
                  } group-hover:scale-110`}
                />
                {/* 2025 Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg new-year-badge">
                  2026
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <h1 className={`text-white font-bold transition-all duration-300 ${
                    scrolled ? 'text-lg' : 'text-xl'
                  } group-hover:text-red-500`}>
                    Moshi Moshi Nippon
                  </h1>
                  <Sparkles size={16} className="text-red-600 animate-twinkle" />
                </div>
                <p className="text-red-500 text-sm group-hover:tracking-wider transition-all duration-300">
                  もしもし にっぽん • 新年おめでとう
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`relative px-4 py-2 text-white font-medium transition-all duration-300 group ${
                    activeSection === item.id ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active Indicator */}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 animate-slide-in"></span>
                  )}
                  
                  {/* Hover Background */}
                  <span className="absolute inset-0 bg-red-600/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                  
                  {/* Hover Underline */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                </button>
              ))}
              
              {/* Admin Button with New Year Effect */}
              <button
                onClick={handleAdminClick}
                className="relative ml-4 flex items-center space-x-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <Shield size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Privileges</span>
                {/* Sparkle decoration */}
                <Sparkles size={14} className="relative z-10 animate-twinkle" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-red-500 transition-colors duration-300 group"
            >
              <div className="absolute inset-0 bg-red-600/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              {isOpen ? (
                <X size={24} className="relative z-10 transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={24} className="relative z-10" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-b from-black to-gray-900 border-t border-red-600/50 backdrop-blur-lg relative">
            {/* Mobile sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <FloatingSparkle key={`mobile-${i}`} delay={i * 0.7} />
              ))}
            </div>
            
            <div className="px-4 pt-4 pb-6 space-y-2 relative z-10">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`block w-full text-left px-4 py-3 text-white font-medium rounded-lg transition-all duration-300 transform ${
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  } ${
                    activeSection === item.id 
                      ? 'bg-red-600 shadow-lg shadow-red-600/50' 
                      : 'hover:bg-red-600/20 hover:translate-x-2'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <span>{item.name}</span>
                      {activeSection === item.id && (
                        <Sparkles size={14} className="animate-twinkle" />
                      )}
                    </span>
                    {activeSection === item.id && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    )}
                  </span>
                </button>
              ))}
              
              <button
                onClick={handleAdminClick}
                className={`flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-600/50 transform ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${navItems.length * 50}ms` }}
              >
                <Shield size={18} />
                <span>Admin Panel</span>
                <Sparkles size={14} className="animate-twinkle" />
              </button>

              {/* New Year 2025 Mobile Banner */}
              <div className={`mt-4 bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-600/30 rounded-lg p-3 text-center transform ${
                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${(navItems.length + 1) * 50}ms` }}>
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles size={16} className="text-red-600 animate-twinkle" />
                  <span className="text-white text-sm font-semibold">Happy New Year 2025!</span>
                  <Sparkles size={16} className="text-red-600 animate-twinkle" />
                </div>
                <p className="text-gray-300 text-xs mt-1">新年おめでとうございます</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}