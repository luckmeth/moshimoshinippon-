import { ArrowRight, X, Image, ChevronLeft, ChevronRight, Plane } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface HeroProps {
  onGetStarted: () => void;
}

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  created_at: string;
}

// Background slideshow images from Supabase Storage
const BACKGROUND_IMAGES = [
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/jap1.jpg',
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/jap2.jpg',
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/jap3.jpg',
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/j1.jpg',
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/j2.jpg',
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/j3.jpg',
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/j4.jpg',
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/j5.jpg',
  'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/ai/herox%20phots/jap4.jpg'
  
];

// Firework particle component
const Firework = ({ delay }: { delay: number }) => {
  const colors = ['#DC2626', '#FFFFFF', '#EF4444', '#FCA5A5'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * 100;
  const randomDuration = 2 + Math.random() * 2;
  
  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${randomX}%`,
        bottom: '0%',
        animation: `firework ${randomDuration}s ease-out ${delay}s infinite`,
      }}
    >
      <div 
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: randomColor }}
      />
    </div>
  );
};

// Confetti component
const Confetti = ({ delay }: { delay: number }) => {
  const colors = ['#DC2626', '#FFFFFF', '#EF4444'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * 100;
  const randomRotation = Math.random() * 360;
  const randomDuration = 3 + Math.random() * 2;
  
  return (
    <div
      className="absolute w-3 h-3 pointer-events-none"
      style={{
        left: `${randomX}%`,
        top: '-5%',
        backgroundColor: randomColor,
        animation: `confettiFall ${randomDuration}s linear ${delay}s infinite`,
        transform: `rotate(${randomRotation}deg)`,
      }}
    />
  );
};

// Cloud component
const Cloud = ({ delay, position }: { delay: number; position: number }) => {
  return (
    <div
      className="absolute pointer-events-none opacity-40"
      style={{
        top: `${position}%`,
        animation: `cloudFloat 20s linear ${delay}s infinite`,
      }}
    >
      <svg width="100" height="60" viewBox="0 0 100 60" fill="white">
        <ellipse cx="25" cy="40" rx="25" ry="20" />
        <ellipse cx="50" cy="30" rx="30" ry="25" />
        <ellipse cx="75" cy="40" rx="25" ry="20" />
      </svg>
    </div>
  );
};

// Particle effect
const Particle = ({ delay, index }: { delay: number; index: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomSize = 1 + Math.random() * 3;
  const randomDuration = 3 + Math.random() * 4;
  
  return (
    <div
      className="absolute rounded-full bg-white opacity-60 pointer-events-none"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        animation: `particleFloat ${randomDuration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

export function Hero({ onGetStarted }: HeroProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Trigger animations on mount
  useEffect(() => {
    setHasLoaded(true);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, []);

  // Track mouse position for parallax effect (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only enable parallax on desktop (screens wider than 768px)
      if (window.innerWidth > 768) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load gallery images from database
  useEffect(() => {
    if (showGallery) {
      loadGalleryImages();
    }
  }, [showGallery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const loadGalleryImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (data) {
        console.log('Gallery images loaded:', data.length);
        setGalleryImages(data);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(galleryImages.map(img => img.category)))];

  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Navigate between images in lightbox
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % filteredImages.length
      : (selectedImage - 1 + filteredImages.length) % filteredImages.length;
    
    setSelectedImage(newIndex);
  };

  return (
    <>
      <style>{`
        @keyframes firework {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-400px) scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-600px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(220, 38, 38, 0.8);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes planeEntry {
          0% {
            transform: translate(-150%, -150%) rotate(-45deg) scale(0.3);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes logoLand {
          0% {
            transform: translateY(-100vh) rotate(20deg) scale(0.5);
            opacity: 0;
          }
          60% {
            transform: translateY(20px) rotate(-5deg) scale(1.1);
          }
          80% {
            transform: translateY(-10px) rotate(2deg) scale(0.95);
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideInUp {
          0% {
            transform: translateY(100px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes slideshow {
          0% {
            opacity: 0;
            transform: scale(1.1);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(1.15);
          }
        }
        
        @keyframes cloudFloat {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes particleFloat {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(20px, -50px);
            opacity: 0.8;
          }
        }
        
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          33% {
            transform: translate(-2px, 2px);
          }
          66% {
            transform: translate(2px, -2px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, #DC2626 0%, #FFFFFF 50%, #DC2626 100%);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        
        .plane-entry {
          animation: planeEntry 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .logo-land {
          animation: logoLand 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
          opacity: 0;
        }
        
        .slide-in-up {
          animation: slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        .slide-in-left {
          animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        .slide-in-right {
          animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        .scale-in {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        .fade-in {
          animation: fadeIn 1s ease-in forwards;
          opacity: 0;
        }
        
        .bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        .glassmorphism {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .scanline-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(220, 38, 38, 0.8), transparent);
          animation: scanline 3s linear infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1200 { animation-delay: 1.2s; }
        .delay-1400 { animation-delay: 1.4s; }
        .delay-1600 { animation-delay: 1.6s; }
        .delay-1800 { animation-delay: 1.8s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-2200 { animation-delay: 2.2s; }
        .delay-2400 { animation-delay: 2.4s; }
        .delay-2600 { animation-delay: 2.6s; }
        .delay-2800 { animation-delay: 2.8s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Slideshow */}
        <div className="absolute inset-0">
          {BACKGROUND_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: window.innerWidth > 768 ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : 'none',
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Picture element for responsive images */}
              <picture className="w-full h-full">
                <img
                  src={img}
                  alt={`Japan ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{
                    animation: index === currentSlide ? 'slideshow 6s ease-in-out' : 'none',
                    objectPosition: 'center center',
                    objectFit: 'cover',
                    minHeight: '100vh',
                  }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </picture>
              {/* Gradient overlay - lighter for better visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 md:from-black/50 md:via-black/30 md:to-black/60"></div>
            </div>
          ))}
        </div>

        {/* Futuristic Grid Overlay - Hidden on mobile for performance */}
        <div className="absolute inset-0 opacity-20 pointer-events-none hidden md:block">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          ></div>
        </div>

        {/* Scanline Effect - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none scanline-effect hidden md:block"></div>

        {/* Floating Particles - Reduced on mobile */}
        {hasLoaded && [...Array(window.innerWidth > 768 ? 30 : 10)].map((_, i) => (
          <Particle key={`particle-${i}`} delay={i * 0.1} index={i} />
        ))}

        {/* Animated Clouds - Hidden on mobile */}
        {hasLoaded && window.innerWidth > 768 && (
          <>
            <Cloud delay={0} position={20} />
            <Cloud delay={3} position={50} />
            <Cloud delay={6} position={70} />
          </>
        )}

        {/* Airplane Animation - Smaller on mobile */}
        {hasLoaded && (
          <div className="absolute top-4 sm:top-10 left-4 sm:left-10 plane-entry z-20">
            <div className="relative">
              <Plane size={window.innerWidth > 768 ? 48 : 32} className="text-red-600 transform rotate-45 drop-shadow-2xl" />
              <div className="absolute -right-12 sm:-right-20 top-1/2 w-12 sm:w-20 h-1 bg-gradient-to-r from-red-600 to-transparent opacity-60"></div>
            </div>
          </div>
        )}

        {/* Fireworks */}
        {hasLoaded && [...Array(8)].map((_, i) => (
          <Firework key={`firework-${i}`} delay={i * 0.5 + 2} />
        ))}
        
        {/* Confetti */}
        {hasLoaded && [...Array(20)].map((_, i) => (
          <Confetti key={`confetti-${i}`} delay={i * 0.2 + 2} />
        ))}

        {/* Ambient Glow Effects - More subtle for better image visibility */}
        <div className="absolute inset-0 opacity-10 md:opacity-20 pointer-events-none">
          <div 
            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-red-600 rounded-full blur-3xl"
            style={{
              transform: window.innerWidth > 768 ? `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` : 'none',
              transition: 'transform 0.3s ease-out',
            }}
          ></div>
          <div 
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-red-600 rounded-full blur-3xl"
            style={{
              transform: window.innerWidth > 768 ? `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)` : 'none',
              transition: 'transform 0.3s ease-out',
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32 text-center min-h-screen flex flex-col justify-center">
          <div className="mb-4 sm:mb-6 md:mb-8 pt-8 sm:pt-4">
            <img 
            src="/logo.png" 
            alt="Moshi Moshi Nippon" 
            className={`h-28 sm:h-32 md:h-36 lg:h-44 mx-auto mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl rounded-full object-cover ${hasLoaded ? 'logo-land animate-float' : ''}`}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.8))',
              border: '1px solid #000',
              padding: '8px',
              backgroundColor: '#000',
            }}
            />
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl leading-tight ${hasLoaded ? 'slide-in-up delay-1000' : ''}`}>
            Your Gateway to <span className="text-red-600 shimmer-text">Japan</span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-2 sm:mb-3 md:mb-4 font-light drop-shadow-lg ${hasLoaded ? 'slide-in-up delay-1200' : ''}`}>
            もしもし にっぽん
          </p>

          <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto drop-shadow-lg glassmorphism px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl leading-snug ${hasLoaded ? 'slide-in-up delay-1400' : ''}`}>
            Expert visa consultation services for business professionals and students seeking opportunities in Japan.
            We guide you through every step of your journey.
          </p>

          <div className={`flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-2 sm:px-4 ${hasLoaded ? 'fade-in delay-1600' : ''}`}>
            <button
              onClick={onGetStarted}
              className="bg-red-600 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-red-600/50 animate-pulse-glow transform hover:scale-105 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight size={16} className="sm:w-5 sm:h-5" />
            </button>
            <a
              href="tel:0777807619"
              className="glassmorphism text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-white/20 transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95"
            >
              Call: 077 780 7619
            </a>
            <button
              onClick={() => setShowGallery(true)}
              className="glassmorphism text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-white/20 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95"
            >
              <Image size={16} className="sm:w-5 sm:h-5" />
              <span>Gallery</span>
            </button>
            <a
              href="https://www.facebook.com/mmnippon/reels"
              className="glassmorphism text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-white/20 transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95"
            >
              Success Stories
            </a>
          </div>

          <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-8 max-w-4xl mx-auto px-2 sm:px-4">
            <div className={`glassmorphism p-3 sm:p-4 md:p-6 rounded-lg border border-red-600/50 hover:border-red-600 transition-all duration-300 transform hover:scale-105 ${hasLoaded ? 'bounce-in delay-2000' : ''}`}>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-1 sm:mb-2 drop-shadow-lg">10+</h3>
              <p className="text-white drop-shadow text-xs sm:text-sm md:text-base">Years Experience</p>
            </div>
            <div className={`glassmorphism p-3 sm:p-4 md:p-6 rounded-lg border border-red-600/50 hover:border-red-600 transition-all duration-300 transform hover:scale-105 ${hasLoaded ? 'bounce-in delay-2200' : ''}`}>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-1 sm:mb-2 drop-shadow-lg">100%</h3>
              <p className="text-white drop-shadow text-xs sm:text-sm md:text-base">Successful Applications</p>
            </div>
            <div className={`glassmorphism p-3 sm:p-4 md:p-6 rounded-lg border border-red-600/50 hover:border-red-600 transition-all duration-300 transform hover:scale-105 ${hasLoaded ? 'bounce-in delay-2400' : ''}`}>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-1 sm:mb-2 drop-shadow-lg">100%</h3>
              <p className="text-white drop-shadow text-xs sm:text-sm md:text-base">Client Satisfaction</p>
            </div>
          </div>

          {/* Slideshow Indicators */}
          <div className={`mt-6 sm:mt-8 md:mt-12 flex justify-center gap-2 sm:gap-3 ${hasLoaded ? 'fade-in delay-2600' : ''}`}>
            {BACKGROUND_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-red-600 w-5 sm:w-6 md:w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Overlay */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 sticky top-0 glassmorphism p-4 rounded-lg z-10 slide-in-up">
                <div>
                  <h2 className="text-3xl font-bold text-white">Our Gallery</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {loading ? 'Loading...' : `${filteredImages.length} ${filteredImages.length === 1 ? 'image' : 'images'}`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowGallery(false);
                    setSelectedCategory('all');
                  }}
                  className="text-white hover:text-red-600 transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X size={32} />
                </button>
              </div>

              {/* Category Filter */}
              {!loading && categories.length > 1 && (
                <div className="flex flex-wrap gap-3 mb-8 justify-center slide-in-up delay-200">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category
                          ? 'bg-red-600 text-white shadow-lg'
                          : 'glassmorphism text-white hover:bg-white/20'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading gallery...</p>
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredImages.length === 0 && (
                <div className="text-center py-20 fade-in">
                  <Image size={64} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-white text-xl mb-2">No images found</p>
                  <p className="text-gray-400">Check back soon for updates!</p>
                </div>
              )}

              {/* Gallery Grid */}
              {!loading && filteredImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredImages.map((image, index) => (
                    <div
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 scale-in transform hover:scale-105"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <img
                        src={image.image_url}
                        alt={image.caption || 'Gallery image'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          {image.caption && (
                            <p className="text-white font-semibold text-lg mb-2">{image.caption}</p>
                          )}
                          {image.category && (
                            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs rounded-full capitalize">
                              {image.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Selected Image */}
      {selectedImage !== null && filteredImages[selectedImage] && (
        <div
          className="fixed inset-0 z-[60] bg-black/98 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-red-600 transition-colors p-3 hover:bg-white/10 rounded-lg z-10 scale-in"
          >
            <X size={32} />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-600 transition-colors p-3 hover:bg-white/10 rounded-lg z-10 slide-in-left"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-600 transition-colors p-3 hover:bg-white/10 rounded-lg z-10 slide-in-right"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}

          <div className="absolute top-4 left-4 glassmorphism px-4 py-2 rounded-lg scale-in delay-100">
            <span className="text-white font-semibold">
              {selectedImage + 1} / {filteredImages.length}
            </span>
          </div>

          <div className="max-w-7xl w-full scale-in delay-200" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredImages[selectedImage].image_url}
              alt={filteredImages[selectedImage].caption || 'Gallery image'}
              className="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto shadow-2xl"
            />
            {(filteredImages[selectedImage].caption || filteredImages[selectedImage].category) && (
              <div className="mt-6 text-center glassmorphism rounded-lg p-4 mx-auto max-w-2xl slide-in-up delay-300">
                {filteredImages[selectedImage].caption && (
                  <p className="text-white text-xl font-semibold mb-2">
                    {filteredImages[selectedImage].caption}
                  </p>
                )}
                {filteredImages[selectedImage].category && (
                  <span className="inline-block px-4 py-1 bg-red-600 text-white text-sm rounded-full capitalize">
                    {filteredImages[selectedImage].category}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glassmorphism px-4 py-2 rounded-lg fade-in delay-400">
            <p className="text-white text-sm">
              Use ← → arrows to navigate • ESC to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}