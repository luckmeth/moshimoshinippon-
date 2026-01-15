import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Phone, Mail, ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Advertisement {
  id: string;
  title: string;
  content: string;
  media_type: 'image' | 'video' | 'text';
  media_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

// Animated background particles
const FloatingParticle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  
  return (
    <div
      className="absolute pointer-events-none animate-float-particle"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        animationDelay: `${delay}s`,
      }}
    >
      <Sparkles size={16} className="text-red-400 opacity-40" />
    </div>
  );
};

export function AdvertisingSection() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    loadAdvertisements();
  }, []);

  useEffect(() => {
    if (advertisements.length > 0 && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % advertisements.length);
      }, 6000); // Auto-advance every 6 seconds

      return () => clearInterval(interval);
    }
  }, [advertisements.length, isAutoPlaying]);

  const loadAdvertisements = async () => {
    const { data } = await supabase
      .from('advertisements')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (data) {
      setAdvertisements(data);
    }
    setLoading(false);
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % advertisements.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  const handleCallNow = () => {
    window.location.href = 'tel:0777807619';
  };

  const handleEmailNow = () => {
    window.location.href = 'mailto:moshimoshinippon10@gmail.com';
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">Loading announcements...</p>
          </div>
        </div>
      </section>
    );
  }

  if (advertisements.length === 0) {
    return null;
  }

  const currentAd = advertisements[currentIndex];

  return (
    <>
      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.8;
          }
        }
        
        @keyframes shimmer-text {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(220, 38, 38, 0.8);
          }
        }
        
        @keyframes slide-in-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-float-particle {
          animation: float-particle 5s ease-in-out infinite;
        }
        
        .shimmer-gradient {
          background: linear-gradient(90deg, #DC2626 0%, #FFFFFF 50%, #DC2626 100%);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-text 3s linear infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .slide-in-animation {
          animation: slide-in-up 0.6s ease-out;
        }
        
        .glassmorphism-ad {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px) saturate(180%);
          -webkit-backdrop-filter: blur(10px) saturate(180%);
        }
      `}</style>

      <section id="advertisements" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.3} />
          ))}
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 slide-in-animation">
            <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
              <Zap size={18} className="text-red-600 animate-pulse" />
              <span className="text-red-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">Exclusive Updates</span>
              <Zap size={18} className="text-red-600 animate-pulse" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
              Latest <span className="shimmer-gradient">Updates</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Stay informed with our latest news and exclusive announcements
            </p>
          </div>

          {/* Main Carousel */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border-2 sm:border-4 border-red-600 animate-pulse-glow mb-6 sm:mb-8">
            {/* Carousel Content */}
            <div className="relative min-h-[350px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
              {advertisements.map((ad, index) => (
                <div
                  key={ad.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  {ad.media_type === 'image' && ad.media_url && (
                    <div className="relative h-full">
                      {/* Responsive Image Container */}
                      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                        <img
                          src={ad.media_url}
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                      </div>
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10">
                        <div className="max-w-4xl">
                          {/* Badge */}
                          <div className="inline-flex items-center space-x-2 bg-red-600 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4">
                            <Star size={14} className="text-white" fill="white" />
                            <span className="text-white font-bold text-xs sm:text-sm">Featured</span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                            {ad.title}
                          </h3>
                          
                          {/* Content */}
                          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-5 md:mb-6 line-clamp-2 sm:line-clamp-3">
                            {ad.content}
                          </p>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                            <button
                              onClick={() => setSelectedAd(ad)}
                              className="group bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-600/50 text-sm sm:text-base"
                            >
                              <span>Learn More</span>
                              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <button
                              onClick={handleCallNow}
                              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
                            >
                              <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                              <span>Call Now</span>
                            </button>
                            
                            <button
                              onClick={handleEmailNow}
                              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
                            >
                              <Mail size={18} className="group-hover:scale-110 transition-transform" />
                              <span>Email Us</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {ad.media_type === 'video' && ad.media_url && (
                    <div className="relative h-full flex flex-col">
                      {/* Responsive Video Container */}
                      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px]">
                        <video
                          src={ad.media_url}
                          controls
                          className="w-full h-full object-cover"
                          playsInline
                        />
                      </div>
                      
                      {/* Content Below Video */}
                      <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-red-900 via-red-800 to-black">
                        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                          <Sparkles size={20} className="text-yellow-400" />
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">{ad.title}</h3>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6">{ad.content}</p>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={handleCallNow}
                            className="group bg-white text-red-600 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
                          >
                            <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                            <span>Call: 077 780 7619</span>
                          </button>
                          <button
                            onClick={handleEmailNow}
                            className="group bg-white/20 backdrop-blur-sm text-white border-2 border-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
                          >
                            <Mail size={18} />
                            <span>Email Us</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {ad.media_type === 'text' && (
                    <div className="flex items-center justify-center h-full p-6 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-br from-red-600 via-red-700 to-red-900 relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>
                      
                      <div className="text-center relative z-10 max-w-4xl">
                        <div className="flex justify-center mb-4 sm:mb-6">
                          <div className="flex space-x-2">
                            <Star size={24} className="text-yellow-400 animate-pulse" fill="currentColor" />
                            <Star size={24} className="text-yellow-400 animate-pulse" fill="currentColor" style={{ animationDelay: '0.2s' }} />
                            <Star size={24} className="text-yellow-400 animate-pulse" fill="currentColor" style={{ animationDelay: '0.4s' }} />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
                          {ad.title}
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed mb-6 sm:mb-8 md:mb-10 px-4">
                          {ad.content}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                          <button
                            onClick={handleCallNow}
                            className="group bg-white text-red-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 flex items-center justify-center space-x-2 shadow-2xl text-sm sm:text-base md:text-lg"
                          >
                            <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                            <span>Call: 077 780 7619</span>
                          </button>
                          <button
                            onClick={handleEmailNow}
                            className="group bg-black/30 backdrop-blur-sm text-white border-2 border-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 flex items-center justify-center space-x-2 text-sm sm:text-base md:text-lg"
                          >
                            <Mail size={20} />
                            <span>Email Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {advertisements.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10 transform hover:scale-110"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10 transform hover:scale-110"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7" />
                </button>
              </>
            )}

            {/* Indicators */}
            {advertisements.length > 1 && (
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {advertisements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-red-600 w-6 sm:w-8' : 'bg-white/50 hover:bg-white/75 w-2 sm:w-3'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Grid */}
          {advertisements.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
              {advertisements.map((ad, index) => (
                <button
                  key={ad.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`relative group overflow-hidden rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    index === currentIndex
                      ? 'border-red-600 shadow-lg shadow-red-600/50 scale-105'
                      : 'border-gray-700 hover:border-red-400'
                  }`}
                >
                  {ad.media_type === 'image' && ad.media_url ? (
                    <div className="relative aspect-video">
                      <img
                        src={ad.media_url}
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <ArrowRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center p-2">
                      <p className="text-white font-semibold text-xs sm:text-sm text-center line-clamp-3">{ad.title}</p>
                    </div>
                  )}
                  
                  {index === currentIndex && (
                    <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      Now
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Call to Action Banner */}
          <div className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-r from-red-600 via-red-700 to-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-red-400">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Ready to Start Your Journey?</h3>
                <p className="text-sm sm:text-base md:text-lg text-white/90">Contact us today and let's make your Japan dream a reality!</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
                <button
                  onClick={handleCallNow}
                  className="group bg-white text-red-600 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl text-sm sm:text-base whitespace-nowrap"
                >
                  <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>077 780 7619</span>
                </button>
                <button
                  onClick={handleEmailNow}
                  className="group bg-black/30 backdrop-blur-sm text-white border-2 border-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Mail size={20} />
                  <span>Email Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Modal for full details */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 md:p-6 animate-fadeIn">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-scaleIn">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 p-4 sm:p-6 flex justify-between items-center z-10">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selectedAd.title}</h3>
                <p className="text-red-100 text-xs sm:text-sm mt-1">Exclusive Update</p>
              </div>
              <button
                onClick={() => setSelectedAd(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              {selectedAd.media_type === 'image' && selectedAd.media_url && (
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-2xl">
                  <img
                    src={selectedAd.media_url}
                    alt={selectedAd.title}
                    className="w-full max-h-[400px] sm:max-h-[500px] object-contain bg-black"
                  />
                </div>
              )}

              {selectedAd.media_type === 'video' && selectedAd.media_url && (
                <div className="rounded-lg sm:rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-2xl">
                  <video
                    src={selectedAd.media_url}
                    controls
                    className="w-full"
                    playsInline
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap mb-6 sm:mb-8">
                  {selectedAd.content}
                </p>
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-gray-200">
                <button
                  onClick={handleCallNow}
                  className="group bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg text-sm sm:text-base"
                >
                  <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>Call Now: 077 780 7619</span>
                </button>
                <button
                  onClick={handleEmailNow}
                  className="group bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Mail size={20} />
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}