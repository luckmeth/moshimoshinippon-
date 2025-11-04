import { CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Your Page Title | Moshi Moshi Nippon</title>
  <meta name="description" content="Page specific description" />
  <link rel="canonical" href="https://moshimoshinippon.com/current-page" />
</Helmet>

export function About() {
  const features = [
    'Expert immigration lawyers and consultants',
    'Personalized visa application support',
    'Document preparation and translation',
    'Interview preparation and guidance',
    'Post-arrival support services',
    'Multilingual customer service',
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
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
            <img
              src="/516813976_1072100705023677_7277441891721048074_n.jpg"
              alt="Moshi Moshi Nippon Team"
              className="relative rounded-2xl shadow-2xl border-4 border-red-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
