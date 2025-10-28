import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
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
            <h3 className="text-3xl font-bold text-red-600 mb-2">500+</h3>
            <p className="text-white">Successful Applications</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-red-600/30">
            <h3 className="text-3xl font-bold text-red-600 mb-2">100%</h3>
            <p className="text-white">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
