import React, { useState } from 'react';
import { Briefcase, GraduationCap, Building, Users, MessageCircle, FileText, Plane } from 'lucide-react';

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string | null) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleToursClick = () => {
    window.open('/tours', '_blank');
  };

  const services = {
    tours: {
      title: 'Sri Lanka Tours',
      description: 'Explore the beauty of Sri Lanka with our customized tour packages designed for Japanese travelers',
      details: [
        'Customized tour itineraries',
        'Professional English & Japanese speaking guides',
        'Comfortable transportation',
        'Hotel booking assistance',
        'Cultural experience programs',
        'Competitive pricing with flexible payment options'
      ],
      featured: true,
      icon: Plane
    },
    business: {
      title: 'Business Visa',
      description: 'Complete assistance with business visa applications for entrepreneurs and companies looking to expand to Japan',
      details: [
        'Starting a new business in Japan',
        'Expanding existing Sri Lankan business to Japan',
        'Complete documentation and legal guidance',
        'Business registration support',
        'Branch office establishment assistance'
      ],
      icon: Briefcase
    },
    student: {
      title: 'Student Visa',
      description: 'Support for students planning to study in Japan, from language schools to universities',
      details: [
        'Connect with schools matching your background and goals',
        'Language schools and university guidance',
        'Some schools require Japanese proficiency, others don\'t',
        'Even beginners in Japanese can apply',
        'Full visa application process guidance'
      ],
      icon: GraduationCap
    },
    hsp: {
      title: 'EHS Visa Under HSP Category',
      description: 'Engineer (E), Specialist in Humanities (H), International Services (S), all related fields',
      details: [
        '🧠 Engineer (E): Software Engineer, System Engineer, Network Engineer, Mechanical/Electrical/Civil Engineers, Quality Control & R&D',
        '📚 Specialist in Humanities (H): Accountant, Finance Officer, HR Specialist, Marketing Executive, Business Analyst, Translator',
        '🌍 International Services (S): Translator/Interpreter, Language Instructor, Import-Export Specialist, Tourism Coordinator',
        '⏱️ Visa Duration: 1, 3, or 5 years (renewable)',
        '✅ No payment required until interview stage'
      ],
      icon: Building
    },
    dependent: {
      title: 'Dependent Visa',
      description: 'Help family members join their loved ones in Japan',
      details: [
        'Spouse visa applications',
        'Child dependent visa support',
        'Family reunification guidance',
        'Complete documentation assistance',
        'Immigration process support'
      ],
      icon: Users
    },
    consultation: {
      title: 'Visa Consultation',
      description: 'Expert advice on visa types, requirements, and application processes',
      details: [
        'Personalized visa type recommendations',
        'Eligibility assessment',
        'Requirements and documentation checklist',
        'Application timeline guidance',
        'Interview preparation support'
      ],
      icon: MessageCircle
    },
    document: {
      title: 'Document Preparation',
      description: 'Professional assistance with preparing and translating required documents',
      details: [
        'Document verification and review',
        'Professional translation services',
        'Notarization assistance',
        'Document formatting per Japanese standards',
        'Complete application package preparation'
      ],
      icon: FileText
    }
  };

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4">
            Our <span className="text-red-600">Services</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Comprehensive visa consultation services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {Object.entries(services).map(([key, service]) => {
            const Icon = service.icon;
            const isFeatured = service.featured;

            return (
              <div
                key={key}
                className={`group ${isFeatured ? 'lg:col-span-3' : ''} ${
                  isFeatured 
                    ? 'bg-gradient-to-br from-red-600 via-red-700 to-red-900 border-4 border-yellow-400 shadow-2xl shadow-red-600/50' 
                    : 'bg-black border-2 border-red-600'
                } p-4 sm:p-6 md:p-8 rounded-xl hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden`}
                onClick={() => {
                  if (key === 'tours') {
                    handleToursClick();
                  } else {
                    toggleExpand(key);
                  }
                }}
              >
                {/* Featured badge */}
                {isFeatured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    ⭐ FEATURED
                  </div>
                )}

                <div className={`flex ${isFeatured ? 'lg:flex-row flex-col' : 'flex-col'} ${isFeatured ? 'items-center gap-6' : ''}`}>
                  <div className={`${isFeatured ? 'lg:w-1/3' : 'w-full'}`}>
                    <div className={`${
                      isFeatured 
                        ? 'bg-yellow-400 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24' 
                        : 'bg-red-600 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16'
                    } rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto ${isFeatured ? 'lg:mx-0' : ''}`}>
                      <Icon className={`${isFeatured ? 'text-red-900 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14' : 'text-white w-6 h-6'}`} />
                    </div>
                  </div>

                  <div className={`${isFeatured ? 'lg:w-2/3' : 'w-full'} ${isFeatured ? 'text-center lg:text-left' : ''}`}>
                    <h3 className={`${
                      isFeatured 
                        ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-400' 
                        : 'text-lg sm:text-xl md:text-2xl text-white'
                    } font-bold mb-3 sm:mb-4`}>
                      {service.title}
                    </h3>
                    <p className={`${
                      isFeatured 
                        ? 'text-base sm:text-lg md:text-xl text-white' 
                        : 'text-sm sm:text-base text-gray-300'
                    } leading-relaxed ${isFeatured ? 'mb-4' : ''}`}>
                      {service.description}
                    </p>

                    {isFeatured && (
                      <div className="mt-4 lg:mt-6">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto lg:mx-0">
                          <Plane className="w-5 h-5" />
                          Comming Soon...
                        </button>
                      </div>
                    )}

                    {!isFeatured && expandedId === key && (
                      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-700 rounded-md text-white transition-all duration-500 ease-in-out">
                        <ul className="space-y-2">
                          {service.details.map((detail: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-yellow-400 mr-2 flex-shrink-0">✦</span>
                              <span className="text-xs sm:text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}