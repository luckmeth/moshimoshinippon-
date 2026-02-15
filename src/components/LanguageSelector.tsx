import { useState, useEffect } from 'react';
import { Globe, X } from 'lucide-react';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already selected a language
    const languageSelected = sessionStorage.getItem('languageSelected');
    
    if (!languageSelected) {
      // Show popup automatically after 1 second
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    } else {
      // User already selected, don't show popup
      setIsOpen(false);
    }
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    console.log('Language selected:', langCode);
    
    // Mark that user has selected a language (for this session only)
    sessionStorage.setItem('languageSelected', 'true');
    
    // Close the popup
    setIsOpen(false);

    // Clear any existing Google Translate cookies first
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    
    // If English (primary language), reset to original English
    if (langCode === 'en') {
      // Set cookie to English explicitly
      document.cookie = `googtrans=/en/en; path=/`;
      document.cookie = `googtrans=/en/en; path=/; domain=${window.location.hostname}`;
      
      // Reload page to show original English content
      window.location.reload();
      return;
    }

    // Apply translation using Google Translate cookie for secondary languages
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    
    // Reload page to apply translation
    window.location.reload();
  };

  const openLanguageSelector = () => {
    setIsOpen(true);
  };

  // Don't render the floating button, only the popup
  if (!isOpen) {
    return (
      <button
        onClick={openLanguageSelector}
        className="fixed top-20 right-4 sm:top-24 sm:right-6 z-[60] bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label="Change Language"
        title="Change Language"
      >
        <Globe size={24} />
      </button>
    );
  }

  return (
    <>
      {/* Floating Language Button */}
      <button
        onClick={openLanguageSelector}
        className="fixed top-20 right-4 sm:top-24 sm:right-6 z-[60] bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label="Change Language"
        title="Change Language"
      >
        <Globe size={24} />
      </button>

      {/* Language Selection Popup */}
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
        <div 
          className="relative rounded-2xl max-w-md w-full shadow-2xl border-4 border-red-600 animate-scaleIn"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          }}
        >
          {/* Globe Icon */}
          <div className="flex justify-center pt-8 pb-4">
            <div className="bg-red-600 rounded-full p-4 animate-pulse">
              <Globe size={48} className="text-white" />
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center px-6 pb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Choose Your Language
            </h2>
            <p className="text-base text-gray-400 mb-4">
              Select your preferred language to continue
            </p>
            
            {/* Decorative Line */}
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-red-600 rounded-full"></div>
            </div>
          </div>

          {/* Language Buttons - English First (Primary) */}
          <div className="px-6 pb-8 space-y-3">
            {/* PRIMARY LANGUAGE - English */}
            <button
              onClick={() => handleLanguageSelect('en')}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3 border-2 border-yellow-400"
            >
              <span className="text-2xl">🇬🇧</span>
              <span>English</span>
              <span className="text-xs bg-yellow-400 text-red-900 px-2 py-1 rounded-full font-bold ml-2">PRIMARY</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-xs text-gray-500 font-semibold">OTHER LANGUAGES</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            {/* SECONDARY LANGUAGES */}
            
            {/* Sinhala */}
            <button
              onClick={() => handleLanguageSelect('si')}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 hover:shadow-xl"
            >
              <span className="text-2xl">🇱🇰</span>
              <span>සිංහල (Sinhala)</span>
            </button>

            {/* Japanese */}
            <button
              onClick={() => handleLanguageSelect('ja')}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 hover:shadow-xl"
            >
              <span className="text-2xl">🇯🇵</span>
              <span>日本語 (Japanese)</span>
            </button>

            {/* Tamil */}
            <button
              onClick={() => handleLanguageSelect('ta')}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 hover:shadow-xl"
            >
              <span className="text-2xl">🇱🇰</span>
              <span>தமிழ் (Tamil)</span>
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center pb-6 px-6">
            <p className="text-xs text-gray-500">
              Translation powered by Google Translate
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
}