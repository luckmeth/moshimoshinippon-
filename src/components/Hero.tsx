import { ArrowRight, X, Image, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
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

export function Hero({ onGetStarted }: HeroProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewYearBanner, setShowNewYearBanner] = useState(true);

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
      
      if (error) throw error;
      if (data) setGalleryImages(data);
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
      `}</style>

      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Fireworks */}
        {[...Array(8)].map((_, i) => (
          <Firework key={`firework-${i}`} delay={i * 0.5} />
        ))}
        
        {/* Confetti */}
        {[...Array(20)].map((_, i) => (
          <Confetti key={`confetti-${i}`} delay={i * 0.2} />
        ))}

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>

        {/* New Year Banner */}
        {showNewYearBanner && (
          <div className="absolute top-24 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-gradient-to-r from-red-600 via-white to-red-600 p-1 rounded-lg shadow-2xl animate-pulse-glow">
                <div className="bg-black rounded-lg px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="text-red-600 animate-float" size={24} />
                    <div>
                      <p className="text-white font-bold text-lg md:text-xl shimmer-text">
                        🎊 Happy New Year 2025! 🎊
                      </p>
                      <p className="text-gray-300 text-sm">
                        新年おめでとうございます - Wishing you success in Japan!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewYearBanner(false)}
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
          <div className="mb-8">
            <img src="/logo.png" alt="Moshi Moshi Nippon" className="h-40 w-auto mx-auto mb-6 animate-float" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Gateway to <span className="text-red-600 shimmer-text">Japan</span>
          </h1>

          <p className="text-2xl md:text-3xl text-white mb-4 font-light">
            もしもし にっぽん
          </p>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Expert visa consultation services for business professionals and students seeking opportunities in Japan.
            We guide you through every step of your journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-600/50 animate-pulse-glow"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </button>
            <a
              href="tel:0777807619"
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg"
            >
              Call Us: 077 780 7619
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
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-red-600/30 hover:border-red-600 transition-all duration-300">
              <h3 className="text-3xl font-bold text-red-600 mb-2">10+</h3>
              <p className="text-white">Years Experience</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-red-600/30 hover:border-red-600 transition-all duration-300">
              <h3 className="text-3xl font-bold text-red-600 mb-2">100%</h3>
              <p className="text-white">Successful Applications</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-red-600/30 hover:border-red-600 transition-all duration-300">
              <h3 className="text-3xl font-bold text-red-600 mb-2">100%</h3>
              <p className="text-white">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Overlay */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
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

              {/* Category Filter */}
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

              {/* Loading State */}
              {loading && (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading gallery...</p>
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredImages.length === 0 && (
                <div className="text-center py-20">
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

      {/* Lightbox for Selected Image */}
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