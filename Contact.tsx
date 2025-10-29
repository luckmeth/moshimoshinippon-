import { Mail, Phone, MapPin, Facebook, Instagram, Send } from 'lucide-react';

interface ContactProps {
  onConsultationClick: () => void;
}

export function Contact({ onConsultationClick }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Get in <span className="text-red-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your journey to Japan? Contact us today for a consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-4 rounded-lg">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Phone</h3>
                <a href="tel:0777807619" className="text-gray-600 hover:text-red-600 transition-colors">
                  077 780 7619
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-4 rounded-lg">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Email</h3>
                <a
                  href="mailto:moshimoshinippon10@gmail.com"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  moshimoshinippon10@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-4 rounded-lg">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Location</h3>
                <a
                  href="https://maps.app.goo.gl/DFGKcpASR3hD52hE9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Rajagiriya, Sri Jayawardenepura Kotte<br />
                  Sri Lanka
                </a>
              </div>
            </div>

            <div className="bg-black p-8 rounded-xl border-2 border-red-600">
              <h3 className="text-2xl font-bold text-white mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/DFGKcpASR3hD52hE9"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden border-2 border-red-600 hover:border-red-500 transition-all duration-300 shadow-lg hover:shadow-red-600/30"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798654458267!2d79.88825!3d6.91522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnNTQuOCJOIDc5wrA1MycxNy43IkU!5e0!3m2!1sen!2slk!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
              <div className="bg-red-600 text-white text-center py-3 font-semibold hover:bg-red-700 transition-colors">
                Click to Open in Google Maps
              </div>
            </a>
          </div>

          <div className="bg-gradient-to-br from-black to-gray-900 p-8 rounded-xl border-2 border-red-600">
            <h3 className="text-3xl font-bold text-white mb-6">Request a Consultation</h3> 
            <p className="text-gray-300 mb-8"> Fill out our consultation form and our team will get back to you within 24 hours to discuss your visa needs.</p>
            <div className="mt-8 rounded-lg overflow-hidden">
              <img
                src="public/ds.jpg"
                alt="Tokyo cityscape with Mount Fuji"
                className="w-full h-64 object-cover"
              />
            </div>
            <br />
            <p className="text-gray-300 mb-8">
              Led by Buddima Ishara Ramanayake
Senior Visa Consultant & Director

After you submit your visa consultation request, Mr. Buddima Ishara Ramanayake personally reviews your profile and guides you through each step — from document preparation to matching with suitable Japanese schools or companies.
Once selected, you’ll face an online interview, and only then does the visa process officially begin — fully transparent, no hidden fees, and complete professional guidance.
<br />
<br />
ようこそ、モシモシニッポンへ。
私たちは日本への留学や就労の夢を現実にするために、信頼できるビザコンサルティングサービスを提供しています。
経験豊富な専門家チームが、一人ひとりの目標に合わせた最適なサポートで、あなたの未来を日本で輝かせます。
            </p>
            
            <button
              onClick={onConsultationClick}
              className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-600/50"
            >
              Start Your Application
            </button>
            
            
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-24 pt-12 border-t-2 border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* About Column */}
            <div>
              <h4 className="text-2xl font-bold text-black mb-4">Moshi Moshi Nippon</h4>
              <p className="text-gray-600 mb-4">
                Your trusted partner for Japan visa consultation services since 2016.
              </p>
              <p className="text-red-600 font-bold text-xl">もしもし にっぽん</p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-xl font-bold text-black mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-600 hover:text-red-600 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-600 hover:text-red-600 transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 hover:text-red-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-600 hover:text-red-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect With Us Column */}
            <div>
              <h4 className="text-xl font-bold text-black mb-4">Connect With Us</h4>
              <p className="text-gray-600 mb-4">Follow us on social media for updates and success stories</p>
              
              {/* Social Media Links */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.facebook.com/mmnippon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 hover:scale-110">
                    <Facebook className="text-white" size={28} />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Facebook
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/mosh.imoshinippon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-orange-600 p-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-pink-600/50 transition-all duration-300 hover:scale-110">
                    <Instagram className="text-white" size={28} />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Instagram
                  </span>
                </a>

                <a
                  href="https://www.tiktok.com/@moshi_moshi_nippon?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-black via-gray-800 to-teal-600 p-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-600/50 transition-all duration-300 hover:scale-110">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    TikTok
                  </span>
                </a>

                <a
                  href="moshimoshinippon10@gmail.com"
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 hover:scale-110">
                    <Send className="text-white" size={28} />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Email Us
                  </span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}