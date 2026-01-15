import { CheckCircle, Volume2, VolumeX, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // ✅ Supabase public video URL
  const VIDEO_URL =
    'https://ogmpepikyubcptjrwtgi.supabase.co/storage/v1/object/public/videoss/visa.mp4';

  const features = [
    'Expert immigration lawyers and consultants',
    'Personalized visa application support',
    'Document preparation and translation',
    'Interview preparation and guidance',
    'Post-arrival support services',
    'Multilingual customer service',
  ];

  // ✅ Mobile-safe autoplay on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current && !hasPlayed) {
          videoRef.current.muted = true; // REQUIRED for mobile autoplay
          videoRef.current
            .play()
            .then(() => setHasPlayed(true))
            .catch(() => console.log('Autoplay blocked'));
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasPlayed]);

  // ✅ Proper mute/unmute sync
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* TEXT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-red-600">Moshi Moshi Nippon</span>
            </h2>

            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Established in 2016, Moshi Moshi Nippon is a trusted Japan visa
              consultation service supporting individuals and businesses in
              achieving their goals in Japan.
            </p>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We specialize in student, work, business, and dependent visas,
              ensuring a smooth and successful application journey.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle
                    className="text-red-600 flex-shrink-0 mt-1"
                    size={22}
                  />
                  <span className="text-white text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VIDEO SECTION (ADAPTIVE – NO CROPPING) */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 rounded-2xl blur-3xl opacity-20"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-red-600 bg-black">

              {!videoError ? (
                <>
                  {/* Aspect-safe container */}
                  <div className="w-full aspect-video flex items-center justify-center bg-black">
                    <video
                      ref={videoRef}
                      className="max-w-full max-h-full object-contain"
                      poster="/516813976_1072100705023677_7277441891721048074_n.jpg"
                      loop
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      onError={() => setVideoError(true)}
                    >
                      <source src={VIDEO_URL} type="video/mp4" />
                      <source
                        src="/videos/about-video.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>

                  {/* Mute Button */}
                  <button
                    onClick={toggleMute}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-red-600 p-3 rounded-full transition z-10"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX size={22} className="text-white" />
                    ) : (
                      <Volume2 size={22} className="text-white" />
                    )}
                  </button>
                </>
              ) : (
                /* FALLBACK IMAGE */
                <div className="w-full aspect-video bg-black flex items-center justify-center">
                  <img
                    src="/516813976_1072100705023677_7277441891721048074_n.jpg"
                    alt="Moshi Moshi Nippon Team"
                    className="max-w-full max-h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="text-center text-white">
                      <Upload size={44} className="mx-auto mb-2 text-red-600" />
                      <p className="text-sm">Video unavailable</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Coming soon
                      </p>
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