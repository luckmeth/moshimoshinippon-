import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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

export function AdvertisingSection() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdvertisements();
  }, []);

  useEffect(() => {
    if (advertisements.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % advertisements.length);
      }, 5000); // Auto-advance every 5 seconds

      return () => clearInterval(interval);
    }
  }, [advertisements.length]);

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
    setCurrentIndex((prev) => (prev + 1) % advertisements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">Loading announcements...</div>
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
      <section id="advertisements" className="py-16 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest <span className="text-red-600">Updates</span>
            </h2>
            <p className="text-xl text-gray-300">Stay informed with our latest news and announcements</p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-red-600">
            {/* Carousel Content */}
            <div className="relative min-h-[400px] md:min-h-[500px]">
              {advertisements.map((ad, index) => (
                <div
                  key={ad.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {ad.media_type === 'image' && ad.media_url && (
                    <div className="relative h-full">
                      <img
                        src={ad.media_url}
                        alt={ad.title}
                        className="w-full h-[300px] md:h-[400px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{ad.title}</h3>
                        <p className="text-lg text-gray-200 mb-4">{ad.content}</p>
                        <button
                          onClick={() => setSelectedAd(ad)}
                          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  )}

                  {ad.media_type === 'video' && ad.media_url && (
                    <div className="relative h-full">
                      <video
                        src={ad.media_url}
                        controls
                        className="w-full h-[300px] md:h-[400px] object-cover"
                      />
                      <div className="p-8 bg-gradient-to-br from-black to-gray-900">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{ad.title}</h3>
                        <p className="text-lg text-gray-200">{ad.content}</p>
                      </div>
                    </div>
                  )}

                  {ad.media_type === 'text' && (
                    <div className="flex items-center justify-center h-full p-8 md:p-16 bg-gradient-to-br from-red-600 via-red-700 to-red-900">
                      <div className="text-center">
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">{ad.title}</h3>
                        <p className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl">{ad.content}</p>
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Indicators */}
            {advertisements.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {advertisements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Grid */}
          {advertisements.length > 1 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {advertisements.map((ad, index) => (
                <button
                  key={ad.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative group overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? 'border-red-600 shadow-lg shadow-red-600/50'
                      : 'border-gray-600 hover:border-red-400'
                  }`}
                >
                  {ad.media_type === 'image' && ad.media_url ? (
                    <img
                      src={ad.media_url}
                      alt={ad.title}
                      className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-24 bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center">
                      <p className="text-white font-semibold text-sm px-2 text-center">{ad.title}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for full details */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-black">{selectedAd.title}</h3>
              <button
                onClick={() => setSelectedAd(null)}
                className="text-gray-500 hover:text-black transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6">
              {selectedAd.media_type === 'image' && selectedAd.media_url && (
                <img
                  src={selectedAd.media_url}
                  alt={selectedAd.title}
                  className="w-full rounded-lg mb-6"
                />
              )}

              {selectedAd.media_type === 'video' && selectedAd.media_url && (
                <video
                  src={selectedAd.media_url}
                  controls
                  className="w-full rounded-lg mb-6"
                />
              )}

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedAd.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}