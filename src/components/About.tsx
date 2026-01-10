import { CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

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
            // Play video when section comes into view
            videoRef.current.play().catch((error) => {
              console.log('Autoplay prevented:', error);
            });
            setHasPlayed(true);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
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
            <div className="relative rounded-10xl overflow-hidden shadow-10xl border-1 border-red-600">
              <video
                ref={videoRef}
                className="w-half h-half object-cover"
                poster="/516813976_1072100705023677_7277441891721048074_n.jpg"
                loop
                playsInline
              >
                {/* 
                  VIDEO FILE LOCATION OPTIONS:
                  
                  Option 1: Public folder (Recommended for Vite/React)
                  Place your video in: public/videos/about-video.mp4
                  Then use: /videos/about-video.mp4
                */}
                <source src="/public/visa.mp4" type="video/mp4" />
                
                {/* 
                  Option 2: Assets folder (for bundled assets)
                  Place your video in: src/assets/videos/about-video.mp4
                  Then import and use it (uncomment below if using this method):
                  
                  import aboutVideo from './assets/videos/about-video.mp4';
                  <source src={aboutVideo} type="video/mp4" />
                */}
                
                {/* 
                  Option 3: External URL (CDN, Cloudinary, etc.)
                  <source src="https://your-cdn.com/video.mp4" type="video/mp4" />
                */}
                
                {/* 
                  Option 4: Supabase Storage
                  Upload to Supabase Storage and get public URL:
                  <source src="https://your-project.supabase.co/storage/v1/object/public/videos/about-video.mp4" type="video/mp4" />
                */}
                
                {/* Add WebM format for better browser compatibility */}
                <source src="/videos/about-video.webm" type="video/webm" />
                
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}