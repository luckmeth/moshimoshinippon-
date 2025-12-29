import { ArrowRight, X, Image, ChevronLeft, ChevronRight, Sparkles, Gift, Star, Snowflake as SnowflakeIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

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

// Snowflake component with unique animations
const Snowflake = ({ delay, duration, left }: { delay: number; duration: number; left: number }) => {
  const size = 12 + Math.random() * 20;
  const drift = -50 + Math.random() * 100;
  
  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-5%',
        animation: `snowfall ${duration}s linear ${delay}s infinite`,
        '--drift': `${drift}px`,
      } as any}
    >
      <SnowflakeIcon 
        size={size} 
        className="text-white opacity-80"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
          animation: `snowRotate ${duration * 0.5}s linear infinite`,
        }}
      />
    </div>
  );
};

// Christmas light component
const ChristmasLight = ({ index }: { index: number }) => {
  const colors = ['#DC2626', '#FFFFFF', '#22C55E', '#EAB308'];
  const color = colors[index % colors.length];
  const delay = index * 0.2;
  
  return (
    <div
      className="w-3 h-5 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
        animation: `lightTwinkle 1.5s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

// Shooting star component
const ShootingStar = ({ delay }: { delay: number }) => {
  const startX = Math.random() * 100;
  const startY = Math.random() * 50;
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        animation: `shootingStar 2s ease-out ${delay}s infinite`,
      }}
    >
      <Star className="text-yellow-300" size={20} style={{ filter: 'drop-shadow(0 0 10px rgba(253, 224, 71, 0.8))' }} />
    </div>
  );
};

// Gift box floating component
const FloatingGift = ({ delay, left }: { delay: number; left: number }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '100%',
        animation: `giftFloat 6s ease-in-out ${delay}s infinite`,
      }}
    >
      <Gift className="text-red-600" size={30} style={{ 
        filter: 'drop-shadow(0 0 15px rgba(220, 38, 38, 0.8))',
        animation: 'giftRotate 3s ease-in-out infinite',
      }} />
    </div>
  );
};

// Glowing orb particle
const GlowingOrb = ({ delay, color }: { delay: number; color: string }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = 20 + Math.random() * 40;
  
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        filter: 'blur(20px)',
        opacity: 0.4,
        animation: `orbFloat 4s ease-in-out ${delay}s infinite`,
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
  const [showChristmasBanner, setShowChristmasBanner] = useState(true);

  useEffect(() => {
    if (showGallery) {
      loadGalleryImages();
    }
  }, [showGallery]);

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
      const data: GalleryImage[] = [];
      setGalleryImages(data);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

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
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift));
            opacity: 0.5;
          }
        }
        
        @keyframes snowRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes lightTwinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes giftFloat {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes giftRotate {
          0%, 100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }
        
        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -30px) scale(1.2);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(40px, 10px) scale(1.1);
          }
        }
        
        @keyframes christmasShimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes christmasPulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(34, 197, 94, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 50px rgba(220, 38, 38, 0.8), 0 0 80px rgba(34, 197, 94, 0.6);
            transform: scale(1.05);
          }
        }
        
        @keyframes santaFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-25px) translateX(5px) rotate(3deg);
          }
        }
        
        @keyframes bellRing {
          0%, 100% {
            transform: rotate(0deg);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: rotate(-15deg);
          }
          20%, 40%, 60%, 80% {
            transform: rotate(15deg);
          }
        }
        
        @keyframes candyCaneRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes christmasGlow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(220, 38, 38, 0.8),
                         0 0 20px rgba(220, 38, 38, 0.6),
                         0 0 30px rgba(34, 197, 94, 0.4);
          }
          50% {
            text-shadow: 0 0 20px rgba(220, 38, 38, 1),
                         0 0 40px rgba(220, 38, 38, 0.8),
                         0 0 60px rgba(34, 197, 94, 0.6);
          }
        }
        
        .christmas-shimmer {
          background: linear-gradient(90deg, #DC2626 0%, #FFFFFF 25%, #22C55E 50%, #FFFFFF 75%, #DC2626 100%);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: christmasShimmer 3s linear infinite;
        }
        
        .christmas-text-glow {
          animation: christmasGlow 2s ease-in-out infinite;
        }
        
        .santa-float {
          animation: santaFloat 4s ease-in-out infinite;
        }
        
        .bell-ring {
          animation: bellRing 2s ease-in-out infinite;
        }
      `}</style>

      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Heavy snowfall - multiple layers */}
        {[...Array(50)].map((_, i) => (
          <Snowflake 
            key={`snow-${i}`} 
            delay={i * 0.1} 
            duration={5 + Math.random() * 5}
            left={Math.random() * 100}
          />
        ))}
        
        {/* Shooting stars */}
        {[...Array(5)].map((_, i) => (
          <ShootingStar key={`star-${i}`} delay={i * 2 + Math.random() * 3} />
        ))}
        
        {/* Floating gifts */}
        {[...Array(8)].map((_, i) => (
          <FloatingGift key={`gift-${i}`} delay={i * 1.5} left={10 + i * 12} />
        ))}
        
        {/* Glowing orbs */}
        {[...Array(15)].map((_, i) => (
          <GlowingOrb 
            key={`orb-${i}`} 
            delay={i * 0.3} 
            color={i % 3 === 0 ? '#DC2626' : i % 3 === 1 ? '#22C55E' : '#FFFFFF'} 
          />
        ))}

        {/* Christmas lights string at top */}
        <div className="absolute top-0 left-0 right-0 flex justify-around py-2 z-10">
          {[...Array(20)].map((_, i) => (
            <ChristmasLight key={`light-${i}`} index={i} />
          ))}
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-600 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Christmas Banner */}
        {showChristmasBanner && (
          <div className="absolute top-24 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 p-1 rounded-lg shadow-2xl" style={{ animation: 'christmasPulse 2s ease-in-out infinite' }}>
                <div className="bg-black rounded-lg px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="santa-float">
                      🎅
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg md:text-xl christmas-shimmer">
                        🎄 Merry Christmas & Happy Holidays! 🎄
                      </p>
                      <p className="text-gray-300 text-sm flex items-center space-x-2">
                        <span>メリークリスマス</span>
                        <SnowflakeIcon size={14} className="inline animate-spin" />
                        <span>Start your Japan journey this season!</span>
                      </p>
                    </div>
                    <div className="bell-ring">
                      🔔
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChristmasBanner(false)}
                    className="text-white hover:text-red-600 transition-colors ml-4"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="mb-8 relative">
            {/* Christmas wreath effect around logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-52 h-52 border-8 border-green-600 rounded-full opacity-30 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute w-48 h-48 border-8 border-red-600 rounded-full opacity-30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            </div>
            <img src="/logo.png" alt="Moshi Moshi Nippon" className="h-40 w-auto mx-auto mb-6 relative z-10 santa-float" />
            {/* Decorative stars around logo */}
            <Star className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-300" size={24} style={{ animation: 'candyCaneRotate 4s linear infinite' }} />
            <Star className="absolute bottom-0 left-1/2 -translate-x-1/2 text-yellow-300" size={24} style={{ animation: 'candyCaneRotate 4s linear infinite reverse' }} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Gateway to <span className="christmas-shimmer christmas-text-glow">Japan</span>
          </h1>

          <div className="flex items-center justify-center space-x-3 mb-4">
            <SnowflakeIcon className="text-white animate-spin" size={24} />
            <p className="text-2xl md:text-3xl text-white font-light">
              もしもし にっぽん
            </p>
            <SnowflakeIcon className="text-white animate-spin" size={24} style={{ animationDirection: 'reverse' }} />
          </div>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Expert visa consultation services for business professionals and students seeking opportunities in Japan.
            We guide you through every step of your journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-red-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              style={{ animation: 'christmasPulse 2s ease-in-out infinite' }}
            >
              <Gift size={20} />
              <span>Get Started</span>
              <ArrowRight size={20} />
            </button>
            <a
              href="tel:0777807619"
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>☎️</span>
              <span>Call Us: 077 780 7619</span>
            </a>
            <button
              onClick={() => setShowGallery(true)}
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <Image size={20} />
              <span>Gallery</span>
            </button>
            <a
              href="https://www.facebook.com/mmnippon/reels"
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg"
            >
              Success stories
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border-2 border-red-600/50 hover:border-green-600 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-2 right-2">🎁</div>
              <h3 className="text-3xl font-bold text-red-600 mb-2 christmas-text-glow">10+</h3>
              <p className="text-white">Years Experience</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border-2 border-green-600/50 hover:border-red-600 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-2 right-2">⭐</div>
              <h3 className="text-3xl font-bold text-green-600 mb-2 christmas-text-glow">100%</h3>
              <p className="text-white">Successful Applications</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border-2 border-red-600/50 hover:border-green-600 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-2 right-2">🎄</div>
              <h3 className="text-3xl font-bold text-red-600 mb-2 christmas-text-glow">100%</h3>
              <p className="text-white">Client Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Bottom Christmas decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-900/30 to-transparent pointer-events-none"></div>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-md p-4 rounded-lg z-10">
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

              {!loading && categories.length > 1 && (
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-red-600 text-white shadow-lg'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading gallery...</p>
                </div>
              )}

              {!loading && filteredImages.length === 0 && (
                <div className="text-center py-20">
                  <Image size={64} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-white text-xl mb-2">No images found</p>
                  <p className="text-gray-400">Check back soon for updates!</p>
                </div>
              )}

              {!loading && filteredImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredImages.map((image, index) => (
                    <div
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
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

      {/* Lightbox */}
      {selectedImage !== null && filteredImages[selectedImage] && (
        <div
          className="fixed inset-0 z-[60] bg-black/98 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-red-600 transition-colors p-3 hover:bg-white/10 rounded-lg z-10"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-600 transition-colors p-3 hover:bg-white/10 rounded-lg z-10"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-600 transition-colors p-3 hover:bg-white/10 rounded-lg z-10"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}

          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white font-semibold">
              {selectedImage + 1} / {filteredImages.length}
            </span>
          </div>

          <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredImages[selectedImage].image_url}
              alt={filteredImages[selectedImage].caption || 'Gallery image'}
              className="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto shadow-2xl"
            />
            {(filteredImages[selectedImage].caption || filteredImages[selectedImage].category) && (
              <div className="mt-6 text-center bg-black/50 backdrop-blur-sm rounded-lg p-4 mx-auto max-w-2xl">
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

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-white text-sm">
              Use ← → arrows to navigate • ESC to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}