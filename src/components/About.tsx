import { CheckCircle, Volume2, VolumeX, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Replace this with your actual Supabase video URL after uploading
  const VIDEO_URL = "https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/videoss/visa.mp4";
  // Example: "https://your-project.supabase.co/storage/v1/object/public/videos/about-video.mp4"

  const features = [
    'Expert immigration lawyers and consultants',
    'Personalized visa application support',
    'Document preparation and translation',
    'Interview preparation and guidance',
    'Post-arrival support services',
    'Multilingual customer service',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed && videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.log('Autoplay prevented:', error);
            });
            setHasPlayed(true);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasPlayed]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-red-600">Moshi Moshi Nippon</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Established in 2016, Moshi Moshi Nippon has been a trusted partner for individuals and businesses
              seeking to establish their presence in Japan. Our team of experienced immigration consultants and
              legal experts provides comprehensive support throughout your visa application journey.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We specialize in business visas, student visas, intra-company transfers, and dependent visas,
              ensuring a smooth and successful application process for every client.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <span className="text-white text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-red-600 rounded-2xl blur-3xl opacity-20"></div>
            
            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-red-600 group">
              {!videoError ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster="/516813976_1072100705023677_7277441891721048074_n.jpg"
                    loop
                    muted
                    playsInline
                    onError={() => setVideoError(true)}
                  >
                    {/* Use Supabase Storage URL */}
                    <source src={VIDEO_URL} type="video/mp4" />
                    
                    {/* Fallback to local file if Supabase URL not set */}
                    <source src="/videos/about-video.mp4" type="video/mp4" />
                  </video>

                  {/* Mute/Unmute Button */}
                  <button
                    onClick={toggleMute}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-red-600 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10 group/btn"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX size={24} className="text-white group-hover/btn:scale-110 transition-transform" />
                    ) : (
                      <Volume2 size={24} className="text-white group-hover/btn:scale-110 transition-transform" />
                    )}
                  </button>

                  {/* Sound Wave Indicator */}
                  {!isMuted && (
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                      <div className="w-1 bg-red-600 rounded-full animate-pulse" style={{ height: '12px', animationDuration: '0.5s' }}></div>
                      <div className="w-1 bg-red-600 rounded-full animate-pulse" style={{ height: '16px', animationDuration: '0.7s', animationDelay: '0.1s' }}></div>
                      <div className="w-1 bg-red-600 rounded-full animate-pulse" style={{ height: '20px', animationDuration: '0.6s', animationDelay: '0.2s' }}></div>
                      <div className="w-1 bg-red-600 rounded-full animate-pulse" style={{ height: '16px', animationDuration: '0.8s', animationDelay: '0.3s' }}></div>
                      <div className="w-1 bg-red-600 rounded-full animate-pulse" style={{ height: '12px', animationDuration: '0.5s', animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </>
              ) : (
                /* Fallback Image if video fails to load */
                <div className="relative">
                  <img
                    src="/516813976_1072100705023677_7277441891721048074_n.jpg"
                    alt="Moshi Moshi Nippon Team"
                    className="w-half h-half object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center text-white">
                      <Upload size={48} className="mx-auto mb-2 text-red-600" />
                      <p className="text-sm">Video unavailable</p>
                      <p className="text-xs text-gray-400 mt-1">Comming soon </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}