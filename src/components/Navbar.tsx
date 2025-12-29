import { useState, useEffect } from 'react';
import { Menu, X, Shield, Sparkles, Gift, Star, Snowflake } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

// Animated snowflake for navbar
const NavSnowflake = ({ delay, left }: { delay: number; left: number }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-10px',
        animation: `navSnowfall 5s linear ${delay}s infinite`,
      }}
    >
      <Snowflake size={10} className="text-white opacity-70" />
    </div>
  );
};

// Christmas light bulb for navbar
const NavLight = ({ index, top }: { index: number; top: boolean }) => {
  const colors = ['#DC2626', '#FFFFFF', '#22C55E', '#EAB308'];
  const color = colors[index % colors.length];
  const delay = index * 0.15;
  
  return (
    <div
      className={`absolute ${top ? 'top-0' : 'bottom-0'}`}
      style={{
        left: `${(index * 5) % 100}%`,
        animation: `navLightPulse 1.5s ease-in-out ${delay}s infinite`,
      }}
    >
      <div
        className="w-2 h-3 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
      />
    </div>
  );
};

// Floating gift icon
const NavGift = ({ delay }: { delay: number }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${20 + Math.random() * 60}%`,
        animation: `navGiftFloat 8s ease-in-out ${delay}s infinite`,
      }}
    >
      <Gift size={16} className="text-red-600 opacity-60" />
    </div>
  );
};

// Twinkling star
const NavStar = ({ delay, left }: { delay: number; left: number }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '50%',
        transform: 'translateY(-50%)',
        animation: `navStarTwinkle 2s ease-in-out ${delay}s infinite`,
      }}
    >
      <Star size={12} className="text-yellow-300" fill="currentColor" />
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
        @keyframes navSnowfall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes navLightPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.8);
          }
        }
        
        @keyframes navGiftFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 1;
          }
        }
        
        @keyframes navStarTwinkle {
          0%, 100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 0.3;
            transform: translateY(-50%) scale(1.3);
          }
        }
        
        @keyframes christmasRibbon {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes ornamentSwing {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }
        
        @keyframes wreathGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(34, 197, 94, 0.5);
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
        
        @keyframes candyCaneStripe {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
          transform-origin: left;
        }
        
        .christmas-border {
          background: linear-gradient(90deg, #DC2626, #22C55E, #DC2626, #22C55E);
          background-size: 300% 300%;
          animation: christmasRibbon 3s ease infinite;
        }
        
        .ornament-swing {
          animation: ornamentSwing 2s ease-in-out infinite;
        }
        
        .wreath-glow {
          animation: wreathGlow 2s ease-in-out infinite;
        }
        
        .candy-cane-bg {
          background: repeating-linear-gradient(
            45deg,
            #DC2626,
            #DC2626 10px,
            #FFFFFF 10px,
            #FFFFFF 20px
          );
          background-size: 40px 40px;
          animation: candyCaneStripe 1s linear infinite;
        }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-red-600/20' 
          : 'bg-black'
      }`}>
        {/* Christmas lights border - top */}
        <div className="absolute top-0 left-0 right-0 h-1 christmas-border"></div>
        
        {/* Animated decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Snowflakes */}
          {[...Array(15)].map((_, i) => (
            <NavSnowflake key={`snow-${i}`} delay={i * 0.3} left={i * 7} />
          ))}
          
          {/* Christmas lights */}
          {[...Array(20)].map((_, i) => (
            <NavLight key={`light-top-${i}`} index={i} top={true} />
          ))}
          {[...Array(20)].map((_, i) => (
            <NavLight key={`light-bottom-${i}`} index={i} top={false} />
          ))}
          
          {/* Floating gifts */}
          {[...Array(3)].map((_, i) => (
            <NavGift key={`gift-${i}`} delay={i * 2} />
          ))}
          
          {/* Twinkling stars */}
          {[...Array(8)].map((_, i) => (
            <NavStar key={`star-${i}`} delay={i * 0.4} left={10 + i * 12} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section with Christmas decorations */}
            <div className="flex items-center space-x-4 group relative">
              <div className="relative">
                {/* Wreath effect */}
                <div className="absolute -inset-2 rounded-full border-4 border-green-600 opacity-30 wreath-glow"></div>
                <div className="absolute -inset-3 rounded-full border-2 border-red-600 opacity-20 wreath-glow" style={{ animationDelay: '0.5s' }}></div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <img 
                    src="/logo.png" 
                    alt="Moshi Moshi Nippon" 
                    className={`w-auto relative transform transition-all duration-500 ${
                      scrolled ? 'h-12' : 'h-16'
                    } group-hover:scale-110`}
                  />
                  
                  {/* Christmas hat on logo */}
                  <div className="absolute -top-1 -right-1 text-2xl ornament-swing">
                    🎅
                  </div>
                  
                  {/* Gift badge */}
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-red-600 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ornament-swing" style={{ animationDelay: '0.5s' }}>
                    🎄
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <h1 className={`text-white font-bold transition-all duration-300 ${
                    scrolled ? 'text-lg' : 'text-xl'
                  } group-hover:text-red-500`}>
                    Moshi Moshi Nippon
                  </h1>
                  <Sparkles size={16} className="text-red-600" style={{ animation: 'navStarTwinkle 1.5s ease-in-out infinite' }} />
                  <span className="text-lg ornament-swing">🎁</span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-red-500 text-sm group-hover:tracking-wider transition-all duration-300">
                    もしもし にっぽん
                  </p>
                  <span className="text-xs text-green-500 font-semibold">• メリークリスマス</span>
                  <Snowflake size={12} className="text-white animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`relative px-4 py-2 text-white font-medium transition-all duration-300 group ${
                    activeSection === item.id ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>{item.name}</span>
                    {activeSection === item.id && (
                      <span className="text-xs ornament-swing">🔔</span>
                    )}
                  </span>
                  
                  {/* Active Indicator with Christmas theme */}
                  {activeSection === item.id && (
                    <>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 via-green-600 to-red-600 animate-slide-in"></span>
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ornament-swing">⭐</span>
                    </>
                  )}
                  
                  {/* Hover Background with Christmas colors */}
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-green-600/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                  
                  {/* Hover Underline */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-600 to-green-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                </button>
              ))}
              
              {/* Admin Button with extreme Christmas styling */}
              <button
                onClick={handleAdminClick}
                className="relative ml-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white font-medium rounded-lg overflow-hidden group shadow-lg hover:shadow-red-600/50 transition-all duration-300"
                style={{ backgroundSize: '200% 100%', animation: 'christmasRibbon 3s ease infinite' }}
              >
                <span className="absolute inset-0 candy-cane-bg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                <Shield size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Privileges</span>
                <Gift size={16} className="relative z-10 ornament-swing" />
                
                {/* Decorative snowflakes */}
                <Snowflake size={12} className="absolute top-1 right-1 text-white opacity-70 animate-spin" style={{ animationDuration: '4s' }} />
                <Snowflake size={12} className="absolute bottom-1 left-1 text-white opacity-70 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
              </button>
            </div>

            {/* Mobile Menu Button with Christmas decoration */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-red-500 transition-colors duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-green-600/20 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              {isOpen ? (
                <X size={24} className="relative z-10 transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={24} className="relative z-10" />
              )}
              <span className="absolute -top-1 -right-1 text-xs ornament-swing">🎄</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-b from-black to-gray-900 border-t christmas-border backdrop-blur-lg relative">
            {/* Mobile decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <NavSnowflake key={`mobile-snow-${i}`} delay={i * 0.4} left={i * 10} />
              ))}
              {[...Array(5)].map((_, i) => (
                <NavStar key={`mobile-star-${i}`} delay={i * 0.6} left={15 + i * 20} />
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
                      ? 'bg-gradient-to-r from-red-600 to-green-600 shadow-lg shadow-red-600/50' 
                      : 'hover:bg-gradient-to-r hover:from-red-600/20 hover:to-green-600/20 hover:translate-x-2'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <span>{item.name}</span>
                      {activeSection === item.id && (
                        <span className="ornament-swing">🎁</span>
                      )}
                    </span>
                    {activeSection === item.id && (
                      <span className="flex items-center space-x-1">
                        <Sparkles size={14} style={{ animation: 'navStarTwinkle 1.5s ease-in-out infinite' }} />
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      </span>
                    )}
                  </span>
                </button>
              ))}
              
              <button
                onClick={handleAdminClick}
                className={`flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-600/50 transform ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${navItems.length * 50}ms`,
                  backgroundSize: '200% 100%',
                  animation: 'christmasRibbon 3s ease infinite'
                }}
              >
                <Shield size={18} />
                <span>Admin Panel</span>
                <Gift size={16} className="ornament-swing" />
              </button>

              {/* Christmas Mobile Banner */}
              <div className={`mt-4 bg-gradient-to-r from-red-600/20 via-green-600/20 to-red-600/20 border-2 christmas-border rounded-lg p-4 text-center transform ${
                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${(navItems.length + 1) * 50}ms` }}>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl ornament-swing">🎅</span>
                  <Sparkles size={16} className="text-red-600" style={{ animation: 'navStarTwinkle 1.5s ease-in-out infinite' }} />
                  <span className="text-white text-sm font-bold">Merry Christmas!</span>
                  <Sparkles size={16} className="text-green-600" style={{ animation: 'navStarTwinkle 1.5s ease-in-out infinite', animationDelay: '0.3s' }} />
                  <span className="text-2xl ornament-swing" style={{ animationDelay: '0.5s' }}>🎄</span>
                </div>
                <p className="text-gray-300 text-xs mb-2">メリークリスマス • Happy Holidays!</p>
                <div className="flex justify-center space-x-2">
                  <Snowflake size={14} className="text-white animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="text-xs text-white">Start your Japan journey this festive season!</span>
                  <Star size={14} className="text-yellow-300" fill="currentColor" style={{ animation: 'navStarTwinkle 1.5s ease-in-out infinite' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Christmas lights border - bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 christmas-border"></div>
      </nav>
    </>
  );
}