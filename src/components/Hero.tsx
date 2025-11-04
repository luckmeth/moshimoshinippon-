import { ArrowRight, X, Image } from 'lucide-react';
import { useState } from 'react';


interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    { src: '1.jpg', alt: 'Team photo' },
    { src: '2.jpg', alt: 'Office branding' },
    { src: '3.jpg', alt: 'Opening ceremony' },
    { src: '4.jpg', alt: 'Teaching session' },
    { src: '5.jpg', alt: 'Japan checkin' },
    { src: '6.jpg', alt: 'Presentation' },
    { src: '7.jpg', alt: 'Team partnership' },
    { src: '8.jpg', alt: 'Team meeting' },
    { src: '9.jpg', alt: 'Success certificate' },
    { src: '12.jpg', alt: 'Airport departure' },
    { src: '10.jpg', alt: 'Certificate ceremony' },
  ];

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="mb-8">
            <img src="/logo.png" alt="Moshi Moshi Nippon" className="h-40 w-auto mx-auto mb-6" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Gateway to <span className="text-red-600">Japan</span>
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
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-600/50"
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
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-red-600/30">
              <h3 className="text-3xl font-bold text-red-600 mb-2">10+</h3>
              <p className="text-white">Years Experience</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-red-600/30">
              <h3 className="text-3xl font-bold text-red-600 mb-2">100%</h3>
              <p className="text-white">Successful Applications</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-red-600/30">
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
              <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/80 backdrop-blur-md p-4 rounded-lg">
                <h2 className="text-3xl font-bold text-white">Our Gallery</h2>
                <button
                  onClick={() => setShowGallery(false)}
                  className="text-white hover:text-red-600 transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square bg-gray-800"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Selected Image */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/98 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-red-600 transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={32} />
          </button>
          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}