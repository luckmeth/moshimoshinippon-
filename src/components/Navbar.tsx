import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Your Page Title | Moshi Moshi Nippon</title>
  <meta name="description" content="Page specific description" />
  <link rel="canonical" href="https://moshimoshinippon.com/current-page" />
</Helmet>

interface NavbarProps {
  onNavigate: (section: string) => void;
}

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-red-600/20 border-b border-red-600/50' 
        : 'bg-black border-b border-red-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img 
                src="/logo.png" 
                alt="Moshi Moshi Nippon" 
                className={`w-auto relative transform transition-all duration-500 ${
                  scrolled ? 'h-12' : 'h-16'
                } group-hover:scale-110`}
              />
            </div>
            <div className="hidden md:block">
              <h1 className={`text-white font-bold transition-all duration-300 ${
                scrolled ? 'text-lg' : 'text-xl'
              } group-hover:text-red-500`}>
                Moshi Moshi Nippon
              </h1>
              <p className="text-red-500 text-sm group-hover:tracking-wider transition-all duration-300">
                もしもし にっぽん
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
            
            {/* Admin Button */}
            <button
              onClick={handleAdminClick}
              className="relative ml-4 flex items-center space-x-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <Shield size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Privileges</span>
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
        <div className="bg-gradient-to-b from-black to-gray-900 border-t border-red-600/50 backdrop-blur-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
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
                  {item.name}
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
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
          transform-origin: left;
        }
      `}</style>
    </nav>
  );
}