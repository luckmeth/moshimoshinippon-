import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  created_at: string;
}

export function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    loadImages();

    // Real-time subscription
    const subscription = supabase
      .channel('gallery_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, () => {
        loadImages();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setImages(data);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading gallery...</div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-red-600">Gallery</span>
            </h2>
            <p className="text-xl text-gray-300">Capturing moments of success and celebration</p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openLightbox(image, index)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Image */}
                <img
                  src={image.image_url}
                  alt={image.caption}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.caption}
                    </p>
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {image.category}
                    </span>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                  <ZoomIn className="text-white" size={20} />
                </div>

                {/* Border Animation */}
                <div className="absolute inset-0 border-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                {/* Glowing Effect */}
                {hoveredIndex === index && (
                  <div className="absolute -inset-1 bg-red-600 blur-xl opacity-50 -z-10 rounded-xl"></div>
                )}
              </div>
            ))}
          </div>

          {/* Masonry Style Alternative (Uncomment if preferred) */}
          {/* 
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105"
                onClick={() => openLightbox(image, index)}
              >
                <img
                  src={image.image_url}
                  alt={image.caption}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          */}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-50"
          >
            <X size={24} />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-50"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-50"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Image Container */}
          <div className="max-w-6xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.caption}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in"
              />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center max-w-2xl animate-fade-in">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedImage.caption}
              </h3>
              <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm rounded-full">
                {selectedImage.category}
              </span>
              <p className="text-gray-400 text-sm mt-2">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}